import 'server-only';

import { NextResponse } from 'next/server';
import type { ZodError } from 'zod';
export class Response {
  static success<JsonBody>(props?: { body?: JsonBody; headers?: HeadersInit }) {
    const { headers } = props ?? {};
    const body = props?.body ?? { ok: true };
    return NextResponse.json(body, { status: 200, headers });
  }

  static internalServerError() {
    return NextResponse.json(
      { error: { message: 'Internal server error' } },
      { status: 500 },
    );
  }

  static unauthorized() {
    return NextResponse.json(
      { error: { message: 'Unauthorized' } },
      { status: 403 },
    );
  }

  static badRequest(message: string) {
    return NextResponse.json({ error: { message } }, { status: 400 });
  }

  static invalidRequest(zodError: ZodError) {
    return NextResponse.json(
      { error: { message: 'Invalid request', details: zodError } },
      { status: 400 },
    );
  }

  static tooManyRequests({ headers }: { headers?: HeadersInit }) {
    return NextResponse.json(
      { error: { message: 'Too many requests' } },
      { status: 429, headers },
    );
  }
}
