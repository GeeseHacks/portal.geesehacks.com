import { NextResponse } from "next/server";
import prisma from '@lib/prisma';

// Get the project ID for a given user_id
// URL: /api/projects/project-id?id=123
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        project_id: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ project_id: user.project_id });
  } catch (error) {
    console.error("Error fetching user team:", error);
    return NextResponse.json({ error: "Failed to fetch user team" }, { status: 500 });
  }
}

// Update the project ID for a given user_id
// URL: /api/projects/project-id
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, project_id } = body;

    if (!user_id || !project_id) {
      return NextResponse.json({ error: "User ID and project ID are required" }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        project_id: project_id
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join project" }, { status: 400 });
  }
}
