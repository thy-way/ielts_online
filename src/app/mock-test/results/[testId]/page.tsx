"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function ResultsPage() {
  const params = useParams();
  return (<div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <Card className="w-full max-w-md text-center"><CardContent className="pt-10 pb-10">
      <p className="text-slate-500 mb-4">成绩报告</p>
      <p className="text-sm text-slate-400 mb-6">请在模考中心查看历史成绩</p>
      <Link href="/mock-test"><Button>返回模考中心</Button></Link>
    </CardContent></Card></div>);
}
