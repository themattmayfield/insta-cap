'use server';

// import { prisma } from "@/server/db";
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { jwtVerify } from 'jose';
// import { redirect } from 'next/navigation';
import { z } from 'zod';

// import { replicate } from '@/server/replicate';

const jwtSchema = z.object({
  ip: z.string(),
});

const ratelimit = {
  free: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(500, '1 d'),
  }),
  //   ios: new Ratelimit({
  //     redis: kv,
  //     limiter: Ratelimit.slidingWindow(3, "7 d"),
  //     prefix: "ratelimit:ios",
  //   }),
};

interface IFormState {
  message: string;
}

export async function createCaption(
  prevFormState: IFormState | undefined,
  formData: FormData,
): Promise<IFormState | void> {
  const prompt = (formData.get('prompt') as string | null)
    ?.trim()
    .replaceAll(':', '');
  const token = formData.get('token') as string | null;

  if (!prompt) return; // no need to display an error message for blank prompts

  try {
    const verified = await jwtVerify(
      token ?? '',
      new TextEncoder().encode(process.env.API_SECRET ?? ''),
    );
    const { ip } = jwtSchema.parse(verified.payload);

    const { remaining } = await ratelimit.free.limit(ip);
    if (remaining <= 0)
      return {
        message:
          'Free limit reached, download mobile app for unlimited access.',
      };

    const data = { prompt };

    await Promise.all([
      prisma.emoji.create({ data }),
      replicate.createEmoji(data),
    ]);
  } catch (error) {
    console.error(error);
    return { message: 'Connection error, please refresh the page.' };
  }
}
