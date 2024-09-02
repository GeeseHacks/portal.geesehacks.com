import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return new NextResponse(JSON.stringify({ message: 'Token and/or new password is required' }), { status: 400 });
    }

    const user = await prisma.userAuth.findFirst({
      where: {
        resetToken: token,
        tokenExpiration: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: 'Invalid or expired reset token' }), { status: 404 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await prisma.userAuth.update({
      where: { email: user.email },
      data: {
        password: hashedPassword,
        resetToken: null,
        tokenExpiration: null,
      },
    });
    console.log("API was called");
    return new NextResponse(JSON.stringify({ message: 'Password reset successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}