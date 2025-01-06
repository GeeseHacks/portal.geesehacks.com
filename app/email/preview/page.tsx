'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AcceptanceEmail } from '@/components/emails/AcceptedTemplate';

export default function EmailPreviewPage() {
  return <AcceptanceEmail name='Benny' email='benny.wu.new@gmail.com'/>;
}
