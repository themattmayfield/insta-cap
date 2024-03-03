'use server';

import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { sql } from '@vercel/postgres';
import { jwtVerify } from 'jose';
import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';
import { z } from 'zod';

const jwtSchema = z.object({
  ip: z.string(),
});

const ratelimit = {
  free: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(500, '1 d'),
  }),
};

type TSuccess = {
  status: 'success';
  choices: OpenAI.Chat.Completions.ChatCompletion['choices'];
};

type TError = {
  status: 'error';
  errorMessage: string;
};

type TFormState = TSuccess | TError | void;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
export async function createCaption(
  prevFormState: TFormState | undefined,
  formData: FormData,
): Promise<TFormState> {
  const prompt = (formData.get('prompt') as string | null)
    ?.trim()
    .replaceAll(':', '');
  const token = formData.get('token') as string | null;

  if (!prompt) return;

  try {
    const verified = await jwtVerify(
      token ?? '',
      new TextEncoder().encode(process.env.API_SECRET ?? ''),
    );
    const { ip } = jwtSchema.parse(verified.payload);

    const { remaining } = await ratelimit.free.limit(ip);
    if (remaining <= 0)
      return {
        status: 'error',
        errorMessage:
          'Free limit reached, download mobile app for unlimited access.',
      };

    const [, aiResponse] = await Promise.all([
      sql`INSERT INTO Prompts (Prompt) VALUES (${prompt});`,
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        n: 1,
      }),
    ]);
    revalidatePath('/');

    return {
      status: 'success',
      choices: aiResponse.choices,
    };
  } catch (error: any) {
    console.error(error);

    if (error.status === 429) {
      return { errorMessage: 'RateLimitError', status: 'error' };
    }

    return {
      errorMessage: 'Connection error, please refresh the page.',
      status: 'error',
    };
  }
}
