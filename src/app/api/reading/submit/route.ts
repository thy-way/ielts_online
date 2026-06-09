import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { questionId, userAnswer } = await req.json();
    if (!questionId || userAnswer == null) {
      return NextResponse.json({ error: "questionId and userAnswer required" }, { status: 400 });
    }
    const q = await prisma.question.findUnique({ where: { id: questionId } });
    if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const isCorrect = q.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
    return NextResponse.json({ isCorrect, correctAnswer: q.answer });
  } catch (error) {
    console.error("Failed:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
