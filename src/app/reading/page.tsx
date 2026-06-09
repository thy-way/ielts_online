import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BookOpen, ChevronRight, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const diffColors: Record<string, string> = { easy: "bg-green-100 text-green-700", medium: "bg-amber-100 text-amber-700", hard: "bg-red-100 text-red-700" };

export default async function ReadingPage() {
  const passages = await prisma.readingPassage.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { questions: true } } },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">阅读训练</h1>
        </div>
        <p className="mb-8 text-slate-500">IELTS 阅读 Passage 1-3 分类练习，内置计时与即时判分</p>
        <div className="mb-8 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-lg border bg-white p-3"><span className="font-semibold">题型:</span> 判断/填空/匹配/选择</div>
          <div className="rounded-lg border bg-white p-3"><span className="font-semibold">建议用时:</span> 20 分钟/篇</div>
          <div className="rounded-lg border bg-white p-3"><span className="font-semibold">题数:</span> 13 题/篇</div>
        </div>
        <div className="space-y-3">
          {passages.map((p, i) => (
            <Link key={p.id} href={"/reading/passage/" + p.id}>
              <Card className="group cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-xs font-bold text-slate-500">{i + 1}</span>
                      {p.title}
                    </CardTitle>
                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{p.wordCount} 词</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />20 min</span>
                    <span>{p._count.questions} 题</span>
                    <Badge className={diffColors[p.difficulty]}>
                      {p.difficulty === "easy" ? "基础" : p.difficulty === "medium" ? "中等" : "进阶"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
