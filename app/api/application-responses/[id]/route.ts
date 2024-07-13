import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client


// Handler for GET requests
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Convert the 'id' parameter from string to integer
    const userId = parseInt(params.id, 10);

    // Find the unique application response by ID using Prisma
    const appResp = await prisma.application_responses.findUnique({
      where: { id: userId },
    });

    // If the application response is found, return the application response data as JSON
    if (appResp) {
      return new NextResponse(JSON.stringify(appResp), { status: 200 });
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
