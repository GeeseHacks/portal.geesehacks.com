import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { z } from 'zod';

// Define the schema for the query parameters using Zod
const querySchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
});

export async function POST(request: Request): Promise<NextResponse> {
  // Get the session
  const session = await auth();

  // Check if the session exists and get the user ID
  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Validate the query parameters
  const validationResult = querySchema.safeParse({ filename });

  // If validation fails, return a 400 error with validation message
  if (!validationResult.success) {
    return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
  }

  if (!request.body) {
    return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
  }

  // Check file size
  const contentLength = request.headers.get('content-length');
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB limit

  if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File size exceeds the 1 MB limit' }, { status: 413 });
  }

  const readableStream = request.body as ReadableStream<Uint8Array>;

  const blob = await put(`resumes/${filename}`, readableStream, {
    access: 'public',
  });

  return NextResponse.json(blob);
}
