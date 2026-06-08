import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IELTS Online - 科学备考，高效提分",
  description: "基于认知科学的 IELTS 在线学习平台，间隔复习 + AI 批改 + 模考系统",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
