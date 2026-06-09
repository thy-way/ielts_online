"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Loader2, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReadingTimer } from "@/components/reading/ReadingTimer";

interface Q { id: string; questionText: string; options: string; }
interface P { id: string; title: string; passage: string; wordCount: number; difficulty: string; questions: Q[]; }

export default function PracticePage() {
  const params = useParams();
  const pid = params.passageId as string;
  const [passage, setPassage] = useState<P | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, { isCorrect: boolean; correctAnswer: string }>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/reading/passage/" + pid);
        setPassage(await res.json());
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, [pid]);

  async function handleSubmit() {
    if (!passage || submitting) return;
    setSubmitting(true);
    let correct = 0;
    const r: Record<string, { isCorrect: boolean; correctAnswer: string }> = {};
    for (const q of passage.questions) {
      const ans = answers[q.id];
      if (!ans) { r[q.id] = { isCorrect: false, correctAnswer: "" }; continue; }
      try {
        const res = await fetch("/api/reading/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: q.id, userAnswer: ans }),
        });
        const d = await res.json();
        r[q.id] = d;
        if (d.isCorrect) correct++;
      } catch { r[q.id] = { isCorrect: false, correctAnswer: "" }; }
    }
    setResults(r); setScore(correct); setSubmitted(true); setSubmitting(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!passage) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">未找到</p></div>;

  const total = passage.questions.length;
  const diffLabel: Record<string, string> = { easy: "基础", medium: "中等", hard: "进阶" };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/reading" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" /> 阅读中心
          </Link>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-slate-400"><FileText className="h-3 w-3" />{passage.wordCount} 词</span>
            <ReadingTimer minutes={20} />
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-4">
          <h1 className="text-xl font-bold">{passage.title}</h1>
          <Badge className="mt-1">{diffLabel[passage.difficulty] || passage.difficulty}</Badge>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2"><BookOpen className="h-4 w-4" /> 阅读文章</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {passage.passage}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            {passage.questions.map((q, i) => {
              let opts: string[] = [];
              try { opts = JSON.parse(q.options); } catch {}
              const r = results[q.id];
              return (
                <Card key={q.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      <span className="text-primary font-bold mr-2">Q{i + 1}.</span>
                      {q.questionText}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1.5">
                      {opts.map((opt) => {
                        const sel = answers[q.id] === opt;
                        const cor = r && r.correctAnswer === opt;
                        const wr = r && sel && !r.isCorrect;
                        return (
                          <button key={opt} disabled={!!submitted} onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                            className={"w-full text-left p-2.5 rounded-lg border text-sm transition-all " + (cor ? "border-green-500 bg-green-50 text-green-700" : wr ? "border-red-500 bg-red-50 text-red-700" : sel ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300")}
                          >
                            <span className="flex items-center gap-2">
                              {cor && <Check className="h-3.5 w-3.5" />}
                              {wr && <X className="h-3.5 w-3.5" />}
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                      {r && (
                        <div className={"mt-2 p-2.5 rounded-lg text-xs " + (r.isCorrect ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>
                          {r.isCorrect ? "正确" : "错误"}
                          {!r.isCorrect && r.correctAnswer && <span> 正确答案: {r.correctAnswer}</span>}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length === 0 || submitting} size="lg">
              {submitting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
              提交答案
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold">得分: {score}/{total} ({Math.round((score / total) * 100)}%)</p>
              <div className="mt-3 flex gap-3 justify-center">
                <Link href="/reading"><Button variant="outline">返回</Button></Link>
                <Link href={"/reading/passage/" + pid}><Button>重做</Button></Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
