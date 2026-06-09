import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lightbulb, AlertTriangle, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ category: string; pointId: string }>;
}

const levelColors: Record<string, string> = {
  foundation: "bg-slate-100 text-slate-600",
  core: "bg-primary/10 text-primary",
  advanced: "bg-amber-50 text-amber-700",
};

const levelLabels: Record<string, string> = {
  foundation: "基础",
  core: "核心",
  advanced: "进阶",
};

export default async function GrammarPointPage({ params }: Props) {
  const { category, pointId } = await params;

  const cat = await prisma.grammarCategory.findUnique({
    where: { name: category },
  });
  if (!cat) notFound();

  const point = await prisma.grammarPoint.findFirst({
    where: { categoryId: cat.id, name: pointId },
  });
  if (!point) notFound();

  let examples: { sentence: string; analysis: string }[] = [];
  let commonErrors: { error: string; correction: string; note: string }[] = [];

  try {
    if (point.examples) examples = JSON.parse(point.examples);
  } catch {}
  try {
    if (point.commonErrors) commonErrors = JSON.parse(point.commonErrors);
  } catch {}

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href={`/grammar/${category}`} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {cat.nameCn}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">{point.nameCn}</h1>
            <Badge className={levelColors[point.level] ?? ""}>
              {levelLabels[point.level] ?? point.level}
            </Badge>
          </div>
          {point.ieltsUsage && (
            <div className="flex items-center gap-1.5 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg w-fit">
              <Target className="h-4 w-4" />
              IELTS 应用: {point.ieltsUsage}
            </div>
          )}
        </div>

        {/* Explanation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              讲解
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
              {point.explanation}
            </div>
          </CardContent>
        </Card>

        {/* Examples */}
        {examples.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">E</span>
                例句
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {examples.map((ex, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-sm font-medium text-slate-800 italic">
                    &ldquo;{ex.sentence}&rdquo;
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{ex.analysis}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Common Errors */}
        {commonErrors.length > 0 && (
          <Card className="mb-6 border-rose-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-rose-600">
                <AlertTriangle className="h-5 w-5" />
                常见错误
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {commonErrors.map((err, i) => (
                <div key={i} className="rounded-lg border border-rose-200 bg-rose-50/50 p-4">
                  <p className="text-sm">
                    <span className="font-medium text-rose-600">错误: </span>
                    <span className="line-through text-rose-500">{err.error}</span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium text-green-600">纠正: </span>
                    <span className="text-green-700">{err.correction}</span>
                  </p>
                  {err.note && (
                    <p className="mt-1 text-xs text-slate-500">{err.note}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Practice */}
        <Card className="border-primary/20 mt-8">
          <CardContent className="flex flex-col items-center py-8 text-center">
            <Target className="h-8 w-8 text-primary mb-3" />
            <h3 className="text-lg font-semibold">诊断练习</h3>
            <p className="mt-1 text-sm text-slate-500">做完练习即时判分，巩固所学知识</p>
            <Link href={"/grammar/" + category + "/" + pointId + "/practice"} className="mt-4">
              <Button>开始练习</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-3">
          <Link href={"/grammar/" + category}>
            <Button variant="outline">返回 {cat.nameCn}</Button>
          </Link>
          <Link href="/dashboard">
            <Button>回到仪表盘</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
