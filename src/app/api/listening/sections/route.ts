import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const passages = await prisma.listeningPassage.findMany({
      select: { section: true, difficulty: true, id: true },
      orderBy: { sortOrder: "asc" },
    });

    const sectionCounts: Record<number, { total: number; easy: number; medium: number; hard: number }> = {};
    for (const p of passages) {
      if (!sectionCounts[p.section]) sectionCounts[p.section] = { total: 0, easy: 0, medium: 0, hard: 0 };
      sectionCounts[p.section].total++;
      sectionCounts[p.section][p.difficulty as keyof typeof sectionCounts[number]]++;
    }

    const sections = [1, 2, 3, 4].map((s) => ({
      section: s,
      ...sectionCounts[s],
      label: ["日常对话", "日常独白", "学术对话", "学术演讲"][s - 1],
      description: ["Section 1 日常社交场景", "Section 2 日常独白信息", "Section 3 学术讨论场景", "Section 4 学术演讲讲座"][s - 1],
    }));

    return NextResponse.json(sections);
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
