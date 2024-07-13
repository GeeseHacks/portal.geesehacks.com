import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const { email } = await request.json();

    // Find the unique user by email using Prisma
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
