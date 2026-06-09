import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const { essay, prompt } = await req.json();
    if (!essay || essay.trim().length < 50)
      return NextResponse.json({ error: "Essay too short" }, { status: 400 });
    const words = essay.trim().split(/\s+/).length;
    const chars = essay.length;
    const sentences = essay.split(/[.!?]+/).filter((s: string) => s.trim().length > 0).length;
    const avgSentence = sentences > 0 ? Math.round(words / sentences) : 0;
    let band = 5.0;
    if (words >= 250) band = 6.0;
    if (words >= 300) band = 6.5;
    if (words >= 350 && avgSentence >= 12) band = 7.0;
    if (words >= 400 && avgSentence >= 14) band = 7.5;
    if (words >= 450 && avgSentence >= 16) band = 8.0;
    const feedback = [];
    if (words < 250) feedback.push("字数不足，建议写到 250 词以上。");
    else if (words < 300) feedback.push("字数基本达标，建议继续扩充内容。");
    else feedback.push("字数达标，结构完整。");
    if (avgSentence < 10) feedback.push("句子偏短，建议尝试使用复合句增加句式多样性。");
    else if (avgSentence > 20) feedback.push("部分句子过长，注意断句和标点使用。");
    else feedback.push("句子长度适中，句式变化合理。");
    return NextResponse.json({ words, chars, sentences, avgSentence, band, feedback, suggestions: ["建议多使用连接词增强逻辑连贯性", "注意检查拼写和语法错误", "可以使用同义替换避免重复词汇"] });
  } catch (e) { console.error(e); return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
