import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { sql } from '@vercel/postgres';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pluralize from 'pluralize';
import { z } from 'zod';

export const runtime = 'edge';

const isDevelopment = process.env.NODE_ENV === 'development';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const jwtSchema = z.object({
  ip: z.string(),
});

const ratelimit = {
  free: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(isDevelopment ? 500 : 20, '1 d'),
  }),
};
const EMPTY_PROMPT_TEXT = 'empty_prompt';
const LIMIT_REACHED_TEXT = 'limit_reached';
export async function POST(request: Request) {
  const { token, messages, tone, length, hashtag, emoji } =
    await request.json();
  try {
    if (!messages[0].content) throw new Error(EMPTY_PROMPT_TEXT);
    const verified = await jwtVerify(
      token ?? '',
      new TextEncoder().encode(process.env.API_SECRET ?? ''),
    );
    const { ip } = jwtSchema.parse(verified.payload);

    const { remaining } = await ratelimit.free.limit(ip);
    if (remaining <= 0) throw new Error(LIMIT_REACHED_TEXT);

    const originalPrompt = messages[0].content;
    const toneText = `Generate 3 ${tone}`;
    const lengthText = `${
      length === 'short'
        ? 'less than 300'
        : tone === 'medium'
        ? 'more than 400 characters less than 600'
        : 'more than 700 characters less than 1000'
    }`;
    const emojiText =
      emoji === 'true'
        ? 'Use emojis but not a lot at all'
        : 'Absolutely do not use emojis';
    const prompt = `${toneText} instagram captions clearly labeled "1.", "2.", and "3.". 
    Only return these 3 instagram captions, nothing else. Make sure there are no quotation 
    marks for each caption. Make sure each generated caption is ${lengthText} characters, 
    has short sentences that are found in instagram bios, and feel free to use this context as well: ${originalPrompt}. 
    There should be exactly ${pluralize(
      'hashtag',
      Number(hashtag),
      true,
    )}. ${emojiText}`;

    await sql`INSERT INTO Prompts (Prompt) VALUES (${originalPrompt});`;

    const [, aiResponse] = await Promise.all([
      sql`SELECT * FROM Prompts;`,
      openai.chat.completions.create({
        model: 'gpt-4-0125-preview',
        stream: true,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        n: 1,
      }),
    ]);

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(aiResponse);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    const errorMessage = error.message;

    if (errorMessage === EMPTY_PROMPT_TEXT) {
      return NextResponse.json('prompt required', { status: 500 });
    }
    if (errorMessage === LIMIT_REACHED_TEXT) {
      return NextResponse.json(
        'free limit reached. tell matt to make more money',
        { status: 500 },
      );
    }

    return NextResponse.json('something went wrong...matt is a bot', {
      status: 500,
    });
  }
}
