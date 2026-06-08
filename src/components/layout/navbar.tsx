"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "仪表盘" },
  { href: "/vocabulary", label: "词汇" },
  { href: "/grammar", label: "语法" },
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs text-white">I</span>
          IELTS Online
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <Button variant={pathname.startsWith(l.href) ? "secondary" : "ghost"} size="sm" className="rounded-md">
                {l.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login"><Button variant="ghost" size="sm">登录</Button></Link>
          <Link href="/register"><Button size="sm">免费注册</Button></Link>
        </div>
      </div>
    </header>
  );
}