"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mic, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SpeakingTimer } from "@/components/speaking/SpeakingTimer";
interface Topic { id: string; part: number; topic: string; questions: string; modelAnswer: string; }
export default function PracticePage() {
  const params = useParams(); const topicId = params.topicId as string;
  const [topic, setTopic] = useState<Topic | null>(null); const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    async function load() {
      try { const r = await fetch("/api/speaking/topics"); const data: Topic[] = await r.json(); setTopic(data.find((t: Topic) => t.id === topicId) || null); } catch {}
      finally { setLoading(false); }
    }
    load();
  }, [topicId]);
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!topic) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500">未找到</p></div>;
  const questions: string[] = topic.questions ? JSON.parse(topic.questions) : [];
  return (<div className="min-h-screen bg-slate-50"><div className="border-b bg-white"><div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
    <Link href="/speaking" className="flex items-center gap-1.5 text-sm text-slate-500"><ArrowLeft className="h-4 w-4" /> 口语中心</Link>
    <SpeakingTimer seconds={topic.part === 2 ? 120 : 300} label={topic.part === 2 ? "准备" : "作答"} />
  </div></div>
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="mb-6"><div className="flex items-center gap-2 mb-2"><Badge>Part {topic.part}</Badge><h1 className="text-xl font-bold">{topic.topic}</h1></div></div>
      <div className="space-y-3 mb-6">{questions.map((q, i) => <Card key={i}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">
        <span className="text-primary font-bold mr-2">Q{i+1}.</span>{q}</CardTitle></CardHeader></Card>)}</div>
      <div className="flex justify-center gap-3 mb-6">
        <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}{showAnswer ? "隐藏范文" : "查看范文"}</Button>
      </div>
      {showAnswer && <Card className="border-primary/20"><CardHeader><CardTitle className="text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" />参考范文</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-slate-600 leading-relaxed">{topic.modelAnswer}</p></CardContent></Card>}
    </main></div>);
}
