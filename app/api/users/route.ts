import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
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

    // Parse the request body to get user data
    const body = await request.json();
    const {
      id,
      firstname,
      lastname,
      age,
      email,
      phone_number,
      school,
      level_of_study,
      field_of_study,
      country_of_residence,
      address,
      dietary_restrictions,
      github,
      linkedin,
      personal_website
    } = body;

    // Log session, userId, and request body for debugging
    console.log('Session:', session);
    console.log('UserID:', userId);
    console.log('Request Body:', body);
    
    // Validate the required fields
    if (!firstname || !lastname || !email) {
      return new NextResponse(JSON.stringify({ error: 'Required fields are missing' }), { status: 400 });
    }

    // Create a new user in a transaction
    const newUser = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create the new user
      const createdUser = await prisma.users.create({
        data: {
          id: userId,
          firstname,
          lastname,
          age,
          email,
          phone_number,
          school,
          level_of_study,
          field_of_study,
          country_of_residence,
          address,
          dietary_restrictions,
          github,
          linkedin,
          personal_website
        }
      });
      return createdUser;
    });

    // Return the newly created user as JSON
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
  }
}
