"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Loader2, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WritingTimer } from "@/components/writing/WritingTimer";

interface Task { id: string; taskType: string; prompt: string; bandScore: number; sampleAnswer: string; }
interface Result { words: number; chars: number; sentences: number; avgSentence: number; band: number; feedback: string[]; suggestions: string[]; }

export default function PracticePage() {
  const params = useParams();
  const taskId = params.taskId as string;
  const [task, setTask] = useState<Task | null>(null);
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/writing/tasks");
        const tasks: Task[] = await res.json();
        setTask(tasks.find((t: Task) => t.id === taskId) || null);
      } catch {} finally { setLoading(false); }
    }
    load();
  }, [taskId]);

  async function handleSubmit() {
    if (!task || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/writing/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay, prompt: task.prompt }),
      });
      setResult(await res.json());
    } catch {} finally { setSubmitting(false); }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!task) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">未找到</p></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/writing" className="flex items-center gap-1.5 text-sm text-slate-500"><ArrowLeft className="h-4 w-4" /> 写作中心</Link>
        <WritingTimer minutes={task.taskType === "task1" ? 20 : 40} />
      </div></div>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Card className="mb-4"><CardContent className="pt-6"><p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{task.prompt}</p></CardContent></Card>
        <textarea value={essay} onChange={e => setEssay(e.target.value)} disabled={!!result}
          className="w-full h-72 p-4 rounded-lg border border-slate-200 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder={task.taskType === "task1" ? "在此撰写你的图表描述..." : "在此撰写你的议论文..."} />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>{essay.trim().split(/\s+/).filter(Boolean).length} 词</span>
          <span>目标: {task.taskType === "task1" ? "150" : "250"} 词</span>
        </div>
        <div className="mt-4 flex justify-center gap-3">
          {!result ? (
            <Button onClick={handleSubmit} disabled={essay.trim().length < 50 || submitting} size="lg">
              {submitting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Send className="mr-1 h-4 w-4" />}
              提交评分
            </Button>
          ) : (
            <div className="w-full max-w-2xl space-y-4">
              <Card className="border-green-200"><CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /><span className="font-semibold">AI 评分报告</span></div>
                  <span className="text-3xl font-bold text-primary">{result.band}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4 text-center text-sm">
                  <div className="rounded-lg bg-slate-50 p-2"><p className="text-lg font-bold">{result.words}</p><p className="text-xs text-slate-500">词数</p></div>
                  <div className="rounded-lg bg-slate-50 p-2"><p className="text-lg font-bold">{result.sentences}</p><p className="text-xs text-slate-500">句子</p></div>
                  <div className="rounded-lg bg-slate-50 p-2"><p className="text-lg font-bold">{result.avgSentence}</p><p className="text-xs text-slate-500">平均句长</p></div>
                </div>
                <div className="space-y-2">{result.feedback.map((f,i) => <div key={i} className={"flex items-start gap-2 text-sm " + (i===0 ? "text-green-600" : "text-slate-600")}>
                  {i===0 ? <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" /> : <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />}{f}</div>)}</div>
              </CardContent></Card>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setShowSample(!showSample)}>查看范文</Button>
                <Link href={"/writing"}><Button variant="outline">返回</Button></Link>
              </div>
              {showSample && <Card><CardHeader><CardTitle className="text-sm">范文</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{task.sampleAnswer}</p></CardContent></Card>}
            </div>
          )}
        </div>
      </main>
    </div>);
}
