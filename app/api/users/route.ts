import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth';
import { userSchema } from './schema';

export async function POST(request: NextRequest) {
  try {
    // Get the session
    const session = await auth();

    // Check if the session exists and get the user ID
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Type assertion to assure TypeScript that session.user is defined
    const userId = session.user.id;

    // Parse and validate the request body using the custom Zod schema
    const body = await request.json();
    const validationResult = userSchema.safeParse(body);

    // If validation fails, return a 400 error with validation message
    if (!validationResult.success) {
      return new NextResponse(JSON.stringify({ error: validationResult.error.errors }), { status: 400 });
    }

    // Extract the validated data
    const validatedData = validationResult.data;
    
    // Create a new user in a transaction
    const newUser = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdUser = await tx.user.create({
        data: {
          id: userId,
          firstname: validatedData.firstname,
          lastname: validatedData.lastname,
          email: validatedData.email,
          phone_number: validatedData.phone_number,
          school: validatedData.school,
          level_of_study: validatedData.level_of_study,
          field_of_study: validatedData.field_of_study,
          country_of_residence: validatedData.country_of_residence,
          dietary_restrictions: validatedData.dietary_restrictions || '',
          age: validatedData.age,
          github: validatedData.github,
          linkedin: validatedData.linkedin,
          personal_website: validatedData.personal_website,
          resume: validatedData.resume,
          MLH_authorize: validatedData.MLH_authorize,
          optional_consider: validatedData.optional_consider,
          optional_gender: validatedData.optional_gender,
          optional_pronouns: validatedData.optional_pronouns,
          optional_race: validatedData.optional_race,
          optional_underrepresented: validatedData.optional_underrepresented,
          t_shirt_size: validatedData.t_shirt_size,
          status: validatedData.status,
        },
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
