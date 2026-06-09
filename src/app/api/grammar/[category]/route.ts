import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const cat = await prisma.grammarCategory.findUnique({
      where: { name: category },
    });
    if (!cat) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    const points = await prisma.grammarPoint.findMany({
      where: { categoryId: cat.id },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ category: cat, points });
  } catch (error) {
    console.error("Failed to fetch grammar category:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
