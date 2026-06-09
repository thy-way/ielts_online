import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ topic: string }> }
) {
  try {
    const { topic } = await params;
    const { searchParams } = new URL(_req.url);
    const filter = searchParams.get("filter");
    const level = searchParams.get("level");

    const where: Record<string, unknown> = {};
    if (topic === "parts-of-speech" && filter) {
      where.partOfSpeech = filter;
    } else if (topic !== "parts-of-speech") {
      where.topic = topic;
    }
    if (level) where.level = level;

    const words = await prisma.vocabularyWord.findMany({
      where,
      orderBy: { word: "asc" },
    });
    return NextResponse.json(words);
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
  }
}
