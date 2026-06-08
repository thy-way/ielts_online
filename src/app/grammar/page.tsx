import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "tenses", nameCn: "时态系统", icon: "⏱️",
    desc: "一般现在/过去/将来、完成时、进行时 — IELTS Task 1 趋势描述核心",
    points: [
      { label: "一般现在时", href: "/grammar/tenses/present-simple" },
      { label: "一般过去时", href: "/grammar/tenses/past-simple" },
      { label: "现在完成时", href: "/grammar/tenses/present-perfect" },
      { label: "过去完成时", href: "/grammar/tenses/past-perfect" },
      { label: "进行时态", href: "/grammar/tenses/continuous" },
      { label: "将来时态", href: "/grammar/tenses/future" },
    ],
  },
  {
    name: "passive-voice", nameCn: "被动语态", icon: "🔄",
    desc: "be + done 结构 — Task 1 流程图/地图描述必备",
    points: [
      { label: "被动语态基础", href: "/grammar/passive-voice/basics" },
      { label: "被动语态时态变化", href: "/grammar/passive-voice/tenses" },
      { label: "Task 1 被动语态应用", href: "/grammar/passive-voice/ielts-task1" },
    ],
  },
  {
    name: "clauses", nameCn: "三大从句", icon: "🔗",
    desc: "名词性从句 / 定语从句 / 状语从句 — Task 2 逻辑展开核心",
    points: [
      { label: "定语从句", href: "/grammar/clauses/relative" },
      { label: "状语从句 (时间/原因/让步)", href: "/grammar/clauses/adverbial" },
      { label: "名词性从句", href: "/grammar/clauses/noun" },
    ],
  },
  {
    name: "conditionals", nameCn: "条件句", icon: "🔀",
    desc: "零/一/二/三条件句 — Task 2 假设论证与推测",
    points: [
      { label: "第一条件句", href: "/grammar/conditionals/first" },
      { label: "第二条件句", href: "/grammar/conditionals/second" },
      { label: "第三条件句", href: "/grammar/conditionals/third" },
      { label: "混合条件句", href: "/grammar/conditionals/mixed" },
    ],
  },
  {
    name: "subjunctive", nameCn: "虚拟语气", icon: "💭",
    desc: "wish / if only / would rather — 表达愿望和假设",
    points: [
      { label: "wish 用法", href: "/grammar/subjunctive/wish" },
      { label: "if only / would rather", href: "/grammar/subjunctive/alternatives" },
    ],
  },
  {
    name: "comparison", nameCn: "比较结构", icon: "📊",
    desc: "比较级/最高级/倍数表达 — Task 1 数据对比必备",
    points: [
      { label: "比较级与最高级", href: "/grammar/comparison/basics" },
      { label: "倍数表达", href: "/grammar/comparison/multiples" },
      { label: "Task 1 比较句式", href: "/grammar/comparison/ielts-task1" },
    ],
  },
  {
    name: "basic-sentences", nameCn: "基本句型", icon: "📝",
    desc: "5 种基本句型 + 句子成分分析 — 写作地基",
    points: [
      { label: "五种基本句型", href: "/grammar/basic-sentences/five-patterns" },
      { label: "句子成分", href: "/grammar/basic-sentences/components" },
    ],
  },
  {
    name: "sentence-expansion", nameCn: "句子扩展", icon: "➕",
    desc: "并列句 / 复合句 / 非谓语 — 从简单到复杂",
    points: [
      { label: "并列句", href: "/grammar/sentence-expansion/compound" },
      { label: "非谓语结构", href: "/grammar/sentence-expansion/non-finite" },
    ],
  },
];

export default function GrammarPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/vocabulary" className="text-xl font-bold tracking-tight">← 词汇中心</Link>
          <Link href="/dashboard"><Button variant="ghost">仪表盘</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">语法学习</h1>
        <p className="text-slate-500 mb-8">语法不是孤立知识点，而是服务写作和口语的工具。按 IELTS 输出需求组织学习</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((c) => (
            <Card key={c.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span>{c.icon}</span> {c.nameCn}
                </CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {c.points.map((p) => (
                    <Link key={p.label} href={p.href}>
                      <Button variant="outline" size="sm">{p.label}</Button>
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