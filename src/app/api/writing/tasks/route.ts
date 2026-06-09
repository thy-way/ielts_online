import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const tasks = await prisma.writingTask.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(tasks);
  } catch (e) { console.error(e); return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
