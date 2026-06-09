"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioPlayer } from "@/components/listening/AudioPlayer";

interface Question {
  id: string; questionText: string; options: string; explanation: string;
}

interface Passage {
  id: string; title: string; transcript: string; difficulty: string; section: number;
  questions: Question[];
}

interface Result {
  isCorrect: boolean; correctAnswer: string; explanation: string;
}

export default function PracticePage() {
  const params = useParams();
  const passageId = params.passageId as string;

  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, Result>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/listening/practice?passageId=" + passageId);
        const data = await res.json();
        setPassage(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    load();
  }, [passageId]);

  async function handleSubmit() {
    if (!passage || submitting) return;
    setSubmitting(true);
    let correct = 0;
    const newResults: Record<string, Result> = {};

    for (const q of passage.questions) {
      const userAnswer = answers[q.id];
      if (!userAnswer) { newResults[q.id] = { isCorrect: false, correctAnswer: "", explanation: "" }; continue; }
      try {
        const res = await fetch("/api/listening/practice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionId: q.id, userAnswer }),
        });
        const data = await res.json();
        newResults[q.id] = data;
        if (data.isCorrect) correct++;
      } catch { newResults[q.id] = { isCorrect: false, correctAnswer: "", explanation: "" }; }
    }

    setResults(newResults);
    setScore(correct);
    setSubmitted(true);
    setSubmitting(false);
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!passage) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">日常对话???</p></div>;

  const total = passage.questions.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href={"/listening/section/" + passage.section} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
            <ArrowLeft className="h-4 w-4" /> ?? Section {passage.section}
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold">{passage.title}</h1>
            <Badge>{passage.difficulty}</Badge>
          </div>
          <p className="text-xs text-slate-400">日常对话日常对话日常对话日常对话???</p>
        </div>

        <AudioPlayer transcript={passage.transcript} />

        <div className="mt-6 space-y-4">
          {passage.questions.map((q, i) => {
            let opts: string[] = [];
            try { opts = JSON.parse(q.options); } catch {}
            const result = results[q.id];

            return (
              <Card key={q.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    <span className="text-primary font-bold mr-2">Q{i+1}.</span>
                    {q.questionText}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {opts.map((opt) => {
                      const isSelected = answers[q.id] === opt;
                      const isCorrectOpt = result && result.correctAnswer === opt;
                      const isWrongOpt = result && isSelected && !result.isCorrect;
                      return (
                        <button key={opt} disabled={submitted} onClick={() => setAnswers({...answers, [q.id]: opt})}
                          className={"w-full text-left p-2.5 rounded-lg border text-sm transition-all " + (
                            isCorrectOpt ? "border-green-500 bg-green-50 text-green-700" :
                            isWrongOpt ? "border-red-500 bg-red-50 text-red-700" :
                            isSelected ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {isCorrectOpt && <Check className="h-3.5 w-3.5 text-green-600" />}
                            {isWrongOpt && <X className="h-3.5 w-3.5 text-red-600" />}
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                    {result && (
                      <div className={"mt-2 p-2.5 rounded-lg text-xs " + (result.isCorrect ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700")}>
                        {result.isCorrect ? "? ??" : "? ??"}
                        {!result.isCorrect && result.correctAnswer && <span> 日常对话: {result.correctAnswer}</span>}
                        {result.explanation && <p className="mt-1">{result.explanation}</p>}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          {!submitted ? (
            <Button onClick={handleSubmit} disabled={Object.keys(answers).length === 0 || submitting} size="lg">
              {submitting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
              日常对话
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold">??: {score}/{total}</p>
              <div className="mt-3 flex gap-3 justify-center">
                <Link href={"/listening/section/" + passage.section}><Button variant="outline">??</Button></Link>
                <Link href={"/listening/practice/" + passageId}><Button>??</Button></Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
