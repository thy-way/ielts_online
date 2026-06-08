import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const topics = [
  { name: "education", nameCn: "教育", icon: "📚", count: 18, desc: "学校教育、终身学习、在线教育、学术研究" },
  { name: "environment", nameCn: "环境", icon: "🌍", count: 16, desc: "气候变化、污染、可持续发展、生物多样性" },
  { name: "technology", nameCn: "科技", icon: "💻", count: 15, desc: "AI、互联网、社交媒体、科技伦理" },
  { name: "health", nameCn: "健康", icon: "🏥", count: 14, desc: "饮食营养、运动健身、心理健康、医疗" },
  { name: "society", nameCn: "社会", icon: "👥", count: 16, desc: "城市化、老龄化、全球化、移民" },
  { name: "economy", nameCn: "经济", icon: "💰", count: 14, desc: "就业市场、消费、国际贸易、通货膨胀" },
  { name: "culture", nameCn: "文化", icon: "🎭", count: 12, desc: "语言、艺术、传统保护、文化多样性" },
  { name: "government", nameCn: "政府", icon: "🏛️", count: 12, desc: "政策、税收、公共服务、社会福利" },
  { name: "crime", nameCn: "犯罪", icon: "⚖️", count: 10, desc: "法律体系、刑罚、预防犯罪、青少年犯罪" },
  { name: "media", nameCn: "媒体", icon: "📱", count: 11, desc: "新闻报道、广告、社交媒体、娱乐产业" },
];

const partsOfSpeech = [
  { label: "名词", value: "noun", color: "bg-blue-100 text-blue-700" },
  { label: "动词", value: "verb", color: "bg-green-100 text-green-700" },
  { label: "形容词", value: "adjective", color: "bg-orange-100 text-orange-700" },
  { label: "副词", value: "adverb", color: "bg-purple-100 text-purple-700" },
  { label: "介词", value: "preposition", color: "bg-gray-100 text-gray-700" },
  { label: "连词", value: "conjunction", color: "bg-red-100 text-red-700" },
];

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/vocabulary" className="text-xl font-bold tracking-tight">← 词汇中心</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">话题词汇</h1>
        <p className="text-slate-500 mb-8">按 IELTS 高频话题分类学习，每个话题包含核心词汇、搭配和范文例句</p>

        {/* Parts of Speech quick filter */}
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-slate-400 mb-3">按词性学习</h2>
          <div className="flex flex-wrap gap-2">
            {partsOfSpeech.map((pos) => (
              <Link key={pos.value} href={`/vocabulary/topics/parts-of-speech?filter=${pos.value}`}>
                <Button variant="outline" size="sm" className={pos.color}>
                  {pos.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Topic grid */}
        <h2 className="text-sm font-semibold text-slate-400 mb-4">按话题学习</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link key={t.name} href={`/vocabulary/topics/${t.name}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="text-xs text-slate-400">{t.count} 词</span>
                  </div>
                  <CardTitle className="text-lg mt-2">{t.nameCn}</CardTitle>
                  <CardDescription>{t.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}