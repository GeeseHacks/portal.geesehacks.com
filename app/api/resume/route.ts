import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  const readableStream = request.body as ReadableStream<Uint8Array>;

  const blob = await put(`resumes/${filename}`, readableStream, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
