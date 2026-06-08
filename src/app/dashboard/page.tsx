import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Flame, Clock, Target, BookOpen, Headphones, PenTool, Mic, FileText, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";

const quickActions = [
  { title: "词汇复习", desc: "今日 12 词待复习", href: "/vocabulary/learn", Icon: BookOpen, color: "bg-blue-50 text-blue-600" },
  { title: "听力练习", desc: "继续 Section 2 训练", href: "#", Icon: Headphones, color: "bg-purple-50 text-purple-600" },
  { title: "阅读练习", desc: "Passage 1 限时阅读", href: "#", Icon: FileText, color: "bg-amber-50 text-amber-600" },
  { title: "写作练习", desc: "Task 2 议论文练习", href: "#", Icon: PenTool, color: "bg-rose-50 text-rose-600" },
  { title: "口语练习", desc: "Part 2 话题卡片", href: "#", Icon: Mic, color: "bg-emerald-50 text-emerald-600" },
  { title: "全科模考", desc: "2 小时完整模拟", href: "#", Icon: Target, color: "bg-slate-100 text-slate-600" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">你好，{session.user?.name || "同学"}</h1>
          <p className="mt-1 text-slate-500">坚持学习，每一步都算数。</p>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "7", label: "连续学习天数", desc: "本周已打卡 5/7 天", Icon: Flame, color: "text-orange-500" },
            { value: "128", label: "总学习分钟", desc: "本周 42 分钟", Icon: Clock, color: "text-blue-500" },
            { value: "63", label: "已掌握词汇", desc: "复习率 78%", Icon: TrendingUp, color: "text-green-500" },
            { value: "6.5", label: "预估分数", desc: "目标 7.0", Icon: Target, color: "text-purple-500" },
          ].map((s) => (
            <Card key={s.label}><CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <s.Icon className={`h-8 w-8 ${s.color}`} />
                <span className="text-2xl font-bold">{s.value}</span>
              </div>
              <div className="mt-3 text-sm font-semibold text-slate-700">{s.label}</div>
              <div className="mt-1 text-xs text-slate-500">{s.desc}</div>
            </CardContent></Card>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">快速开始</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((a) => (
              <Link key={a.title} href={a.href}>
                <Card className="group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="flex items-center gap-4 pt-6">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.color}`}>
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
        <Card><CardHeader><CardTitle className="text-lg flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> 你的学习路线</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[
                { name: "词性基础", done: true },
                { name: "词的构成", done: true },
                { name: "句式组织", current: true },
                { name: "语法融合" },
                { name: "话题词汇" },
              ].map((s, i) => (
                <div key={s.name} className="flex items-center gap-3 shrink-0">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold border-2 ${
                    s.done ? "bg-primary border-primary text-white" : s.current ? "border-primary text-primary bg-primary/5" : "border-slate-200 text-slate-400"
                  }`}>
                    {s.done ? "OK" : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${s.current ? "text-primary" : s.done ? "text-slate-700" : "text-slate-400"}`}>{s.name}</span>
                  {i < 4 && <div className={`w-8 h-0.5 ${s.done ? "bg-primary" : "bg-slate-200"}`} />}
                </div>
              ))}
            </div>
            <div className="mt-4"><Link href="/vocabulary"><Button variant="outline" size="sm">继续学习 <ArrowRight className="ml-1 h-4 w-4" /></Button></Link></div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
