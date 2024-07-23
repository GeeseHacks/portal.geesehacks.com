'use server';

import { signIn } from '@/auth';

export async function signInActionDiscord() {
    await signIn("discord");
}
