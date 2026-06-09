"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, Loader2 } from "lucide-react";

interface Props { transcript: string; }

export function AudioPlayer({ transcript }: Props) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  function togglePlay() {
    if (!window.speechSynthesis) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    setLoading(true);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript);
    utterance.rate = 0.9;
    utterance.onend = () => { setPlaying(false); setLoading(false); };
    utterance.onerror = () => { setPlaying(false); setLoading(false); };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-white p-3">
      <button
        onClick={togglePlay}
        disabled={loading}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
      </button>
      <div className="flex-1">
        <p className="text-sm font-medium">{playing ? "????..." : "????????"}</p>
        <p className="text-xs text-slate-400">???? (TTS) ??</p>
      </div>
      <Volume2 className="h-5 w-5 text-slate-400" />
    </div>
  );
}
