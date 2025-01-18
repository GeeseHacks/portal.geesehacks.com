// A route to upsert a project
// The project ID must be provided in the request body

import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

// URL: /api/projects
export async function POST(request: Request) {
  const { projectId, ...data } = await request.json();

  console.log("Data: ", data);
  if (!projectId) {
    return NextResponse.json(
      { error: "project_id is required" },
      { status: 400 }
    );
  }

  // Create or update the project
  const project = await prisma.project.upsert({
    where: { id: projectId },
    update: {
      name: data.name,
      description: data.description,
      devpostLink: data.devpostLink,
      imageUrl: data.imageUrl,
    },
    create: {
      id: projectId,
      name: data.name,
      description: data.description,
      devpostLink: data.devpostLink,
      imageUrl: data.imageUrl,
    },
  });

  // Handle categories/tracks
  if (data.tracks) {
    // Ensure "General" track is included
    const tracksWithGeneral = Array.from(new Set([...data.tracks, "General"]));

    await prisma.projectCategory.deleteMany({
      where: { projectId: projectId },
    });

    // Find the General category first
    const generalCategory = await prisma.category.findFirst({
      where: { name: "General" },
    });

    if (!generalCategory) {
      throw new Error('Category "General" does not exist');
    }

    // Create all categories including General
    await Promise.all(
      tracksWithGeneral.map(async (trackName: string) => {
        const existingCategory = await prisma.category.findFirst({
          where: { name: trackName },
        });

        if (!existingCategory) {
          throw new Error(`Category "${trackName}" does not exist`);
        }

        // Set investment amount for General track if totalTeamNetWorth is provided
        const investmentAmount =
          trackName === "General"
            ? data.totalTeamNetWorth // Ensure non-negative value
            : 0;

        return prisma.projectCategory.create({
          data: {
            projectId: projectId,
            categoryId: existingCategory.id,
            investmentAmount,
          },
        });
      })
    );
  }

  return NextResponse.json(project);
}

// Get the project for a given project_id
// URL: /api/projects?project_id=123

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("project_id");
  console.log("Project ID: ", projectId);

  if (!projectId) {
    return NextResponse.json(
      { error: "project_id is required" },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!project) {
      console.log("Project not found");
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Transform the data to match the expected format
    return NextResponse.json({
      name: project.name,
      description: project.description,
      devpostLink: project.devpostLink,
      tracks: project.categories.map((pc) => pc.category.name),
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
