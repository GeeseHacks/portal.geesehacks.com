"use server";

// import { signIn } from "@/auth"; 
import { cookies } from 'next/headers';
import axios from 'axios';

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
    return "Sign-in successful";
  } catch (error: Error | any) {
    if (error) {
      return error.message;
    }
    throw error;
  }
}

export async function signIn(provider: string, username: string, password: string) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
      provider,
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response.data); // Handle the response as needed
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid Credentials");
    } else {
      throw new Error("Something went wrong");
    }
  }
}
