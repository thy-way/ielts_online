import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function calculateSM2(quality: number, repetitions: number, ease: number, prevInterval: number) {
  let newInterval = prevInterval;
  let newEase = ease;
  let newRepetitions = repetitions;

  if (quality < 3) {
    newRepetitions = 0;
    newInterval = 1;
  } else {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(prevInterval * ease);
    }
    newRepetitions += 1;
  }

  newEase = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEase < 1.3) newEase = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return { newEase, newInterval, newRepetitions, nextReview };
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { wordId, quality } = await req.json();
    if (!wordId || quality == null) {
      return NextResponse.json({ error: "wordId and quality are required" }, { status: 400 });
    }

    const existing = await prisma.userVocabularyProgress.findUnique({
      where: {
        userId_wordId: { userId: session.user.id, wordId },
      },
    });

    const { newEase, newInterval, newRepetitions, nextReview } = calculateSM2(
      quality,
      existing?.repetitions ?? 0,
      existing?.ease ?? 2.5,
      existing?.interval ?? 0,
    );

    const progress = await prisma.userVocabularyProgress.upsert({
      where: {
        userId_wordId: { userId: session.user.id, wordId },
      },
      update: {
        ease: newEase,
        interval: newInterval,
        repetitions: newRepetitions,
        nextReviewAt: nextReview,
        lastReviewAt: new Date(),
        consecutiveCorrect: quality >= 4 ? { increment: 1 } : 0,
      },
      create: {
        userId: session.user.id,
        wordId,
        ease: newEase,
        interval: newInterval,
        repetitions: newRepetitions,
        nextReviewAt: nextReview,
        consecutiveCorrect: quality >= 4 ? 1 : 0,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Failed to submit review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
