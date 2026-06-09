import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const progress = await prisma.userGrammarProgress.findMany({
      where: { userId: session.user.id },
    });
    return NextResponse.json(progress);
  } catch (error) {
    console.error("Failed to fetch grammar progress:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { grammarId, score } = await req.json();
    if (!grammarId) {
      return NextResponse.json({ error: "grammarId required" }, { status: 400 });
    }
    const progress = await prisma.userGrammarProgress.upsert({
      where: { userId_grammarId: { userId: session.user.id, grammarId } },
      update: { isCompleted: true, score: score ?? 0 },
      create: { userId: session.user.id, grammarId, isCompleted: true, score: score ?? 0 },
    });
    return NextResponse.json(progress);
  } catch (error) {
    console.error("Failed to update grammar progress:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
