"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

interface Props {
  grammarId: string;
}

export function MarkGrammarComplete({ grammarId }: Props) {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleMarkComplete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/grammar/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grammarId, score: 100 }),
      });
      if (!res.ok) {
        if (res.status === 401) { setError("请先登录"); return; }
        throw new Error("Failed");
      }
      setCompleted(true);
    } catch {
      setError("操作失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  if (completed) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <Check className="h-4 w-4" />
        已学完
      </div>
    );
  }

  return (
    <div>
      <Button variant="outline" size="sm" onClick={handleMarkComplete} disabled={loading}>
        {loading ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Check className="mr-1 h-3 w-3" />}
        标记完成
      </Button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
