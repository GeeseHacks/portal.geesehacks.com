"use server";

// import { signIn } from "@/auth"; 
import { cookies } from 'next/headers';
 
// export async function handleLogin(sessionData) {
//   const encryptedSessionData = crypto.encrypt(sessionData) // Encrypt your session data
//   cookies().set('session', encryptedSessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7, // One week
//     path: '/',
//   })
//   // Redirect or handle the response after setting the cookie
// }

export async function authenticate(username: string, password: string) {
  try {
    await signIn("credentials", username, password);
    return "Testing: Sign-in successful";
  } catch (error: Error | any) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signIn(provider: string, username: string, password: string) {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({provider, username, password}), 
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Authentication failed");
  }
  // Handle successful sign-in
  const data = await response.json();

  return data;
}
