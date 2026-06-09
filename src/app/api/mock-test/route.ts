import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { listening, reading, writing, speaking } = await req.json();
    const avg = Math.round(((listening || 0) + (reading || 0) + (writing || 0) + (speaking || 0)) / 4 * 10) / 10;
    const mock = await prisma.mockTest.create({
      data: { userId: session.user.id, scores: JSON.stringify({ listening, reading, writing, speaking, average: avg }), completedAt: new Date() },
    });
    return NextResponse.json({ id: mock.id, scores: { listening, reading, writing, speaking, average: avg } });
  } catch (e) { console.error(e); return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const tests = await prisma.mockTest.findMany({ where: { userId: session.user.id }, orderBy: { startedAt: "desc" }, take: 10 });
    return NextResponse.json(tests.map(t => ({ ...t, scores: JSON.parse(t.scores) })));
  } catch (e) { console.error(e); return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
