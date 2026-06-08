import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "听力 Listening", desc: "Section 1-4 分类训练 · 倍速精听 · 计时模考", icon: "🎧" },
  { title: "阅读 Reading", desc: "平行阅读法 · 长难句解析 · 题型专项突破", icon: "📖" },
  { title: "写作 Writing", desc: "Task 1/2 AI 批改 · 范文库 · 语法纠错", icon: "✍️" },
  { title: "口语 Speaking", desc: "当季题库 · AI 发音评估 · 模型跟读", icon: "🎤" },
  { title: "词汇 Vocabulary", desc: "话题分类 · 间隔复习 · 词量成长曲线", icon: "📝" },
  { title: "模考 Mock Test", desc: "全科限时模考 · 自动算分 · 成绩报告", icon: "📋" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">IELTS Online</Link>
          <div className="flex items-center gap-4">
            <Link href="/login"><Button variant="ghost">登录</Button></Link>
            <Link href="/register"><Button>免费注册</Button></Link>
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">科学备考，高效提分</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            基于认知科学的 IELTS 在线学习平台。间隔复习 × 主动回忆 × AI 批改，让你的每一分钟备考都用在刀刃上。
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/register"><Button size="lg">免费开始</Button></Link>
            <Link href="/login"><Button variant="outline" size="lg">已有账号</Button></Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader>
                <CardTitle className="text-lg"><span className="mr-2">{f.icon}</span>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}