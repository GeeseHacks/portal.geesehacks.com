import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import type { AuthUser } from '@lib/definitions';
import bcrypt from 'bcrypt';
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { validateEmail } from '@/lib/emailUtils';
import { validatePassword } from '@/lib/passwordUtils';

async function getUser(email: string): Promise<AuthUser | null> {
  try {
    console.log('Fetching user:', email);
    console.log("API URL: ", `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
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
