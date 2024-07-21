import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma';
import { auth } from '@/auth';

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    // Get the session
    const session = await auth();

    // Check if the session exists and get the user ID
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Convert user ID to number
    const userId = Number(session.user.id);
    
    // Parse the request body to get the application response data
    const body = await request.json();
    const {
      q1,
      q2,
      q3
    } = body;
    
    // Log session, userId, and request body for debugging
    console.log('Session:', session);
    console.log('UserID:', userId);
    console.log('Request Body:', body);

    // Validate the required fields
    if (!q1 || !q2 || !q3) {
      return new NextResponse(JSON.stringify({ error: 'Required fields are missing' }), { status: 400 });
    }

    // Create a new application responses in a transaction
    const newAppResp = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the new application response
      const createdAppResp = await prisma.application_responses.create({
        data: {
          userid: userId,
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
