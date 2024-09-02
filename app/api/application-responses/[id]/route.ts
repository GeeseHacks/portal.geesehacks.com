import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth';
import { z } from 'zod';
import { serializeWithBigInt } from '@utils/serialize';

// Define the schema for params using Zod
const paramsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
});

// Handler for GET requests
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Validate the params using Zod
    const validatedParams = paramsSchema.safeParse(params);

    // If validation fails, return a 400 error with validation message
    if (!validatedParams.success) {
      return new NextResponse(JSON.stringify({ error: validatedParams.error.message }), { status: 400 });
    }

    // Get the session
    const session = await auth();

    // Check if the session exists and get the user ID
    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Convert the 'id' parameter from string to integer
    const userId = parseInt(validatedParams.data.id, 10);

    // Find the unique application response by ID using Prisma
    const appResp = await prisma.applicationResponse.findUnique({
      where: { id: userId },
    });

    // If the application response is found, return the application response data as JSON
    if (appResp) {
      return new NextResponse(serializeWithBigInt(appResp), { status: 200 });
    } else {
      // If the application response is not found, return a 404 error with a message
      return new NextResponse(JSON.stringify({ error: 'Application response not found' }), { status: 404 });
    }
  } catch (error) {
    // Log any errors to the console
    console.error(error);

    // Return a 500 error with a message if there is a server error
    return new NextResponse(JSON.stringify({ error: 'Error fetching application response' }), { status: 500 });
  }
}
