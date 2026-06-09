import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Headphones, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sectionInfo = [
  { section: 1, label: "????", desc: "Section 1 ? ?????????/???", color: "bg-blue-50 border-blue-200", icon: "??" },
  { section: 2, label: "????", desc: "Section 2 ? ?????????/??/???", color: "bg-green-50 border-green-200", icon: "??" },
  { section: 3, label: "????", desc: "Section 3 ? ?????????/??/???", color: "bg-amber-50 border-amber-200", icon: "??" },
  { section: 4, label: "????", desc: "Section 4 ? ?????????/???", color: "bg-purple-50 border-purple-200", icon: "??" },
];

export default async function ListeningPage() {
  const passages = await prisma.listeningPassage.findMany({
    select: { section: true, difficulty: true, _count: { select: { questions: true } } },
    orderBy: { sortOrder: "asc" },
  });

  const sectionCounts = [0,0,0,0]; const sectionQCounts = [0,0,0,0];
  for (const p of passages) {
    sectionCounts[p.section-1]++;
    sectionQCounts[p.section-1] += p._count.questions;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Headphones className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">????</h1>
          </div>
          <p className="mt-2 text-slate-500">? IELTS Listening Sections 1-4 ?????????????</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {sectionInfo.map((s, i) => (
            <Link key={s.section} href={"/listening/section/" + s.section}>
              <Card className={"group cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 border-2 " + s.color}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="mt-2">{s.label}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 text-sm text-slate-500">
                    <span>{sectionCounts[i]} passages</span>
                    <span>{sectionQCounts[i]} questions</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-lg border bg-white p-6">
          <h2 className="font-semibold mb-4">IELTS ??????</h2>
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            <div className="flex items-start gap-2"><Badge className="shrink-0 mt-0.5">??</Badge><span className="text-slate-600">????/??/??????</span></div>
            <div className="flex items-start gap-2"><Badge className="shrink-0 mt-0.5">??</Badge><span className="text-slate-600">????????????</span></div>
            <div className="flex items-start gap-2"><Badge className="shrink-0 mt-0.5">??</Badge><span className="text-slate-600">????????????</span></div>
            <div className="flex items-start gap-2"><Badge className="shrink-0 mt-0.5">??</Badge><span className="text-slate-600">??????????</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}
