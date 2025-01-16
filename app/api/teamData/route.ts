import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
    // try {
    //   const teams = await prisma.project.findMany();
      
    //   const initialInvestment = 100000; //change in dollars not percent
      
    //   const formattedTeams = teams.map((team) => {
    //     const change = team.totalInvestment >= initialInvestment 
    //       ? `+${((team.totalInvestment - initialInvestment) / initialInvestment * 100).toFixed(2)}%`
    //       : `-${((initialInvestment - team.totalInvestment) / initialInvestment * 100).toFixed(2)}%`;

    //     return {
    //       id: team.id,
    //       name: team.name,
    //       value: `$${team.totalInvestment.toLocaleString()}`,
    //       change: change,
    //       numericValue: team.totalInvestment,
    //     };
    //   });

    //   formattedTeams.sort((a, b) => b.numericValue - a.numericValue);

    //   return NextResponse.json(formattedTeams);
    // } catch (error) {
    //   console.error('Error fetching teams:', error);
    //   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    // }

    
    // @Jennifer, remove this once you've fixed the endpoint
    return NextResponse.json({ error: "Not implemented" }, { status: 500 });
}
