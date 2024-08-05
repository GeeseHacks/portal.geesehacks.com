import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }

  try {
    const { email} = await req.json();

    // Validate the request body
    if (!email) {
      return new NextResponse(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user_auth.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiration = new Date(Date.now() + 3600000); //valid for an hour


    await prisma.user_auth.update({
        where: { email },
        data: {
          resetToken,
          tokenExpiration,
        },
      });

    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${resetToken}`;
    
    //send the email link here

    console.log(`Password reset link: ${resetLink}`);

    return new NextResponse(JSON.stringify({ message: 'Generated token' }), { status: 201 });
  } catch (error) {
    console.error('Error generating token:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to generate token' }), { status: 500 });
  }
}
