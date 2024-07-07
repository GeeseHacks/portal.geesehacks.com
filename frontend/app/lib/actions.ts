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
          return "Invalid Credentials"
        default:
          console.log("Something went wrong");
          return "Something went wrong";
      }
    }
    throw error;
  }
}
