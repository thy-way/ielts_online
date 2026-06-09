import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const { section } = await params;
    const sn = parseInt(section, 10);
    if (isNaN(sn) || sn < 1 || sn > 4) {
      return NextResponse.json({ error: "Invalid section" }, { status: 400 });
    }
    const passages = await prisma.listeningPassage.findMany({
      where: { section: sn },
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { questions: true } } },
    });
    return NextResponse.json(passages);
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
