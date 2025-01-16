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
  if (data.tracks?.length > 0) {
    await prisma.projectCategory.deleteMany({
      where: { projectId: projectId },
    });

    await Promise.all(
      data.tracks.map(async (trackName: string) => {
        const existingCategory = await prisma.category.findFirst({
          where: { name: trackName },
        });

        if (!existingCategory) {
          throw new Error(`Category "${trackName}" does not exist`);
        }

        return prisma.projectCategory.create({
          data: {
            projectId: projectId,
            categoryId: existingCategory.id,
            investmentAmount: 0,
          },
        });
      })
    );
  }

  return NextResponse.json(project);
}
