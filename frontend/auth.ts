import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { AuthUser } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import axios from 'axios';
 
async function getUser(email: string): Promise<AuthUser | undefined> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${email}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;

            const user = await getUser(email);

            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
   
            if (passwordsMatch) return user;
          }
   
          console.log('Invalid credentials');
          return null;
      },
    }),
  ],
});
