import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import type { AuthUser } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import axios from 'axios';
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { validateEmail } from '@/lib/emailUtils';
import { validatePassword } from '@/lib/passwordUtils';

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
  providers: [
    Google,
    Discord,
    Credentials({
      async authorize(credentials: Record<string, any>) {
        const { email, password } = credentials as { email: string, password: string };

        const emailError = validateEmail(email);
        const passwordErrors = validatePassword(password);

        if (emailError) {
          console.log('Invalid email format:', emailError);
          return null;
        }

        if (passwordErrors.length > 0) {
          console.log('Invalid password format:', passwordErrors.join(', '));
          return null;
        }

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
