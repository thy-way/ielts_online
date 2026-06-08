import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-xl font-bold">IELTS Online</span>
          <span className="text-sm text-slate-500">{session.user?.email}</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold">你好，{session.user?.name || "同学"}</h1>
        <p className="mt-2 text-slate-500">欢迎回来。选择下方模块开始学习。</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "词汇复习", desc: "今日待复习 0 词", href: "#" },
            { title: "听力练习", desc: "Section 训练", href: "#" },
            { title: "阅读练习", desc: "Passage 训练", href: "#" },
            { title: "写作练习", desc: "Task 1 / Task 2", href: "#" },
            { title: "口语练习", desc: "Part 1-3", href: "#" },
            { title: "模考", desc: "全科限时模考", href: "#" },
          ].map((m) => (
            <a key={m.title} href={m.href} className="block rounded-lg border bg-white p-6 hover:shadow-sm transition-shadow">
              <h3 className="font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{m.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}