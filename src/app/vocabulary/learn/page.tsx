"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Word {
  id: string; word: string; phonetic: string; partOfSpeech: string;
  definition: string; exampleSentence?: string; synonyms?: string; level: string;
}

const mockWords: Word[] = [
  { id: "1", word: "analyze", phonetic: "/ˈænəlaɪz/", partOfSpeech: "verb", definition: "to examine something in detail", exampleSentence: "The data was analyzed using statistical methods.", synonyms: "examine, study, inspect", level: "core" },
  { id: "2", word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", partOfSpeech: "adjective", definition: "important or large enough to be noticed", exampleSentence: "There was a significant increase in sales.", synonyms: "notable, considerable, substantial", level: "core" },
  { id: "3", word: "consequence", phonetic: "/ˈkɒnsɪkwəns/", partOfSpeech: "noun", definition: "a result or effect of an action", exampleSentence: "Climate change has serious consequences.", synonyms: "result, outcome, effect", level: "core" },
  { id: "4", word: "predominantly", phonetic: "/prɪˈdɒmɪnəntli/", partOfSpeech: "adverb", definition: "mainly; for the most part", exampleSentence: "The population is predominantly urban.", synonyms: "mainly, mostly, primarily", level: "advanced" },
  { id: "5", word: "contribute", phonetic: "/kənˈtrɪbjuːt/", partOfSpeech: "verb", definition: "to give or be part of the cause of something", exampleSentence: "Several factors contribute to the problem.", synonyms: "add, provide, donate", level: "core" },
];

export default function LearnPage() {
  const [words] = useState<Word[]>(mockWords);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, remembered: 0 });

  const word = words[index] || null;
  const progress = ((index + (rated ? 1 : 0)) / words.length) * 100;

  function handleRate(quality: number) {
    setRated(true);
    const newStats = { ...stats, reviewed: stats.reviewed + 1 };
    if (quality >= 4) newStats.remembered += 1;
    setStats(newStats);
  }

  function handleNext() {
    setRated(false);
    setFlipped(false);
    if (index + 1 < words.length) { setIndex(index + 1); } else { setDone(true); }
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
          <Card
            className="min-h-[340px] cursor-pointer transition-all duration-500"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            onClick={() => !rated && setFlipped(!flipped)}
          >
            <CardContent className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center"
              style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
            >
              {!flipped ? (
                <>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold tracking-tight">{word?.word}</h2>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors" title="播放发音">
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-slate-400">{word?.phonetic}</p>
                  <p className="mt-8 text-sm text-slate-400">点击翻转查看释义</p>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    <Badge variant="secondary">{word?.partOfSpeech}</Badge>
                    <Badge variant="outline">{word?.level}</Badge>
                  </div>
                  <p className="mt-3 text-lg font-medium">{word?.definition}</p>
                  {word?.exampleSentence && (
                    <p className="mt-4 text-sm text-slate-500 italic">&ldquo;{word.exampleSentence}&rdquo;</p>
                  )}
                  {word?.synonyms && (
                    <p className="mt-3 text-xs text-slate-400">近义: {word.synonyms}</p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {flipped && !rated && (
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="destructive" size="lg" onClick={() => handleRate(1)} className="flex-1">不认识</Button>
              <Button variant="secondary" size="lg" onClick={() => handleRate(3)} className="flex-1">模糊</Button>
              <Button size="lg" onClick={() => handleRate(5)} className="flex-1 bg-green-600 hover:bg-green-700">认识</Button>
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