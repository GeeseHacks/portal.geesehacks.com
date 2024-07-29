import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }

  try {
    const { email, password } = await req.json();

    // Validate the request body
    if (!email || !password) {
      return new NextResponse(JSON.stringify({ message: 'Email and password are required' }), { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user_auth.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ message: 'User already exists' }), { status: 409 });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const newUser = await prisma.user_auth.create({
      data: {
        email,
        password: hashedPassword,
        resetToken: null,
        tokenExpiration: null
      },
    });

    return new NextResponse(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new NextResponse(JSON.stringify({ message: 'Failed to create user' }), { status: 500 });
  }
}
