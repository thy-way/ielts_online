import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding grammar exercises ===");
  
  const allPoints = await prisma.grammarPoint.findMany();
  const pmap: Record<string, string> = {};
  for (const p of allPoints) pmap[p.name] = p.id;

  const exercises = [
    // Tenses
    { qt: "Every year, the government ___ a report on education.", opts: ["publish", "publishes", "published", "has published"], ans: "publishes", expl: "Every year 表示经常性动作，一般现在时，主语单数加s。" },
    { qt: "In 1990, the population of the city ___ 2 million.", opts: ["is", "was", "has been", "had been"], ans: "was", expl: "1990 年是过去的时间点，用一般过去时。" },
    { qt: "The number of tourists ___ significantly since 2000.", opts: ["increases", "increased", "has increased", "had increased"], ans: "has increased", expl: "since 2000 表示从过去持续到现在，用现在完成时。" },
    { qt: "Before the pandemic, the company ___ steadily for a decade.", opts: ["grows", "grew", "has grown", "had grown"], ans: "had grown", expl: "before 之前完成的动作，用过去完成时。" },
    { qt: "By 2030, experts predict that renewable energy ___ 50% of supply.", opts: ["will account", "accounts", "accounted", "has accounted"], ans: "will account", expl: "By 2030 是将来时间点，用将来时。" },
    { qt: "Currently, more people ___ to work from home than ever before.", opts: ["choose", "chose", "are choosing", "have chosen"], ans: "are choosing", expl: "Currently 强调当前正在发生的趋势，用现在进行时。" },
    { qt: "The number of electric cars ___ rapidly at the moment.", opts: ["rises", "is rising", "rose", "has risen"], ans: "is rising", expl: "at the moment 强调现在正在发生，用现在进行时。" },
    { qt: "She ___ in London since she moved there in 2015.", opts: ["lives", "lived", "has lived", "is living"], ans: "has lived", expl: "since 2015 表示从过去持续到现在，用现在完成时。" },

    // Passive voice
    { qt: "The experiment ___ by a team of researchers.", opts: ["conducted", "was conducted", "has conducted", "conducts"], ans: "was conducted", expl: "实验是被进行的，用被动语态。" },
    { qt: "More action must ___ to address climate change.", opts: ["take", "be taken", "taking", "took"], ans: "be taken", expl: "must + be + 过去分词表示情态动词被动。" },
    { qt: "The new policy ___ next month.", opts: ["will announce", "will be announced", "announces", "announced"], ans: "will be announced", expl: "政策是被宣布的，用将来被动。" },
    { qt: "The report ___ by the end of this week.", opts: ["will complete", "will be completed", "completes", "completed"], ans: "will be completed", expl: "报告是被完成的，用将来被动。" },
    { qt: "Carbon emissions must ___ significantly.", opts: ["reduce", "be reduced", "reducing", "reduced"], ans: "be reduced", expl: "排放是被减少的，情态动词被动结构。" },
    { qt: "The research paper ___ in a leading journal.", opts: ["published", "was published", "has published", "publishes"], ans: "was published", expl: "论文是被发表的，用过去被动。" },

    // Clauses
    { qt: "Students ___ study hard usually achieve good results.", opts: ["which", "who", "whom", "what"], ans: "who", expl: "指人用 who 引导定语从句。" },
    { qt: "The policy, ___ was introduced in 2020, has been controversial.", opts: ["that", "which", "who", "what"], ans: "which", expl: "非限定性定语从句用 which，前面加逗号。" },
    { qt: "___ the cost is high, the long-term benefits are worth it.", opts: ["Because", "Although", "Since", "If"], ans: "Although", expl: "让步状语从句，although 表示尽管。" },
    { qt: "Many people believe ___ education is the key to success.", opts: ["what", "which", "that", "when"], ans: "that", expl: "that 引导宾语从句，believe that... 常用结构。" },
    { qt: "The reason ___ the policy failed was lack of funding.", opts: ["which", "why", "that", "what"], ans: "why", expl: "the reason why... 表示原因。" },
    { qt: "___ what the government says, the situation is improving.", opts: ["According to", "Despite", "Because of", "In spite"], ans: "According to", expl: "according to 表示根据某人所言。" },

    // Conditionals
    { qt: "If the government ___ more in education, literacy rates will improve.", opts: ["invests", "invested", "will invest", "invest"], ans: "invests", expl: "第一条件句，if + 一般现在时。" },
    { qt: "If I ___ the minister, I would allocate more funds to education.", opts: ["am", "was", "were", "be"], ans: "were", expl: "第二条件句，be 动词用 were，不论主语人称。" },
    { qt: "If the government had acted earlier, the crisis ___ avoided.", opts: ["could be", "could have been", "can be", "would be"], ans: "could have been", expl: "第三条件句，if + 过去完成时, would/could + have + 过去分词。" },
    { qt: "If the company ___ better decisions, it would not be in debt now.", opts: ["makes", "made", "had made", "would make"], ans: "had made", expl: "混合条件句，过去动作影响现在。" },
    { qt: "Unless the government ___ immediate action, the problem will worsen.", opts: ["takes", "took", "will take", "has taken"], ans: "takes", expl: "unless = if not，后接一般现在时。" },
    { qt: "Provided that the reforms ___ implemented, the economy will recover.", opts: ["are", "were", "will be", "would be"], ans: "are", expl: "provided that 表示只要，后接一般现在时。" },

    // Comparison
    { qt: "The number of students in cities is ___ higher than in rural areas.", opts: ["more", "much", "most", "very"], ans: "much", expl: "much 可以修饰比较级 higher。" },
    { qt: "Education is one of the ___ important factors in development.", opts: ["more", "most", "much", "very"], ans: "most", expl: "one of the + 最高级 + 名词复数。" },
    { qt: "The cost of living in London is ___ as high as in Tokyo.", opts: ["twice", "double", "two times", "twofold"], ans: "twice", expl: "twice as...as 表示两倍。" },
    { qt: "While the number of cars increased, public transport usage ___ .", opts: ["increased", "rose", "declined", "grew"], ans: "declined", expl: "while 表示对比，一方增加另一方减少。" },
    { qt: "The population of the city is ___ compared to 20 years ago.", opts: ["large", "larger", "largest", "more large"], ans: "larger", expl: "compared to 表示对比，用比较级。" },
    { qt: "The percentage of people using public transport is ___ than car users.", opts: ["low", "lower", "lowest", "more low"], ans: "lower", expl: "than 是比较级的标志。" },

    // Subjunctive
    { qt: "I wish more attention ___ paid to environmental issues.", opts: ["is", "was", "were", "be"], ans: "were", expl: "wish 后用虚拟语气，be 动词用 were。" },
    { qt: "I wish I ___ harder for the exam.", opts: ["study", "studied", "had studied", "would study"], ans: "had studied", expl: "与过去事实相反，用过去完成时。" },
    { qt: "It is high time the government ___ action on pollution.", opts: ["takes", "took", "will take", "has taken"], ans: "took", expl: "It is high time + 一般过去时虚拟。" },
    { qt: "She talks as if she ___ everything about the topic.", opts: ["knows", "knew", "has known", "will know"], ans: "knew", expl: "as if 后用虚拟语气，与现在相反用一般过去时。" },
    { qt: "I would rather the government ___ more on healthcare.", opts: ["spends", "spent", "will spend", "has spent"], ans: "spent", expl: "would rather + 一般过去时虚拟。" },

    // Basic sentences
    { qt: "In the sentence The trend is significant, the verb is ___.", opts: ["trend", "is", "significant", "the"], ans: "is", expl: "S + V + C 句型中系动词是动词。" },
    { qt: "Education provides individuals better job opportunities is an example of ___.", opts: ["S+V+O", "S+V+O+O", "S+V+O+C", "S+V+C"], ans: "S+V+O+O", expl: "双宾结构，individuals 是间接宾语，opportunities 是直接宾语。" },
    { qt: "Which sentence is S+V+O+C structure?", opts: ["Prices rose.", "The chart shows data.", "Technology makes life convenient.", "Education is crucial."], ans: "Technology makes life convenient.", expl: "\"makes\" 是动词，\"life\" 是宾语，\"convenient\" 是宾补。" },
    { qt: "The unemployment rate fell steadily. This is an example of ___.", opts: ["S+V", "S+V+O", "S+V+C", "S+V+O+O"], ans: "S+V", expl: "主语 + 不及物动词，没有宾语。" },

    // Sentence expansion
    { qt: "___ did the population increase, but also the average age rose.", opts: ["Not only", "Only", "Neither", "Either"], ans: "Not only", expl: "Not only...but also 表示不仅...而且。" },
    { qt: "___ the cost is high, the benefits outweigh it.", opts: ["But", "While", "Because", "So"], ans: "But", expl: "but 表示转折连接两个并列分句。" },
    { qt: "___ renewable energy is essential for a sustainable future.", opts: ["To invest", "Invested", "Investing", "Invest"], ans: "Investing", expl: "动名词作主语。" },
    { qt: "The government took steps ___ pollution.", opts: ["reduce", "reducing", "to reduce", "reduced"], ans: "to reduce", expl: "不定式表目的。" },
    { qt: "___ with rising costs, the company had to restructure.", opts: ["Face", "Facing", "Faced", "To face"], ans: "Faced", expl: "过去分词作状语，表示被动。" },
  ];

  let count = 0;
  for (const ex of exercises) {
    const eid = "grammar-" + ex.qt.substring(0, 25);
    await prisma.question.upsert({
      where: { id: eid },
      update: { type: "grammar", section: 0, questionText: ex.qt, options: JSON.stringify(ex.opts), answer: ex.ans, explanation: ex.expl },
      create: { id: eid, type: "grammar", section: 0, questionText: ex.qt, options: JSON.stringify(ex.opts), answer: ex.ans, explanation: ex.expl },
    });
    count++;
  }

  const total = await prisma.question.count({ where: { type: "grammar" } });
  console.log(`Added ${count} exercises. Total grammar exercises: ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
