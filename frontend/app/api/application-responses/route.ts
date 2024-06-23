import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma'; // Import the initialized Prisma client

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the application response data
    const body = await request.json();
    const {
      userid,
      q1,
      q2,
      q3
    } = body;

    // Validate the required fields
    if (!userid || !q1 || !q2 || !q3) {
      return new NextResponse(JSON.stringify({ error: 'Required fields are missing' }), { status: 400 });
    }

    // Create a new application responses in a transaction
    const newAppResp = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the new application response
      const createdAppResp = await prisma.application_responses.create({
        data: {
          userid,
          q1,
          q2,
          q3
        }
      });
      return createdAppResp;
    });

    // Return the newly created application response as JSON
    return new NextResponse(JSON.stringify(newAppResp), { status: 201 });
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error creating application response' }), { status: 500 });
  }
}
