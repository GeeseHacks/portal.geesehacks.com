import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma'; // Import the initialized Prisma client
import { auth } from '@/auth'; // Assuming `auth` retrieves the user's session
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Get the session and check if the user is authenticated
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();

    // Use zod to validate the input schema
    const schema = z.object({
      emails: z.array(z.string().email()).nonempty('Emails are required'),
    });

    const { emails } = schema.parse(body);

    // Update the application status of the applicants to "ACCEPTED" if not already "ACCEPTED" or "CONFIRMED"
    const updatedApplicants = await prisma.user.updateMany({
      where: {
        email: { in: emails },
        status: { notIn: ['ACCEPTED', 'CONFIRMED'] },
      },
      data: {
        status: 'ACCEPTED',
      },
    });

    return new NextResponse(
      JSON.stringify({
        message: 'Applicants updated successfully',
        updatedCount: updatedApplicants.count,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: 'Error updating application status' }),
      { status: 500 }
    );
  }
}
