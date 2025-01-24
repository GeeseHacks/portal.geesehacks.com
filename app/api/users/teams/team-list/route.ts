// This route gets a list of users with a given project_id
// URL: /api/users/teams/team-list?project_id=123
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const project_id = searchParams.get("project_id");
  const users = await prisma.user.findMany({ where: { project_id } });
  return NextResponse.json(users);
}
