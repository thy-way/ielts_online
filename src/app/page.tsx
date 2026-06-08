import Link from "next/link";
import { Headphones, BookOpen, PenTool, Mic, Library, FileText, ArrowRight, CheckCircle2, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const features = [
  { title: "听力 Listening", desc: "Section 1-4 分类训练 · 倍速精听 · 计时模考", Icon: Headphones },
  { title: "阅读 Reading", desc: "平行阅读法 · 长难句解析 · 题型专项突破", Icon: BookOpen },
  { title: "写作 Writing", desc: "Task 1/2 AI 批改 · 范文库 · 语法纠错", Icon: PenTool },
  { title: "口语 Speaking", desc: "当季题库 · AI 发音评估 · 模型跟读", Icon: Mic },
  { title: "词汇 Vocabulary", desc: "话题分类 · 间隔复习 · 词量成长曲线", Icon: Library },
  { title: "模考 Mock Test", desc: "全科限时模考 · 自动算分 · 成绩报告", Icon: FileText },
];

const stats = [
  { value: "5", label: "学习阶段", description: "词性 → 词根 → 句式 → 语法 → 话题" },
  { value: "SM-2", label: "间隔算法", description: "科学记忆曲线，复习时机自动排期" },
  { value: "10+", label: "IELTS 话题", description: "覆盖教育/环境/科技/社会等高频话题" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-slate-50 px-4 py-1.5 text-sm text-slate-600">
              <Award className="h-4 w-4" /> 基于认知科学与语言习得理论
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              科学备考 <span className="text-primary">高效提分</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-500 sm:text-xl">
              间隔复习 × 主动回忆 × AI 批改，让你的每一分钟备考都用在刀刃上。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register"><Button size="lg" className="h-12 px-8 text-base">免费开始学习</Button></Link>
              <Link href="/vocabulary"><Button variant="outline" size="lg" className="h-12 px-8 text-base">浏览学习内容 <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> 无需信用卡</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 已服务 10,000+ 考生</span>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm font-semibold text-slate-700">{s.label}</div>
                <div className="mt-1 text-sm text-slate-500">{s.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">六大学习模块</h2>
          <p className="mt-3 text-slate-500">覆盖 IELTS 全科，从输入到输出一站式训练</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors">
                  <f.Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="border-t bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">准备好开始你的 IELTS 之旅了吗？</h2>
          <p className="mt-3 text-slate-400">注册即享免费体验，零成本验证学习效果。</p>
          <div className="mt-8">
            <Link href="/register"><Button size="lg" className="h-12 px-8 bg-white text-slate-900 hover:bg-slate-100">立即注册</Button></Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}