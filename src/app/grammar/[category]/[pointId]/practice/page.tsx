"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Exercise {
  id: string; questionText: string; options: string; type: string;
}

export default function PracticePage() {
  const params = useParams();
  const category = params.category as string;
  const pointId = params.pointId as string;

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ isCorrect: boolean; correctAnswer: string; explanation: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/grammar/exercises?limit=8");
        const data = await res.json();
        setExercises(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit() {
    if (!selected || !exercises[index]) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/grammar/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: exercises[index].id, userAnswer: selected }),
      });
      const data = await res.json();
      setResult(data);
      setScore((s) => ({ correct: s.correct + (data.isCorrect ? 1 : 0), total: s.total + 1 }));
    } finally {
      setSubmitting(false);
    }
  }

  function handleNext() {
    setSelected(null);
    setResult(null);
    setIndex(index + 1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (index >= exercises.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">练习完成！</h2>
            <p className="mt-2 text-slate-500">正确 {score.correct}/{score.total}</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href={"/grammar/" + category + "/" + pointId}><Button variant="outline">返回知识点</Button></Link>
              <Link href="/dashboard"><Button>回到仪表盘</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const ex = exercises[index];
  const options: string[] = ex?.options ? JSON.parse(ex.options) : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-6">
        <Link href={"/grammar/" + category + "/" + pointId} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" /> 返回知识点
        </Link>

        <div className="mt-6 mb-4">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>第 {index + 1} 题 / 共 {exercises.length} 题</span>
            <span>正确 {score.correct}/{score.total}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: ((index + 1) / exercises.length * 100) + "%" }} />
          </div>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge>选择题</Badge>
            </div>
            <CardTitle className="text-lg font-medium mt-2">{ex?.questionText}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {options.map((opt) => {
                const isSelected = selected === opt;
                const isCorrectOpt = result && result.correctAnswer === opt;
                const isWrongOpt = result && isSelected && !result.isCorrect;
                return (
                  <button key={opt} disabled={!!result} onClick={() => setSelected(opt)}
                    className={"w-full text-left p-3 rounded-lg border text-sm transition-all " + (
                      isCorrectOpt ? "border-green-500 bg-green-50 text-green-700" :
                      isWrongOpt ? "border-red-500 bg-red-50 text-red-700" :
                      isSelected ? "border-primary bg-primary/5" :
                      "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isCorrectOpt && <Check className="h-4 w-4 text-green-600" />}
                      {isWrongOpt && <X className="h-4 w-4 text-red-600" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>

            {result && (
              <div className={"mt-4 p-3 rounded-lg text-sm " + (result.isCorrect ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>
                <p className="font-medium">{result.isCorrect ? "回答正确！" : "回答错误"}</p>
                <p className="mt-1 text-xs">{result.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-3">
          {!result ? (
            <Button onClick={handleSubmit} disabled={!selected || submitting} size="lg">
              {submitting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
              提交答案
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              {index + 1 < exercises.length ? "下一题" : "查看结果"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
