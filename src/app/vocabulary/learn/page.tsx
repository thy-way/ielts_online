"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, Check, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Word {
  id: string; word: string; phonetic: string; partOfSpeech: string;
  definition: string; definitionCn?: string; exampleSentence?: string;
  synonyms?: string; level: string; topic: string;
}

export default function LearnPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, remembered: 0 });

  useEffect(() => {
    async function loadWords() {
      try {
        // Try review words first, then fall back to general words
        let res = await fetch("/api/vocabulary/words?review=true&limit=10");
        if (!res.ok) throw new Error("Failed to fetch");
        let data = await res.json();
        if (!data.length) {
          res = await fetch("/api/vocabulary/words?limit=10");
          data = await res.json();
        }
        setWords(data);
      } catch (e) {
        setError("加载词汇失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    }
    loadWords();
  }, []);

  const handleRate = useCallback(async (quality: number) => {
    if (!words[index]) return;
    setSubmitting(true);
    try {
      await fetch("/api/vocabulary/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wordId: words[index].id, quality }),
      });
      setRated(true);
      const newStats = { reviewed: stats.reviewed + 1, remembered: stats.remembered + (quality >= 4 ? 1 : 0) };
      setStats(newStats);
    } catch {
      // Fallback: still advance even if API fails
      setRated(true);
      setStats((s) => ({ reviewed: s.reviewed + 1, remembered: s.remembered }));
    } finally {
      setSubmitting(false);
    }
  }, [words, index, stats]);

  function handleNext() {
    setRated(false);
    setFlipped(false);
    if (index + 1 < words.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  }

  function speakWord(text: string) {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-3 text-sm text-slate-500">加载词汇中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10">
            <p className="text-slate-500">{error}</p>
            <div className="mt-6">
              <Link href="/vocabulary">
                <Button variant="outline">返回词汇中心</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">暂无待复习词汇</h2>
            <p className="mt-2 text-sm text-slate-500">先去词汇中心学习新词吧</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/vocabulary"><Button variant="outline">返回词汇中心</Button></Link>
              <Link href="/dashboard"><Button>回到仪表盘</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">复习完成！</h2>
            <p className="mt-2 text-slate-500">已复习 {stats.reviewed} 个，掌握 {stats.remembered} 个</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/vocabulary"><Button variant="outline">返回词汇中心</Button></Link>
              <Link href="/dashboard"><Button>回到仪表盘</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const word = words[index];
  const progress = ((index + (rated ? 1 : 0)) / words.length) * 100;
  const posColors: Record<string, string> = {
    noun: "bg-blue-100 text-blue-700",
    verb: "bg-green-100 text-green-700",
    adjective: "bg-orange-100 text-orange-700",
    adverb: "bg-purple-100 text-purple-700",
  };
  const levelLabels: Record<string, string> = {
    foundation: "基础",
    core: "核心",
    advanced: "进阶",
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top bar */}
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <Link href="/vocabulary" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> 返回词汇中心
        </Link>
      </div>

      {/* Progress */}
      <div className="mx-auto w-full max-w-md px-4 mb-4">
        <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
          <span>{index + 1} / {words.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="w-full max-w-md">
          <div
            className="relative cursor-pointer"
            onClick={() => !rated && setFlipped(!flipped)}
          >
            <Card className="min-h-[340px] transition-all duration-500" style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
              <CardContent className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center"
                style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
              >
                {!flipped ? (
                  <>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <h2 className="text-3xl font-bold tracking-tight">{word?.word}</h2>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        onClick={(e) => { e.stopPropagation(); speakWord(word?.word ?? ""); }}
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    {word?.phonetic && <p className="text-slate-400">{word.phonetic}</p>}
                    <p className="mt-8 text-sm text-slate-400">点击翻转查看释义</p>
                    <div className="mt-3 flex gap-1.5">
                      <Badge className={posColors[word?.partOfSpeech ?? ""] ?? "bg-slate-100 text-slate-600"}>
                        {word?.partOfSpeech}
                      </Badge>
                      <Badge variant="outline">{levelLabels[word?.level ?? ""] ?? word?.level}</Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      <Badge className={posColors[word?.partOfSpeech ?? ""] ?? "bg-slate-100 text-slate-600"}>
                        {word?.partOfSpeech}
                      </Badge>
                      <Badge variant="outline">{levelLabels[word?.level ?? ""] ?? word?.level}</Badge>
                    </div>
                    <p className="mt-3 text-lg font-medium">{word?.definition}</p>
                    {word?.definitionCn && (
                      <p className="mt-1 text-sm text-slate-400">{word.definitionCn}</p>
                    )}
                    {word?.exampleSentence && (
                      <p className="mt-4 text-sm text-slate-500 italic">&ldquo;{word.exampleSentence}&rdquo;</p>
                    )}
                    {word?.synonyms && (
                      <p className="mt-3 text-xs text-slate-400">近义: {word.synonyms}</p>
                    )}
                    {word?.topic && word.topic !== "general" && (
                      <p className="mt-2 text-xs text-slate-400">话题: {word.topic}</p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {flipped && !rated && (
            <div className="mt-6 flex justify-center gap-3">
              <Button
                variant="destructive"
                size="lg"
                onClick={() => handleRate(1)}
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : null}
                不认识
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleRate(3)}
                className="flex-1"
                disabled={submitting}
              >
                模糊
              </Button>
              <Button
                size="lg"
                onClick={() => handleRate(5)}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={submitting}
              >
                认识
              </Button>
            </div>
          )}

          {rated && (
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { setFlipped(false); setRated(false); }}>
                <RotateCcw className="mr-1 h-4 w-4" /> 再看一次
              </Button>
              <Button size="lg" onClick={handleNext}>
                {index + 1 < words.length ? "下一个" : "完成"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
