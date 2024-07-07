import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';

import { handlers } from '../../../../auth';

export const {GET, POST} = handlers;
