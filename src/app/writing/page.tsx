import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PenTool, ChevronRight, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default async function WritingPage() {
  const tasks = await prisma.writingTask.findMany({ orderBy: { id: "asc" } });
  const t1 = tasks.filter(t => t.taskType === "task1");
  const t2 = tasks.filter(t => t.taskType === "task2");
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link>
      </div></header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-6 flex items-center gap-3"><PenTool className="h-8 w-8 text-primary" /><h1 className="text-3xl font-bold">写作训练</h1></div>
        <p className="mb-8 text-slate-500">IELTS Academic Writing Task 1 &amp; Task 2 练习，内置计时与 AI 评分</p>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Link href="#task1"><Card className="group cursor-pointer hover:shadow-md border-2 border-blue-100">
            <CardHeader><CardTitle className="flex items-center gap-2"><Badge className="bg-blue-100 text-blue-700">T1</Badge>Task 1 图表描述</CardTitle>
            <p className="text-sm text-slate-500">20 分钟 · 150 词 · 柱状图/折线图/饼图/表格/流程图</p></CardHeader>
            <CardContent className="flex flex-wrap gap-2">{t1.map(t => <Badge key={t.id} variant="outline">{t.bandScore}</Badge>)}</CardContent>
          </Card></Link>
          <Link href="#task2"><Card className="group cursor-pointer hover:shadow-md border-2 border-amber-100">
            <CardHeader><CardTitle className="flex items-center gap-2"><Badge className="bg-amber-100 text-amber-700">T2</Badge>Task 2 议论文</CardTitle>
            <p className="text-sm text-slate-500">40 分钟 · 250 词 · 观点/讨论/问题解决/双边</p></CardHeader>
            <CardContent className="flex flex-wrap gap-2">{t2.map(t => <Badge key={t.id} variant="outline">{t.bandScore}</Badge>)}</CardContent>
          </Card></Link>
        </div>
        <h2 className="text-lg font-semibold mb-4" id="task1">Task 1 题目列表</h2>
        <div className="space-y-3 mb-8">{t1.map((t,i) => <Link key={t.id} href={"/writing/practice/" + t.id}>
          <Card className="group cursor-pointer hover:shadow-md"><CardHeader className="pb-2">
            <div className="flex items-center justify-between"><CardTitle className="text-base flex items-center gap-2"><Badge className="bg-blue-100 text-blue-700">T1</Badge>Task 1 - {i+1}</CardTitle><ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" /></div>
          </CardHeader><CardContent><div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />20 min</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3" />Goal: {t.bandScore}</span>
          </div></CardContent></Card>
        </Link>)}</div>
        <h2 className="text-lg font-semibold mb-4" id="task2">Task 2 题目列表</h2>
        <div className="space-y-3">{t2.map((t,i) => <Link key={t.id} href={"/writing/practice/" + t.id}>
          <Card className="group cursor-pointer hover:shadow-md"><CardHeader className="pb-2">
            <div className="flex items-center justify-between"><CardTitle className="text-base flex items-center gap-2"><Badge className="bg-amber-100 text-amber-700">T2</Badge>Task 2 - {i+1}</CardTitle><ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" /></div>
          </CardHeader><CardContent><div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />40 min</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3" />Goal: {t.bandScore}</span>
          </div></CardContent></Card>
        </Link>)}</div>
      </main>
    </div>);
}
