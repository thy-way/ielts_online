"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Target, Clock, BarChart3, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface MockResult { id: string; scores: { listening: number; reading: number; writing: number; speaking: number; average: number; }; completedAt: string; }
export default function MockTestPage() {
  const [results, setResults] = useState<MockResult[]>([]); const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState({ listening: 0, reading: 0, writing: 0, speaking: 0 });
  useEffect(() => {
    fetch("/api/mock-test").then(r => r.json()).then(d => setResults(Array.isArray(d) ? d : [])).catch(() => {}).finally(() => setLoading(false));
  }, []);
  async function handleSubmit() {
    const res = await fetch("/api/mock-test", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(scores) });
    const data = await res.json();
    if (data.id) { setResults([{ id: data.id, scores: data.scores, completedAt: new Date().toISOString() }, ...results]); }
  }
  return (<div className="min-h-screen bg-slate-50"><header className="border-b bg-white"><div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
    <Link href="/dashboard" className="text-xl font-bold tracking-tight">IELTS Online</Link></div></header>
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center gap-3"><Target className="h-8 w-8 text-primary" /><h1 className="text-3xl font-bold">模拟考试</h1></div>
      <p className="mb-8 text-slate-500">输入各科预估分数，生成完整模考报告</p>
      <Card className="mb-8"><CardHeader><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" />成绩录入</CardTitle></CardHeader>
        <CardContent><div className="grid gap-4 sm:grid-cols-4 mb-4">
          {(["listening","reading","writing","speaking"] as const).map(function(section) {
            return <div key={section}><label className="text-xs font-medium text-slate-500 mb-1 block capitalize">{section}</label>
              <input type="number" min={0} max={9} step={0.5} value={scores[section]}
                onChange={function(e) { const v = parseFloat(e.target.value) || 0; setScores(function(prev) { return { ...prev, [section]: v }; }); }}
                className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>;
          })}
        </div>
        <div className="flex justify-center"><Button onClick={handleSubmit}>提交成绩</Button></div></CardContent></Card>
      <h2 className="text-lg font-semibold mb-4">历史成绩</h2>
      {loading ? <div className="flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div> :
      results.length === 0 ? <p className="text-center text-slate-400 py-8">暂无模考记录</p> :
      <div className="space-y-3">{results.map(r => <Card key={r.id}><CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3"><span className="text-sm text-slate-500">{new Date(r.completedAt).toLocaleDateString()}</span>
          <Badge className="text-base px-3 py-1">Overall {r.scores.average}</Badge></div>
        <div className="grid grid-cols-4 gap-2 text-center text-sm">{["listening","reading","writing","speaking"].map(s => <div key={s} className="rounded bg-slate-50 p-2">
          <p className="text-xs text-slate-400 capitalize">{s}</p><p className="font-bold">{r.scores[s as keyof typeof r.scores]}</p></div>)}</div>
      </CardContent></Card>)}</div>}
    </main></div>);
}
