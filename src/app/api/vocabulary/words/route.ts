import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = searchParams.get("topic");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const review = searchParams.get("review") === "true";

    const where: Record<string, unknown> = {};
    if (topic) where.topic = topic;

    if (review) {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const progress = await prisma.userVocabularyProgress.findMany({
        where: {
          userId: session.user.id,
          nextReviewAt: { lte: new Date() },
        },
        include: { word: true },
        orderBy: { nextReviewAt: "asc" },
        take: limit,
      });
      return NextResponse.json(progress.map((p) => p.word));
    }

    const words = await prisma.vocabularyWord.findMany({
      where,
      orderBy: { word: "asc" },
      take: limit,
    });
    return NextResponse.json(words);
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
  }
}
