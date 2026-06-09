import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const passageId = new URL(req.url).searchParams.get("passageId");
    if (!passageId) return NextResponse.json({ error: "passageId required" }, { status: 400 });

    const passage = await prisma.listeningPassage.findUnique({
      where: { id: passageId },
      include: { questions: { orderBy: { id: "asc" } } },
    });
    if (!passage) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const questions = passage.questions.map(({ id, questionText, options, explanation }) => ({
      id, questionText, options, explanation,
    }));
    return NextResponse.json({ ...passage, questions });
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { questionId, userAnswer } = await req.json();
    if (!questionId || userAnswer == null) {
      return NextResponse.json({ error: "questionId and userAnswer required" }, { status: 400 });
    }
    const q = await prisma.question.findUnique({ where: { id: questionId } });
    if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const isCorrect = q.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
    return NextResponse.json({ isCorrect, correctAnswer: q.answer, explanation: q.explanation });
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
