import { NextResponse } from "next/server";
import prisma from '@lib/prisma';

// Get the team ID for a given user_id
// URL: /api/users/teams?id=123
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
        team_id: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ team_id: user.team_id });
  } catch (error) {
    console.error("Error fetching user team:", error);
    return NextResponse.json({ error: "Failed to fetch user team" }, { status: 500 });
  }
}

// Update the team ID for a given user_id
// URL: /api/users/teams
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, team_id } = body;

    if (!user_id || !team_id) {
      return NextResponse.json({ error: "User ID and team ID are required" }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        team_id: team_id
      }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to join team" }, { status: 400 });
  }
}
