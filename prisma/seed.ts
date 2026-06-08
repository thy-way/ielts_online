import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding vocabulary topics...");
  const topics = [
    { name: "education", nameCn: "教育", sortOrder: 1, description: "学校教育、终身学习、在线教育", icon: "📚" },
    { name: "environment", nameCn: "环境", sortOrder: 2, description: "气候变化、污染、可持续发展", icon: "🌍" },
    { name: "technology", nameCn: "科技", sortOrder: 3, description: "AI、互联网、社交媒体", icon: "💻" },
    { name: "health", nameCn: "健康", sortOrder: 4, description: "饮食、运动、心理健康", icon: "🏥" },
    { name: "society", nameCn: "社会", sortOrder: 5, description: "城市化、老龄化、全球化", icon: "👥" },
    { name: "economy", nameCn: "经济", sortOrder: 6, description: "就业、消费、国际贸易", icon: "💰" },
    { name: "culture", nameCn: "文化", sortOrder: 7, description: "语言、艺术、传统保护", icon: "🎭" },
    { name: "government", nameCn: "政府", sortOrder: 8, description: "政策、税收、公共服务", icon: "🏛️" },
    { name: "crime", nameCn: "犯罪", sortOrder: 9, description: "法律、刑罚、预防", icon: "⚖️" },
    { name: "media", nameCn: "媒体", sortOrder: 10, description: "新闻、广告、娱乐", icon: "📱" },
  ];
  for (const t of topics) {
    await prisma.vocabularyTopic.upsert({ where: { name: t.name }, update: t, create: t });
  }

  console.log("Seeding grammar categories...");
  const grammarCategories = [
    { name: "tenses", nameCn: "时态系统", sortOrder: 1, icon: "⏱️", description: "一般时、完成时、进行时、将来时" },
    { name: "passive-voice", nameCn: "被动语态", sortOrder: 2, icon: "🔄", description: "be + done 结构" },
    { name: "clauses", nameCn: "三大从句", sortOrder: 3, icon: "🔗", description: "定语/状语/名词性从句" },
    { name: "conditionals", nameCn: "条件句", sortOrder: 4, icon: "🔀", description: "零/一/二/三条件句" },
    { name: "subjunctive", nameCn: "虚拟语气", sortOrder: 5, icon: "💭", description: "wish / if only" },
    { name: "comparison", nameCn: "比较结构", sortOrder: 6, icon: "📊", description: "比较级/最高级/倍数" },
    { name: "basic-sentences", nameCn: "基本句型", sortOrder: 7, icon: "📝", description: "5种基本句型" },
    { name: "sentence-expansion", nameCn: "句子扩展", sortOrder: 8, icon: "➕", description: "并列句/复合句" },
  ];
  for (const g of grammarCategories) {
    await prisma.grammarCategory.upsert({ where: { name: g.name }, update: g, create: g });
  }

  console.log("Seeding grammar points...");
  const tenses = await prisma.grammarCategory.findUnique({ where: { name: "tenses" } });
  const grammarPoints = [
    { categoryId: tenses!.id, name: "present-simple", nameCn: "一般现在时", sortOrder: 1, level: "foundation", explanation: "表示经常性动作、客观事实、真理。形式：主语 + 动词原形(三单+s)", examples: JSON.stringify([{ sentence: "The chart shows the number of students.", analysis: "客观描述图表数据" }, { sentence: "Water boils at 100°C.", analysis: "客观真理" }]), ieltsUsage: "Task 1 图表描述最常用时态" },
    { categoryId: tenses!.id, name: "past-simple", nameCn: "一般过去时", sortOrder: 2, level: "foundation", explanation: "表示过去发生的动作或状态。形式：主语 + 动词过去式", examples: JSON.stringify([{ sentence: "In 2005, the figure rose to 60%.", analysis: "描述过去特定年份的数据" }]), ieltsUsage: "Task 1 描述过去数据" },
    { categoryId: tenses!.id, name: "present-perfect", nameCn: "现在完成时", sortOrder: 3, level: "core", explanation: "表示过去动作对现在的影响或持续到现在的状态。形式：have/has + 过去分词", examples: JSON.stringify([{ sentence: "The number has increased significantly since 2010.", analysis: "从过去持续到现在" }]), ieltsUsage: "Task 1 描述从过去到现在的变化趋势" },
  ];
  for (const p of grammarPoints) {
    await prisma.grammarPoint.upsert({ where: { id: p.categoryId + "-" + p.name }, update: p, create: { ...p, id: p.categoryId + "-" + p.name } });
  }

  console.log("Seeding vocabulary words...");
  const words = [
    { word: "curriculum", phonetic: "/kəˈrɪkjələm/", partOfSpeech: "noun", definition: "The subjects comprising a course of study", definitionCn: "课程", topic: "education", level: "core", exampleSentence: "The school revised its curriculum to include more practical skills." },
    { word: "pedagogy", phonetic: "/ˈpedəɡɒdʒi/", partOfSpeech: "noun", definition: "The method and practice of teaching", definitionCn: "教学法", topic: "education", level: "advanced", exampleSentence: "Modern pedagogy emphasizes student-centered learning." },
    { word: "literacy", phonetic: "/ˈlɪtərəsi/", partOfSpeech: "noun", definition: "The ability to read and write", definitionCn: "读写能力", topic: "education", level: "core", exampleSentence: "Improving literacy rates is a key goal for many developing countries." },
    { word: "academic", phonetic: "/ˌækəˈdemɪk/", partOfSpeech: "adjective", definition: "Relating to education and scholarship", definitionCn: "学术的", topic: "education", level: "foundation", exampleSentence: "Academic performance has improved over the past decade." },
    { word: "vocational", phonetic: "/vəʊˈkeɪʃənl/", partOfSpeech: "adjective", definition: "Relating to skills needed for a particular job", definitionCn: "职业的", topic: "education", level: "core", exampleSentence: "Vocational training provides practical skills for employment." },
    { word: "sustainable", phonetic: "/səˈsteɪnəbl/", partOfSpeech: "adjective", definition: "Able to be maintained without depleting resources", definitionCn: "可持续的", topic: "environment", level: "core", exampleSentence: "Sustainable development balances economic growth with environmental protection." },
    { word: "emission", phonetic: "/ɪˈmɪʃn/", partOfSpeech: "noun", definition: "The production and discharge of something, especially gas", definitionCn: "排放", topic: "environment", level: "core", exampleSentence: "Carbon emissions have reached alarming levels worldwide." },
    { word: "biodiversity", phonetic: "/ˌbaɪəʊdaɪˈvɜːsəti/", partOfSpeech: "noun", definition: "The variety of plant and animal life", definitionCn: "生物多样性", topic: "environment", level: "core", exampleSentence: "Deforestation threatens biodiversity in tropical regions." },
    { word: "innovation", phonetic: "/ˌɪnəˈveɪʃn/", partOfSpeech: "noun", definition: "A new method, idea, or product", definitionCn: "创新", topic: "technology", level: "core", exampleSentence: "Technological innovation has transformed the way we communicate." },
    { word: "automation", phonetic: "/ˌɔːtəˈmeɪʃn/", partOfSpeech: "noun", definition: "The use of automatic equipment in manufacturing", definitionCn: "自动化", topic: "technology", level: "core", exampleSentence: "Automation is replacing many manual jobs in factories." },
    { word: "obesity", phonetic: "/əʊˈbiːsəti/", partOfSpeech: "noun", definition: "The condition of being grossly overweight", definitionCn: "肥胖", topic: "health", level: "core", exampleSentence: "Childhood obesity has become a serious public health concern." },
    { word: "urbanization", phonetic: "/ˌɜːbənaɪˈzeɪʃn/", partOfSpeech: "noun", definition: "The process of making an area more urban", definitionCn: "城市化", topic: "society", level: "core", exampleSentence: "Rapid urbanization has led to housing shortages in many cities." },
    { word: "inflation", phonetic: "/ɪnˈfleɪʃn/", partOfSpeech: "noun", definition: "A general increase in prices", definitionCn: "通货膨胀", topic: "economy", level: "core", exampleSentence: "Rising inflation has eroded purchasing power." },
    { word: "heritage", phonetic: "/ˈherɪtɪdʒ/", partOfSpeech: "noun", definition: "Valued objects and qualities passed down from previous generations", definitionCn: "遗产", topic: "culture", level: "core", exampleSentence: "Preserving cultural heritage is vital for national identity." },
    { word: "legislation", phonetic: "/ˌledʒɪsˈleɪʃn/", partOfSpeech: "noun", definition: "Laws, considered collectively", definitionCn: "立法", topic: "government", level: "core", exampleSentence: "New legislation was introduced to protect workers' rights." },
    { word: "rehabilitation", phonetic: "/ˌriːəˌbɪlɪˈteɪʃn/", partOfSpeech: "noun", definition: "The restoration of someone to a useful place in society", definitionCn: "改造/康复", topic: "crime", level: "advanced", exampleSentence: "Prison rehabilitation programs reduce reoffending rates." },
    { word: "censorship", phonetic: "/ˈsensəʃɪp/", partOfSpeech: "noun", definition: "The suppression of speech or public communication", definitionCn: "审查", topic: "media", level: "core", exampleSentence: "Internet censorship remains a controversial issue globally." },
    { word: "analyze", phonetic: "/ˈænəlaɪz/", partOfSpeech: "verb", definition: "To examine something in detail", definitionCn: "分析", topic: "general", level: "core", exampleSentence: "Researchers analyzed the data from over 1,000 participants." },
    { word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", partOfSpeech: "adjective", definition: "Important or large enough to be noticed", definitionCn: "显著的", topic: "general", level: "foundation", exampleSentence: "There was a significant improvement in test scores.", synonyms: JSON.stringify(["notable","considerable","substantial"]) },
    { word: "consequently", phonetic: "/ˈkɒnsɪkwəntli/", partOfSpeech: "adverb", definition: "As a result; therefore", definitionCn: "因此", topic: "general", level: "core", exampleSentence: "Demand decreased; consequently, prices fell.", synonyms: JSON.stringify(["therefore","thus","as a result"]) },
  ];

  for (const w of words) {
    await prisma.vocabularyWord.upsert({
      where: { id: w.word + "-" + w.topic },
      update: w,
      create: { ...w, id: w.word + "-" + w.topic },
    });
  }

  // Update topic word counts
  for (const t of topics) {
    const count = words.filter((w) => w.topic === t.name).length;
    await prisma.vocabularyTopic.update({ where: { name: t.name }, data: { wordCount: count } });
  }

  console.log("Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());