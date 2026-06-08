import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic, Library, FileText, ArrowRight, CheckCircle2, Users, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  { title: "听力 Listening", desc: "Section 1-4 分类训练 · 倍速精听 · 计时模考", Icon: Headphones, color: "from-violet-500 to-purple-600", bg: "bg-violet-50 text-violet-600" },
  { title: "阅读 Reading", desc: "平行阅读法 · 长难句解析 · 题型专项突破", Icon: BookOpen, color: "from-amber-500 to-orange-600", bg: "bg-amber-50 text-amber-600" },
  { title: "写作 Writing", desc: "Task 1/2 AI 批改 · 范文库 · 语法纠错", Icon: PenTool, color: "from-rose-500 to-pink-600", bg: "bg-rose-50 text-rose-600" },
  { title: "口语 Speaking", desc: "当季题库 · AI 发音评估 · 模型跟读", Icon: Mic, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50 text-emerald-600" },
  { title: "词汇 Vocabulary", desc: "话题分类 · 间隔复习 · 词量成长曲线", Icon: Library, color: "from-sky-500 to-blue-600", bg: "bg-sky-50 text-sky-600" },
  { title: "模考 Mock Test", desc: "全科限时模考 · 自动算分 · 成绩报告", Icon: FileText, color: "from-slate-500 to-slate-700", bg: "bg-slate-100 text-slate-600" },
];

const stats = [
  { value: "5", label: "学习阶段", desc: "词性→词根→句式→语法→话题" },
  { value: "SM-2", label: "间隔算法", desc: "科学记忆曲线自动排期" },
  { value: "10+", label: "IELTS 话题", desc: "教育/环境/科技/社会等" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.08),transparent)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Sparkles className="h-4 w-4" /> 基于认知科学与语言习得理论
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              科学备考<br />
              <span className="bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">高效提分</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-500 sm:text-xl">
              间隔复习 × 主动回忆 × AI 批改<br />让你的每一分钟备考都用在刀刃上。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-md hover:shadow-lg">
                  免费开始学习 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/vocabulary">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">浏览学习内容</Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 无需信用卡</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 已服务 10,000+ 考生</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-violet-600 bg-clip-text text-transparent">{s.value}</div>
                <div className="mt-2 text-sm font-semibold text-slate-800">{s.label}</div>
                <div className="mt-1 text-sm text-slate-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">六大学习模块</h2>
          <p className="mt-3 text-slate-500 text-lg">覆盖 IELTS 全科，从输入到输出一站式训练</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group cursor-pointer hover:shadow-card-hover hover:-translate-y-1">
              <CardHeader>
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${f.bg} transition-colors group-hover:scale-110 duration-200`}>
                  <f.Icon className="h-5 w-5" />
                </div>
                <CardTitle>{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">准备好开始你的 IELTS 之旅了吗？</h2>
          <p className="mt-3 text-lg text-slate-400">注册即享免费体验，零成本验证学习效果。</p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" className="h-12 px-10 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl">
                立即注册 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}