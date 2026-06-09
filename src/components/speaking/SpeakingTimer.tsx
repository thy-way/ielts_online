"use client";
import { useState, useEffect } from "react";
import { Clock, AlertTriangle } from "lucide-react";
interface Props { seconds: number; label: string; onTimeUp?: () => void; }
export function SpeakingTimer({ seconds, label, onTimeUp }: Props) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onTimeUp?.(); return; }
    const t = setInterval(() => setLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [left, onTimeUp]);
  const m = Math.floor(left / 60); const s = left % 60;
  const low = left < 30;
  return <div className={"flex items-center gap-2 rounded-lg border px-3 py-2 text-sm " + (low ? "bg-red-50 border-red-200 text-red-600" : "bg-slate-50")}>
    {low ? <AlertTriangle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
    <span className={"font-mono font-bold " + (low ? "text-red-600" : "")}>{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>
    <span className="text-xs text-slate-400">{label}</span>
  </div>;
}
