import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: Request): Promise<NextResponse> {
  // Get the session
  const session = await auth();

  // Check if the session exists and get the user ID
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  
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
