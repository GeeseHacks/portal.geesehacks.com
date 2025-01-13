// A route to upsert a project

import prisma from "@lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id, ...data } = await request.json();
  const project = await prisma.project.upsert({
    where: { id },
    update: data,
    create: { id, ...data },
  });
  return NextResponse.json(project);
}
