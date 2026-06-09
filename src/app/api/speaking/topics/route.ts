import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  try {
    const topics = await prisma.speakingTopic.findMany({ orderBy: [{ part: "asc" }, { topic: "asc" }] });
    return NextResponse.json(topics);
  } catch (e) { console.error(e); return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
