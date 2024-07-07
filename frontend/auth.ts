import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { AuthUser } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import axios from 'axios';
import Google from "next-auth/providers/google"
import Discord from "next-auth/providers/discord"

async function getUser(email: string): Promise<AuthUser | null> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/${email}`);
    return response.data;
  } catch (error) {
    // console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [ Google, Discord,
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Invalid credentials format');
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const user = await getUser(email);

          if (!user) {
            console.log('User not found');
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          } else {
            console.log('Invalid password');
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
