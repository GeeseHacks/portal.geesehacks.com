'use server';

import { signIn } from '@/auth';

export async function signInActionGoogle() {
    await signIn("google");
}
