import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  try {
    if (!prompt) throw new Error('Prompt required');

    await sql`INSERT INTO Prompts (Prompt) VALUES (${prompt});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const prompts = await sql`SELECT * FROM Prompts;`;
  return NextResponse.json({ prompts }, { status: 200 });
}
