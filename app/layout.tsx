import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <head>
        <meta name="description" content="GeeseHacks, a hybrid hackathon and case competition, will be held from January 10-12, 2025. Participants are invited to create innovative projects or craft unique solutions for real-world challenges. Join us for a weekend of creativity, collaboration, and problem-solving!" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
          <Toaster/>
        </SessionProvider>
      </body>
    </html>
  );
}


export const metadata = {
  title: "GeeseHacks",
}
