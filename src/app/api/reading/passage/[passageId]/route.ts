import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ passageId: string }> }
) {
  try {
    const { passageId } = await params;
    const passage = await prisma.readingPassage.findUnique({
      where: { id: passageId },
      include: { questions: { orderBy: { id: "asc" } } },
    });
    if (!passage) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(passage);
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
