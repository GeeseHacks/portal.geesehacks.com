import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react';

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeeseHacks",
  description: "GeeseHacks, a hybrid hackathon and case competition, will be held from January 10-13, 2025. Participants are invited to create innovative projects or craft unique solutions for real-world challenges. Join us for a weekend of creativity, collaboration, and problem-solving!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
