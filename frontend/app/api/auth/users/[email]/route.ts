import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client

// Handler for GET requests
export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
  try {
    const email = params.email;

    // Find the unique user by ID using Prisma
    const user = await prisma.user_auth.findUnique({
      where: { email: email },
    });

    // If user is found, return the user data as JSON
    if (user) {
      return new NextResponse(JSON.stringify(user), { status: 200 });
    } else {
      // If user is not found, return a 404 error with a message
      return new NextResponse(JSON.stringify({ error: 'Email not found' }), { status: 404 });
    }
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error fetching user' }), { status: 500 });
  }
}
