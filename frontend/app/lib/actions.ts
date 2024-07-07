'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(email: string, password: string) {
  try {
    await signIn('credentials', {email: email, password: password});
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid username or password';
    }
    throw error;
  }
}
