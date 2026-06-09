import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Headphones, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props { params: Promise<{ section: string }> }

const sectionNames = ["", "日常对话", "日常独白", "学术对话", "学术演讲"];
const diffColors: Record<string, string> = { easy: "bg-green-100 text-green-700", medium: "bg-amber-100 text-amber-700", hard: "bg-red-100 text-red-700" };

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const sn = parseInt(section, 10);
  if (isNaN(sn) || sn < 1 || sn > 4) notFound();

  const passages = await prisma.listeningPassage.findMany({
    where: { section: sn },
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { questions: true } } },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/listening" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" /> 日常对话
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-center gap-3">
          <Headphones className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Section {sn}: {sectionNames[sn]}</h1>
        </div>
        <div className="space-y-3">
          {passages.map((p) => (
            <Link key={p.id} href={"/listening/practice/" + p.id}>
              <Card className="group cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={diffColors[p.difficulty] || ""}>{p.difficulty}</Badge>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{p._count.questions} ?</p>
                </CardHeader>
              </Card>
            </Link>
          ))}
          {passages.length === 0 && (
            <div className="py-16 text-center text-slate-400">日常对话??</div>
          )}
        </div>
      </main>
    </div>
  );
}
