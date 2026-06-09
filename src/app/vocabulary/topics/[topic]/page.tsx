import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ filter?: string; level?: string }>;
}

const topicNames: Record<string, string> = {
  "parts-of-speech": "词性基础",
  "word-formation": "词的构成",
  education: "教育",
  environment: "环境",
  technology: "科技",
  health: "健康",
  society: "社会",
  economy: "经济",
  culture: "文化",
  government: "政府",
  crime: "犯罪",
  media: "媒体",
};

const posColors: Record<string, string> = {
  noun: "bg-blue-100 text-blue-700",
  verb: "bg-green-100 text-green-700",
  adjective: "bg-orange-100 text-orange-700",
  adverb: "bg-purple-100 text-purple-700",
  preposition: "bg-gray-100 text-gray-700",
  conjunction: "bg-red-100 text-red-700",
  pronoun: "bg-pink-100 text-pink-700",
  article: "bg-amber-100 text-amber-700",
};

const levelColors: Record<string, string> = {
  foundation: "bg-slate-100 text-slate-600",
  core: "bg-primary/10 text-primary",
  advanced: "bg-amber-50 text-amber-700",
};

const levelLabels: Record<string, string> = {
  foundation: "基础",
  core: "核心",
  advanced: "进阶",
};

export default async function TopicDetailPage({ params, searchParams }: Props) {
  const { topic } = await params;
  const { filter, level } = await searchParams;

  const displayName = topicNames[topic] ?? topic;

  const where: Record<string, unknown> = {};
  if (topic === "parts-of-speech" && filter) {
    where.partOfSpeech = filter;
  } else if (topic !== "parts-of-speech" && topic !== "word-formation") {
    where.topic = topic;
  }
  if (level) where.level = level;

  const words = await prisma.vocabularyWord.findMany({
    where,
    orderBy: { word: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/vocabulary/topics" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="h-4 w-4" /> 话题列表
          </Link>
          <Link href="/vocabulary/learn"><Button size="sm">开始复习</Button></Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{displayName}</h1>
            {filter && (
              <Badge className={posColors[filter] ?? ""}>{filter}</Badge>
            )}
            {level && (
              <Badge className={levelColors[level] ?? ""}>
                {levelLabels[level] ?? level}
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">{words.length} 个单词</p>
        </div>

        {topic === "word-formation" && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Link href="/vocabulary/topics/word-formation?type=prefix">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center py-8">
                  <span className="text-3xl mb-2">🔤</span>
                  <span className="font-semibold">常见前缀</span>
                  <span className="text-xs text-slate-400 mt-1">un-, pre-, inter-, trans-...</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/vocabulary/topics/word-formation?type=suffix">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center py-8">
                  <span className="text-3xl mb-2">📎</span>
                  <span className="font-semibold">常见后缀</span>
                  <span className="text-xs text-slate-400 mt-1">-tion, -ment, -able, -ful...</span>
                </CardContent>
              </Card>
            </Link>
            <Link href="/vocabulary/topics/word-formation?type=root">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center py-8">
                  <span className="text-3xl mb-2">🌱</span>
                  <span className="font-semibold">核心词根</span>
                  <span className="text-xs text-slate-400 mt-1">spect-, dict-, port-, struct-...</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {words.map((word) => (
            <Card key={word.id} className="group transition-shadow hover:shadow-sm">
              <CardContent className="flex flex-wrap items-start gap-4 py-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{word.word}</h3>
                  </div>
                  {word.phonetic && (
                    <p className="text-sm text-slate-400">{word.phonetic}</p>
                  )}
                  <p className="mt-1 text-sm text-slate-600">{word.definition}</p>
                  {word.definitionCn && (
                    <p className="text-xs text-slate-400 mt-0.5">{word.definitionCn}</p>
                  )}
                  {word.exampleSentence && (
                    <p className="mt-2 text-sm text-slate-500 italic">
                      &ldquo;{word.exampleSentence}&rdquo;
                    </p>
                  )}
                  {word.collocations && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {JSON.parse(word.collocations).map((c: string) => (
                        <span key={c} className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  )}
                  {word.synonyms && (
                    <p className="mt-1 text-xs text-slate-400">近义: {word.synonyms}</p>
                  )}
                  {word.root && (
                    <p className="mt-1 text-xs text-slate-400">
                      词根: {word.root}{word.prefix ? ` | 前缀: ${word.prefix}` : ""}{word.suffix ? ` | 后缀: ${word.suffix}` : ""}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-1.5 pt-1">
                  <Badge className={posColors[word.partOfSpeech] ?? ""}>{word.partOfSpeech}</Badge>
                  <Badge className={levelColors[word.level] ?? ""}>{levelLabels[word.level] ?? word.level}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          {words.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-400">暂无单词</p>
              <Link href="/vocabulary"><Button variant="outline" className="mt-4">返回词汇中心</Button></Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
