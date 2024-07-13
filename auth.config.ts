import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnRegistrationPortal = nextUrl.pathname.startsWith('/apply');
      if (isOnRegistrationPortal) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/apply', nextUrl));
      }
      return true;
    },
    jwt({ token, user, account, profile }) {
      if (profile && account?.provider === 'google') {
        token.id = profile.sub;
      }
      else if (profile && account?.provider === 'discord') {
        token.id = profile.sub;
      }

      else if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
