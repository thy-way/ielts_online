import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stages = [
  {
    stage: 1, title: "词性基础", eng: "Parts of Speech",
    desc: "名/动/形/副/介/连/代/冠 — 句子的基本积木",
    topics: [
      { label: "名词 Noun", href: "/vocabulary/topics/parts-of-speech?filter=noun" },
      { label: "动词 Verb", href: "/vocabulary/topics/parts-of-speech?filter=verb" },
      { label: "形容词 Adjective", href: "/vocabulary/topics/parts-of-speech?filter=adjective" },
      { label: "全部词性", href: "/vocabulary/topics/parts-of-speech" },
    ],
  },
  {
    stage: 2, title: "词的构成", eng: "Word Formation",
    desc: "词根/前缀/后缀 — 一个词根派生整个词族",
    topics: [
      { label: "常见前缀", href: "/vocabulary/topics/word-formation?type=prefix" },
      { label: "常见后缀", href: "/vocabulary/topics/word-formation?type=suffix" },
      { label: "核心词根", href: "/vocabulary/topics/word-formation?type=root" },
    ],
  },
  {
    stage: 3, title: "句式组织", eng: "Sentence Patterns",
    desc: "5 种基本句型 → 并列句 → 复合句 → IELTS 写作句式",
    topics: [
      { label: "五种基本句型", href: "/grammar/basic-sentences" },
      { label: "句子扩展", href: "/grammar/sentence-expansion" },
      { label: "IELTS 写作句式", href: "/grammar/ielts-patterns" },
    ],
  },
  {
    stage: 4, title: "语法融合", eng: "Grammar Integration",
    desc: "时态/被动/从句/条件句/虚拟语气 — 服务写作口语",
    topics: [
      { label: "时态系统", href: "/grammar/tenses" },
      { label: "被动语态", href: "/grammar/passive-voice" },
      { label: "三大从句", href: "/grammar/clauses" },
      { label: "全部语法", href: "/grammar" },
    ],
  },
  {
    stage: 5, title: "话题词汇", eng: "Topic Vocabulary",
    desc: "10 大 IELTS 话题 × 核心词汇 + 搭配 + 范文例句",
    topics: [
      { label: "教育 Education", href: "/vocabulary/topics/education" },
      { label: "环境 Environment", href: "/vocabulary/topics/environment" },
      { label: "科技 Technology", href: "/vocabulary/topics/technology" },
      { label: "全部话题", href: "/vocabulary/topics" },
    ],
  },
];

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link>
          <div className="flex items-center gap-4">
            <Link href="/vocabulary/learn"><Button>开始复习</Button></Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">词汇学习系统</h1>
          <p className="mt-2 text-slate-500">理解 → 积累 → 运用，五阶段逐级搭建词汇能力</p>
        </div>

        {/* Learning Pyramid */}
        <div className="space-y-8">
          {stages.map((s) => (
            <Card key={s.stage}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                    {s.stage}
                  </span>
                  <div>
                    <CardTitle className="text-lg">{s.title} <span className="font-normal text-slate-400">— {s.eng}</span></CardTitle>
                    <CardDescription className="mt-1">{s.desc}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {s.topics.map((t) => (
                    <Link key={t.label} href={t.href}>
                      <Button variant="outline" size="sm">{t.label}</Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}