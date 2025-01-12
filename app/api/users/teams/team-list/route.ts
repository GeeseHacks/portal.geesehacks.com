// This route gets a list of users with a given team_id
// URL: /api/users/teams/team-list?team_id=123
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team_id = searchParams.get("team_id");
  const users = await prisma.user.findMany({ where: { team_id } });
  console.log("Users: ", users);
  return NextResponse.json(users);
}
