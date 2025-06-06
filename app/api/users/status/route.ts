import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth'; // Assuming `auth` retrieves the user's session
import { z } from 'zod';
import { UserStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    // Get the session and check if the user is authenticated
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const userId = session.user.id;

    // Retrieve the user's application status from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true }, // Only select the status field
    });

    // if the user not found, just return "did not apply"
    if (!user) {
      return new NextResponse(JSON.stringify({ status: UserStatus.NOT_APPLIED }), { status: 201 });
    }
    // Return the user's application status
    return new NextResponse(JSON.stringify({ status: user.status }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching application status' }), { status: 500 });
  }
}
