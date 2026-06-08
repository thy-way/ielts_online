import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-[10px] text-white">I</span>
          IELTS Online — 科学备考，高效提分
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <Link href="/about" className="hover:text-slate-600 transition-colors">关于</Link>
          <Link href="/pricing" className="hover:text-slate-600 transition-colors">定价</Link>
          <Link href="/contact" className="hover:text-slate-600 transition-colors">联系我们</Link>
        </div>
      </div>
    </footer>
  );
}