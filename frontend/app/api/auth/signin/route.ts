// route: api/auth/signin
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { provider, username, password } = body;

  if (username === "test@example.com" && password === "password123") {
    // Successful authentication
    return new NextResponse(JSON.stringify({ message: "Sign-in successful" }), {
      status: 200
    });
  } else {
    // Failed authentication
    return new NextResponse(JSON.stringify({ message: "Invalid Credentials" }), {
      status: 401
    });
  }
}
