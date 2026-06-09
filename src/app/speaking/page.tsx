import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Mic, ChevronRight, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
export default async function SpeakingPage() {
  const topics = await prisma.speakingTopic.findMany({ orderBy: [{ part: "asc" }, { topic: "asc" }] });
  const p1 = topics.filter(t => t.part === 1); const p2 = topics.filter(t => t.part === 2); const p3 = topics.filter(t => t.part === 3);
  const info = [
    { part: 1, label: "Part 1: Introduction", desc: "日常话题问答 · 4-5 分钟", icon: "🎤", color: "bg-green-50 border-green-200", count: p1.length },
    { part: 2, label: "Part 2: Individual Long Turn", desc: "话题卡片 · 1 分钟准备 + 2 分钟回答", icon: "📝", color: "bg-blue-50 border-blue-200", count: p2.length },
    { part: 3, label: "Part 3: Two-way Discussion", desc: "抽象话题讨论 · 4-5 分钟", icon: "💬", color: "bg-purple-50 border-purple-200", count: p3.length },
  ];
  return (<div className="min-h-screen bg-slate-50"><header className="border-b bg-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"><Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link></div></header>
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center gap-3"><Mic className="h-8 w-8 text-primary" /><h1 className="text-3xl font-bold">口语训练</h1></div>
      <p className="mb-8 text-slate-500">IELTS Speaking Parts 1-3 分类练习，内置计时与范文参考</p>
      <div className="grid gap-5 sm:grid-cols-3 mb-8">{info.map(s => <div key={s.part} className={"rounded-xl border-2 p-4 " + s.color}>
        <span className="text-2xl">{s.icon}</span><h3 className="font-semibold mt-2">{s.label}</h3><p className="text-xs text-slate-500 mt-1">{s.desc}</p><p className="text-xs text-slate-400 mt-1">{s.count} 个话题</p>
      </div>)}</div>
      {[[1, p1, "Part 1: 日常问答"],[2, p2, "Part 2: 话题卡片"],[3, p3, "Part 3: 深入讨论"]].map(([p, pts, title]) => (
        <div key={p as number} className="mb-8"><h2 className="text-lg font-semibold mb-4">{title as string}</h2>
        <div className="space-y-3">{(pts as typeof topics).map((t: typeof topics[0]) => <Link key={t.id} href={"/speaking/practice/" + t.id}>
          <Card className="group cursor-pointer hover:shadow-md"><CardHeader className="pb-2"><div className="flex items-center justify-between">
            <CardTitle className="text-base">{t.topic}</CardTitle><ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
          </div></CardHeader><CardContent><div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{JSON.parse(t.questions || "[]").length} 题</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p === 1 ? "4-5" : p === 2 ? "3" : "4-5"} min</span>
          </div></CardContent></Card></Link>)}</div></div>
      ))}
    </main></div>);
}
