import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
    try {
        // Fetch all investments with related project (team) details
        const investments = await prisma.investment.findMany({
          include: {
            project: true, // Include project (team) details
          },
        });

        console.log(investments);
    
        // Transform investments into the desired format
        const dataForTeams: Record<string, { time: string; value: number }[]> = {};
    
        // Iterate over the fetched investments
        investments.forEach((investment) => {
          const { project, amount, createdAt } = investment;
    
          // Format the timestamp to a string like "11:00 AM"
          const time = createdAt.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
    
          // Initialize the team in the result object if it doesn't exist
          if (!dataForTeams[project.name]) {
            dataForTeams[project.name] = [];
          }
    
          // Push investment data for that time and amount
          dataForTeams[project.name].push({
            time,
            value: amount,
          });
        });
    
        // Send the response back as JSON
        return NextResponse.json(dataForTeams, { status: 200 });
      } catch (error) {
        console.error('Error fetching investments:', error);
        return new NextResponse(JSON.stringify({ message: 'Generated token' }), { status: 500 });
      }
}