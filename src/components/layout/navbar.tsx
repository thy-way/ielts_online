"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/vocabulary", label: "璇嶆眹" },
  { href: "/grammar", label: "语法" },
  { href: "/listening", label: "听力" },
  { href: "/reading", label: "阅读" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-xl shadow-nav">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-slate-900 hover:text-primary transition-colors">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shadow-sm">I</span>
          IELTS Online
        </Link>
        <nav className="hidden items-center gap-0.5 sm:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg text-sm font-medium transition-all ${
                    active ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login"><Button variant="ghost" size="sm" className="rounded-lg text-slate-600 hover:text-slate-900">鐧诲綍</Button></Link>
          <Link href="/register"><Button size="sm" className="rounded-lg shadow-sm">鍏嶈垂娉ㄥ唽</Button></Link>
        </div>
      </div>
    </header>
  );
}
