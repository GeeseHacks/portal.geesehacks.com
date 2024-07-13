'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(email: string, password: string) {
  try {
    await signIn('credentials', {email: email, password: password});
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log("Invalid Credentials");
          throw new Error("Invalid Credentials");
        default:
          console.log("Something went wrong");
          throw new Error("Something went wrong");
      }
    }
    throw error;
  }
}
