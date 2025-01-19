import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

function getDefaultChartData(startTime:Date, endTime:Date) {
  const data = [];
  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    data.push({
      time: currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: 0,
    });

    // Increment time by 30 minutes
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return data;
}

export async function GET(req: NextRequest, { params }: { params: { projId: string } }) {
  const { projId } = params;

  console.log(projId)

  try {
    const investments = await prisma.investmentHistory.findMany({
      where: { projectId: projId },
      orderBy: { createdAt: 'asc' },
    });

    const timeNow = new Date();
    var startTime = new Date(timeNow);
    startTime.setHours(startTime.getHours()-2);

    const chartData = investments.length
  ? investments.map((investment) => ({
      time: investment.createdAt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      value: investment.projectValue,
    }))
  : getDefaultChartData(startTime, timeNow); // Example start and end times


    return NextResponse.json(chartData);
  } catch (error) {
    console.error(`Error fetching investments for project ${projId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
