import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { minutes } = await req.json();
    const duration = Math.max(1, Math.min(120, (minutes ?? 5) as number));

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const updatedDay = new Date(user.updatedAt);
    updatedDay.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today.getTime() - updatedDay.getTime()) / 86400000);

    let newStreak = user.streak;
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    } else if (diffDays === 0 && user.streak === 0) {
      newStreak = 1;
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalStudyMinutes: { increment: duration },
        streak: newStreak,
      },
    });

    return NextResponse.json({ streak: newStreak, totalStudyMinutes: user.totalStudyMinutes + duration });
  } catch (error) {
    console.error("Failed to update study stats:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
