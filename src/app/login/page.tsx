"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) { setError("邮箱或密码不正确"); return; }
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="h-4 w-4" /> 返回首页
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle>登录 IELTS Online</CardTitle>
            <CardDescription>输入邮箱和密码继续学习</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <Input type="email" placeholder="邮箱地址" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div className="relative">
                <Input type={showPw ? "text" : "password"} placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 rounded-md px-3 py-2">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">{loading ? "登录中..." : "登录"}</Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-slate-500">还没有账号？<Link href="/register" className="font-medium text-primary hover:underline">免费注册</Link></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}