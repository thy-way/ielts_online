import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ category: string }>;
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

export default async function GrammarCategoryPage({ params }: Props) {
  const { category } = await params;

  const cat = await prisma.grammarCategory.findUnique({
    where: { name: category },
  });

  if (!cat) notFound();

  const points = await prisma.grammarPoint.findMany({
    where: { categoryId: cat.id },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/grammar" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" /> 语法列表
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{cat.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{cat.nameCn}</h1>
              <p className="text-sm text-slate-500">{cat.description}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">{points.length} 个知识点</p>
        </div>

        <div className="space-y-3">
          {points.map((point) => (
            <Link key={point.id} href={`/grammar/${category}/${point.name}`}>
              <Card className="group hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">{point.nameCn}</CardTitle>
                    </div>
                    <Badge className={levelColors[point.level] ?? ""}>
                      {levelLabels[point.level] ?? point.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {point.explanation.slice(0, 120)}...
                  </p>
                  {point.ieltsUsage && (
                    <div className="mt-2">
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                        IELTS: {point.ieltsUsage}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
          {points.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              暂无知识点
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
