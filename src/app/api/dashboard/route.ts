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
    const userId = session.user.id;
    const now = new Date();

    const [vocabCount, reviewedCount, masteredCount, dueCount,
      grammarCompleted, grammarTotal, user, topics, topicProgress] = await Promise.all([
      prisma.vocabularyWord.count(),
      prisma.userVocabularyProgress.count({ where: { userId, repetitions: { gt: 0 } } }),
      prisma.userVocabularyProgress.count({ where: { userId, consecutiveCorrect: { gte: 3 } } }),
      prisma.userVocabularyProgress.count({ where: { userId, nextReviewAt: { lte: now } } }),
      prisma.userGrammarProgress.count({ where: { userId, isCompleted: true } }),
      prisma.grammarPoint.count(),
      prisma.user.findUnique({ where: { id: userId }, select: { streak: true, totalStudyMinutes: true, createdAt: true } }),
      prisma.vocabularyTopic.findMany({ orderBy: { sortOrder: "asc" }, select: { name: true, nameCn: true, wordCount: true, icon: true } }),
      prisma.userVocabularyProgress.findMany({
        where: { userId, repetitions: { gt: 0 } },
        select: { word: { select: { topic: true } } },
      }),
    ]);

    const reviewedTopics: Record<string, number> = {};
    for (const p of topicProgress) {
      const t = p.word.topic;
      reviewedTopics[t] = (reviewedTopics[t] || 0) + 1;
    }
    const topicStats = topics.map((t) => ({
      name: t.name,
      nameCn: t.nameCn,
      icon: t.icon,
      total: t.wordCount,
      reviewed: reviewedTopics[t.name] || 0,
    }));

    return NextResponse.json({
      streak: user?.streak ?? 0,
      totalStudyMinutes: user?.totalStudyMinutes ?? 0,
      vocabTotal: vocabCount,
      vocabReviewed: reviewedCount,
      vocabMastered: masteredCount,
      vocabDue: dueCount,
      grammarCompleted,
      grammarTotal,
      topics: topicStats,
      createdAt: user?.createdAt,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
