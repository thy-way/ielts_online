import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Flame, Clock, Target, BookOpen, Headphones, PenTool, Mic, FileText, TrendingUp, ArrowRight, BookMarked } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { prisma } from "@/lib/prisma";

const quickActions = [
  { title: "词汇复习", desc: "间隔复习 · 今日待复习", href: "/vocabulary/learn", Icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { title: "听力练习", desc: "Section 2 填空训练", href: "#", Icon: Headphones, color: "bg-purple-50 text-purple-600" },
  { title: "阅读训练", desc: "Passages 1-3 分类练习", href: "/reading", Icon: FileText, color: "bg-amber-50 text-amber-600" },
  { title: "写作训练", desc: "Task 1+2 练习+AI评分", href: "/writing", Icon: PenTool, color: "bg-rose-50 text-rose-600" },
  { title: "口语训练", desc: "Parts 1-3 分类练习", href: "/speaking", Icon: Mic, color: "bg-emerald-50 text-emerald-600" },
  { title: "全科模考", desc: "成绩录入与报告", href: "/mock-test", Icon: Target, color: "bg-slate-100 text-slate-600" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = session.user.id;
  const now = new Date();

  const [vocabTotal, reviewedCount, masteredCount, dueCount,
    grammarCompleted, grammarTotal, user, topicDefs, topicProgress] = await Promise.all([
    prisma.vocabularyWord.count(),
    prisma.userVocabularyProgress.count({ where: { userId, repetitions: { gt: 0 } } }),
    prisma.userVocabularyProgress.count({ where: { userId, consecutiveCorrect: { gte: 3 } } }),
    prisma.userVocabularyProgress.count({ where: { userId, nextReviewAt: { lte: now } } }),
    prisma.userGrammarProgress.count({ where: { userId, isCompleted: true } }),
    prisma.grammarPoint.count(),
    prisma.user.findUnique({ where: { id: userId }, select: { streak: true, totalStudyMinutes: true } }),
    prisma.vocabularyTopic.findMany({ orderBy: { sortOrder: "asc" }, select: { name: true, nameCn: true, wordCount: true, icon: true } }),
    prisma.userVocabularyProgress.findMany({
      where: { userId, repetitions: { gt: 0 } },
      select: { word: { select: { topic: true } } },
    }),
  ]);

  const streak = user?.streak ?? 0;
  const totalMinutes = user?.totalStudyMinutes ?? 0;

  // Per-topic stats
  const reviewedTopics: Record<string, number> = {};
  for (const p of topicProgress) {
    const t = p.word.topic;
    reviewedTopics[t] = (reviewedTopics[t] || 0) + 1;
  }
  const topicStats = topicDefs.map((t) => ({
    name: t.name,
    nameCn: t.nameCn,
    icon: t.icon,
    total: t.wordCount,
    reviewed: reviewedTopics[t.name] || 0,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">你好，{session.user?.name || "同学"}</h1>
          <p className="mt-1 text-slate-500">坚持学习，每一步都算数。</p>
        </div>

        {/* Stats cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card><CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Flame className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">{streak}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">连续学习天数</div>
            <div className="mt-1 text-xs text-slate-500">
              {dueCount > 0 ? dueCount + " 个词待复习" : "今日任务已清"}
            </div>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Clock className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">{totalMinutes}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">总学习分钟</div>
            <div className="mt-1 text-xs text-slate-500">
              已掌握 {masteredCount} 个词汇
            </div>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">{reviewedCount}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">已学习词汇</div>
            <div className="mt-1 text-xs text-slate-500">
              共 {vocabTotal} 词 · {vocabTotal > 0 ? Math.round((reviewedCount / vocabTotal) * 100) : 0}% 覆盖率
            </div>
          </CardContent></Card>
          <Card><CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Target className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold">{grammarCompleted}/{grammarTotal}</span>
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">语法进度</div>
            <div className="mt-1 text-xs text-slate-500">
              {grammarTotal > 0 ? Math.round((grammarCompleted / grammarTotal) * 100) : 0}% 完成
            </div>
          </CardContent></Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">快速开始</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((a) => (
              <Link key={a.title} href={a.href}>
                <Card className="group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className={"flex h-10 w-10 items-center justify-center rounded-lg " + a.color}>
                      <a.Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{a.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{a.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Topic Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" /> 话题学习进度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topicStats.map((t) => (
                <Link key={t.name} href={"/vocabulary/topics/" + t.name} className="block">
                  <div className="flex items-center gap-3 group hover:bg-slate-50 rounded-lg p-2 -mx-2 transition-colors">
                    <span className="text-lg shrink-0">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{t.nameCn}</span>
                        <span className="text-xs text-slate-400">{t.reviewed}/{t.total}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: (t.total > 0 ? Math.min(100, (t.reviewed / t.total) * 100) : 0) + "%" }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> 你的学习路线
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[
                { name: "词性基础", done: vocabTotal > 0 },
                { name: "词的构成", done: reviewedCount > 0 },
                { name: "句式组织", current: true },
                { name: "语法融合", done: grammarTotal > 0 },
                { name: "话题词汇" },
              ].map((s, i) => (
                <div key={s.name} className="flex items-center gap-3 shrink-0">
                  <div className={"flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold border-2 " + (
                    s.done ? "bg-primary border-primary text-white" : s.current ? "border-primary text-primary bg-primary/5" : "border-slate-200 text-slate-400"
                  )}>
                    {s.done ? "OK" : i + 1}
                  </div>
                  <span className={"text-sm font-medium " + (s.current ? "text-primary" : s.done ? "text-slate-700" : "text-slate-400")}>{s.name}</span>
                  {i < 4 && <div className={"w-8 h-0.5 " + (s.done ? "bg-primary" : "bg-slate-200")} />}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/vocabulary">
                <Button variant="outline" size="sm">
                  继续学习 <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

