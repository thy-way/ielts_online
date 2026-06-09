import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const exercises = await prisma.question.findMany({
      where: { type: "grammar" },
      take: limit,
      orderBy: { id: "asc" },
    });

    // Shuffle, strip answer for client
    const shuffled = exercises.sort(() => Math.random() - 0.5).map(({ answer, ...rest }) => rest);
    return NextResponse.json(shuffled);
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { questionId, userAnswer } = await req.json();
    if (!questionId || userAnswer == null) {
      return NextResponse.json({ error: "questionId and userAnswer required" }, { status: 400 });
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } });
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
    return NextResponse.json({ isCorrect, correctAnswer: question.answer, explanation: question.explanation });
  } catch (error) {
    console.error("Failed to submit exercise:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
