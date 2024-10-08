import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth';
import { z } from 'zod';

// Define the UserStatus enum
const UserStatus = z.enum(['ACCEPTED', 'REJECTED', 'WAITLIST', 'APPLIED', 'NOT_APPLIED']);

// Define a custom validation schema using Zod
const userSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  school: z.string().min(1, { message: "School is required" }),
  level_of_study: z.string().min(1, { message: "Level of study is required" }),
  field_of_study: z.string().min(1, { message: "Field of study is required" }),
  country_of_residence: z.string().min(1, { message: "Country of residence is required" }),
  dietary_restrictions: z.string().optional(),
  age: z.number().min(1, { message: "Age is required" }),
  address: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  personal_website: z.string().optional(),
  resume: z.string().url({ message: "Resume URL is required and must be a valid URL" }),
  MLH_authorize: z.boolean().refine(val => val === true, { message: "You must agree to the MLH Code of Conduct" }),
  optional_consider: z.string().optional(),
  optional_gender: z.string().optional(),
  optional_pronouns: z.string().optional(),
  optional_race: z.string().optional(),
  optional_underrepresented: z.string().optional(),
  t_shirt_size: z.string().optional(),
  status: UserStatus.optional().default('APPLIED'),
});


// Handle GET request to retrieve user status
export async function GET(request: NextRequest) {
  try {
    // Get the session
    const session = await auth();

    // Check if the session exists and get the user ID
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const userId = Number(session.user.id);

    // Fetch the user's status from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true }, // Select only the status field
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return the user's status as JSON
    return new NextResponse(JSON.stringify({ status: user.status }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching user status' }), { status: 500 });
  }
}

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
          address: validatedData.address,
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
