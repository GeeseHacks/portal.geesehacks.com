import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';
import { serializeWithBigInt } from '@utils/serialize';

// Define the schema for the request body using Zod
const requestBodySchema = z.object({
  q1: z.string().min(1, "Question 1 is required"),
  q2: z.string().min(1, "Question 2 is required"),
  q3: z.string().min(1, "Question 3 is required"),
});

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
    
    // Validate the request body using Zod
    const validationResult = requestBodySchema.safeParse(body);

    // If validation fails, return a 400 error with validation message
    if (!validationResult.success) {
      return new NextResponse(JSON.stringify({ error: validationResult.error.message }), { status: 400 });
    }

    // Log session, userId, and request body for debugging
    console.log('Session:', session);
    console.log('UserID:', userId);
    console.log('Request Body:', body);

    // Create a new application responses in a transaction
    const newAppResp = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the new application response
      const createdAppResp = await tx.applicationResponse.create({
        data: {
          userid: userId,
          ...validationResult.data // Use the validated data
        }
      });
      return createdAppResp;
    });

    // Return the newly created application response as JSON
    return new NextResponse(serializeWithBigInt(newAppResp), { status: 201 });
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error creating application response' }), { status: 500 });
  }
}
