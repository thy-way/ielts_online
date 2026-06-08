"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Word {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  exampleSentence?: string;
  synonyms?: string;
  level: string;
}

const mockWords: Word[] = [
  { id: "1", word: "analyze", phonetic: "/ˈænəlaɪz/", partOfSpeech: "verb", definition: "to examine something in detail", exampleSentence: "The data was analyzed using statistical methods.", synonyms: "examine, study, inspect", level: "core" },
  { id: "2", word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", partOfSpeech: "adjective", definition: "important or large enough to be noticed", exampleSentence: "There was a significant increase in sales.", synonyms: "notable, considerable, substantial", level: "core" },
  { id: "3", word: "consequence", phonetic: "/ˈkɒnsɪkwəns/", partOfSpeech: "noun", definition: "a result or effect of an action", exampleSentence: "Climate change has serious consequences.", synonyms: "result, outcome, effect", level: "core" },
  { id: "4", word: "predominantly", phonetic: "/prɪˈdɒmɪnəntli/", partOfSpeech: "adverb", definition: "mainly; for the most part", exampleSentence: "The population is predominantly urban.", synonyms: "mainly, mostly, primarily", level: "advanced" },
  { id: "5", word: "contribute", phonetic: "/kənˈtrɪbjuːt/", partOfSpeech: "verb", definition: "to give or be part of the cause of something", exampleSentence: "Several factors contribute to the problem.", synonyms: "add, provide, donate", level: "core" },
];

function sm2(quality: number, prevEase: number, prevInterval: number, prevReps: number) {
  let ease = prevEase;
  let interval: number;
  let reps: number;

  if (quality < 3) {
    reps = 0;
    interval = 1;
  } else {
    reps = prevReps + 1;
    if (reps === 1) { interval = 1; }
    else if (reps === 2) { interval = 6; }
    else { interval = Math.round(prevInterval * ease); }
  }

  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;

  return { ease, interval, reps };
}

export default function LearnPage() {
  const [words] = useState<Word[]>(mockWords);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState({ reviewed: 0, remembered: 0 });

  const word = words[index] || null;

  function handleRate(quality: number) {
    setRated(true);
    const newStats = { ...stats, reviewed: stats.reviewed + 1 };
    if (quality >= 4) newStats.remembered += 1;
    setStats(newStats);
  }

  function handleNext() {
    setRated(false);
    setFlipped(false);
    if (index + 1 < words.length) {
      setIndex(index + 1);
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-2xl font-bold">复习完成！</h2>
            <p className="mt-2 text-slate-500">
              已复习 {stats.reviewed} 个单词，掌握 {stats.remembered} 个
            </p>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mb-6 text-sm text-slate-400">{index + 1} / {words.length}</div>

      <Card className="w-full max-w-md min-h-[320px] cursor-pointer" onClick={() => !rated && setFlipped(!flipped)}>
        <CardContent className="flex flex-col items-center justify-center min-h-[320px] p-8 text-center">
          {!flipped ? (
            <>
              <h2 className="text-3xl font-bold tracking-tight">{word?.word}</h2>
              <p className="mt-2 text-slate-400">{word?.phonetic}</p>
              <p className="mt-6 text-sm text-slate-400">点击翻转查看释义</p>
            </>
          ) : (
            <>
              <span className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                {word?.partOfSpeech} · {word?.level}
              </span>
              <p className="mt-3 text-lg">{word?.definition}</p>
              {word?.exampleSentence && (
                <p className="mt-4 text-sm text-slate-500 italic">"{word.exampleSentence}"</p>
              )}
              {word?.synonyms && (
                <p className="mt-2 text-xs text-slate-400">近义: {word.synonyms}</p>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {flipped && !rated && (
        <div className="mt-6 flex gap-3">
          <Button variant="destructive" size="lg" onClick={() => handleRate(1)}>不认识</Button>
          <Button variant="secondary" size="lg" onClick={() => handleRate(3)}>模糊</Button>
          <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => handleRate(5)}>认识</Button>
        </div>
      )}

      {rated && (
        <div className="mt-6">
          <Button size="lg" onClick={handleNext}>
            {index + 1 < words.length ? "下一个" : "完成"}
          </Button>
        </div>
      )}
    </div>
  );
}