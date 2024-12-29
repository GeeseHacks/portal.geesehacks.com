// This API route updates the status of the hacker from "APPLIED" to "CONFIRMED"

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Adjust the path based on your project structure
import { auth } from '@/auth'; // Adjust the path if necessary

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Hacker ID is required' }, { status: 400 });
    }

    // Update the user's status in the database
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });

    // Return the updated user
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error confirming hacker status:', error);
    return NextResponse.json({ error: 'Failed to confirm hacker status' }, { status: 500 });
  }
}
