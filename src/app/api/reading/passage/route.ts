import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const passages = await prisma.readingPassage.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { questions: true } } },
    });
    return NextResponse.json(passages);
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
