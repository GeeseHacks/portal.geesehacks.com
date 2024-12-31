import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { name: string } }) {
  const { name: projName } = params;

  try {

    const proj = await prisma.project.findFirst({
      where: {
        name: projName,
      },
      select: {
        id: true,
      },
    });

    if (!proj) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const projectId = proj.id;
    
    // Fetch investments for the given projectId
    const investments = await prisma.investment.findMany({
      where: {
        projectId: projectId, // Make sure projectId is an integer
      },
      include: {
        project: {
          select:{
            id:true,
            name: true,
            totalInvestment: true,
          }

        }
      },
    });

    // If no investments found for the project, return a 404
    if (!investments.length) {
      return NextResponse.json({ error: 'No investments found for this project' }, { status: 404 });
    }

    // Transform the investments into the desired format
    const dataForProject: { time: string; value: number }[] = investments.map((investment) => ({
      time: investment.createdAt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: investment.amount,
    }));

    // Send back the investment data with a 200 response
    return NextResponse.json({ projectId, investments: dataForProject }, { status: 200 });
  } catch (error) {
    console.error('Error fetching investments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
