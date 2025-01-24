import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const validCategories = ["general", "sun life", "teejlab", "cs-can"];
  if (!category || !validCategories.includes(category.toLowerCase())) {
    return NextResponse.json(
      {
        error:
          "Invalid or missing category. Valid categories are: general, sun life, teejlab, cs-can.",
      },
      { status: 400 }
    );
  }

  try {
    // Step 1: Fetch the top 5 projects with the highest projectValue
    const topProjects = await prisma.projectCategory.findMany({
      where: {
        category: {
          name: category,
        },
      },
      include: {
        project: true,
      },
      orderBy: {
        investmentAmount: "desc",
      },
      take: 5,
    });

    // Step 2: Return the results
    return NextResponse.json({ projects: topProjects });
  } catch (error) {
    console.error("Error fetching investments:", error);
    return NextResponse.json(
      { error: "Failed to fetch investments" },
      { status: 500 }
    );
  }
}
