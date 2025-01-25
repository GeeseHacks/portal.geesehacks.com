import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectIds = searchParams.get("projectIds")?.split(",");

  if (!projectIds) {
    return NextResponse.json(
      { error: "Project IDs are required" },
      { status: 400 }
    );
  }

  try {
    const investments = await prisma.investmentHistory.findMany({
      where: {
        projectId: {
          in: projectIds,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Group investments by project ID
    const groupedInvestments = projectIds.reduce(
      (acc, projectId) => {
        acc[projectId] = investments
          .filter((inv) => inv.projectId === projectId)
          .map((inv) => ({
            time: inv.createdAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            value: inv.projectValue,
          }));
        return acc;
      },
      {} as Record<string, any>
    );

    return NextResponse.json(groupedInvestments);
  } catch (error) {
    console.error(`Error fetching investments for projects:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
