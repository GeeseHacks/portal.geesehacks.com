import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client

// Handler for GET requests
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Convert the 'id' parameter from string to integer
    const userId = parseInt(params.id, 10);

    // Find the unique user by ID using Prisma
    const user = await prisma.users.findUnique({
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
