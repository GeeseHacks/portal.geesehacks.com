// route: api/auth/signin
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  console.log("FINALLY");
  const { email, password } = req.body;

  if (email === "test@example.com" && password === "password123") {
    // Successful authentication
    return new NextResponse(JSON.stringify({ message: "Sign-in successful" }), 
      {status: 200}
  );
  } else {
    // Failed authentication
    return new NextResponse(JSON.stringify({ message: "CredentialsSignin" }), 
      {status: 401}
    );
  }
}
