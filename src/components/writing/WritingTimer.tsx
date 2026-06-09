"use client";
import { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle } from "lucide-react";
interface Props { minutes?: number; onTimeUp?: () => void; }
export function WritingTimer({ minutes = 60, onTimeUp }: Props) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  useEffect(() => {
    if (timeLeft <= 0) { onTimeUp?.(); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, onTimeUp]);
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const low = timeLeft < 600;
  return <div className={"flex items-center gap-2 rounded-lg border px-3 py-2 text-sm " + (low ? "bg-red-50 border-red-200 text-red-600" : "bg-slate-50")}>
    {low ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
    <span className={"font-mono font-bold " + (low ? "text-red-600" : "")}>{String(m).padStart(2, "0")}:{String(s).padStart(2, "0")}</span>
    <span className="text-xs text-slate-400">剩余时间</span>
  </div>;
}
