import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth';
import { z } from 'zod';

// Define the schema for your params using Zod
const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

// Handler for GET requests
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validate the params using Zod
    const validationResult = paramsSchema.safeParse(params);

    // If validation fails, return a 400 error with validation message
    if (!validationResult.success) {
      return new NextResponse(JSON.stringify({ error: validationResult.error.errors }), { status: 400 });
    }

    // Get the session
    const session = await auth();

    // Check if the session exists and get the user ID
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const userId = validationResult.data.id;

    // Find the unique user by ID using Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user is found, return the user data as JSON
    if (user) {
      return new NextResponse(JSON.stringify(user), { status: 200 });
    } else {
      // If user is not found, return a 404 error with a message
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error fetching user' }), { status: 500 });
  }
}
