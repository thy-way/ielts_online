import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding vocabulary topics ===");
  const topicDefs = [
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
  for (const t of topicDefs) {
    await prisma.vocabularyTopic.upsert({ where: { name: t.name }, update: t, create: t });
  }

  console.log("=== Seeding grammar categories ===");
  const catDefs = [
    { name: "tenses", nameCn: "时态系统", sortOrder: 1, icon: "🕐", description: "一般时、完成时、进行时、将来时" },
    { name: "passive-voice", nameCn: "被动语态", sortOrder: 2, icon: "🔧", description: "be + done 结构" },
    { name: "clauses", nameCn: "三大从句", sortOrder: 3, icon: "🔆", description: "定语/状语/名词性从句" },
    { name: "conditionals", nameCn: "条件句", sortOrder: 4, icon: "🔢", description: "零/一/二/三条件句" },
    { name: "subjunctive", nameCn: "虚拟语气", sortOrder: 5, icon: "💱", description: "wish / if only" },
    { name: "comparison", nameCn: "比较结构", sortOrder: 6, icon: "📳", description: "比较级/最高级/倍数" },
    { name: "basic-sentences", nameCn: "基本句型", sortOrder: 7, icon: "📑", description: "5种基本句型" },
    { name: "sentence-expansion", nameCn: "句子扩展", sortOrder: 8, icon: "🔗", description: "并列句/复合句" },
  ];
  for (const g of catDefs) {
    await prisma.grammarCategory.upsert({ where: { name: g.name }, update: g, create: g });
  }

  // ── GRAMMAR POINTS ──
  console.log("=== Seeding grammar points ===");
  const cats = await prisma.grammarCategory.findMany();
  const catMap: Record<string, string> = {};
  for (const c of cats) catMap[c.name] = c.id;

  const grammarPoints = [
    // tenses
    { categoryId: catMap["tenses"], name: "present-simple", nameCn: "一般现在时", sortOrder: 1, level: "foundation",
      explanation: "一般现在时表示经常性动作、客观事实、真理。\n\n结构：主语 + 动词原形（第三人称单数 + s/es）\n否定：主语 + don't/doesn't + 动词原形\n疑问：Do/Does + 主语 + 动词原形？",
      examples: JSON.stringify([
        { sentence: "The chart shows the number of students enrolling in universities.", analysis: "客观描述图表数据" },
        { sentence: "Water boils at 100°C.", analysis: "客观真理" },
        { sentence: "Many people believe that education is the key to success.", analysis: "Task 2 表达普遍观点" },
      ]),
      commonErrors: JSON.stringify([
        { error: "The graph show the data.", correction: "The graph shows the data.", note: "主语是第三人称单数时动词要加 s" },
      ]),
      ieltsUsage: "Task 1 图表描述；Task 2 表达普遍观点和事实" },
    { categoryId: catMap["tenses"], name: "past-simple", nameCn: "一般过去时", sortOrder: 2, level: "foundation",
      explanation: "一般过去时表示过去某个时间发生的动作或状态。\n\n结构：主语 + 动词过去式（规则动词 +ed / 不规则动词特殊变化）\n否定：主语 + didn't + 动词原形\n常与明确的时间状语连用：in 2005, last year, yesterday",
      examples: JSON.stringify([
        { sentence: "In 2005, the figure rose sharply to 60%.", analysis: "描述过去某年的具体数据变化" },
        { sentence: "The government introduced new policies to reduce pollution.", analysis: "描述过去发生的政策行动" },
      ]),
      commonErrors: JSON.stringify([
        { error: "The number of students increase last year.", correction: "The number of students increased last year.", note: "过去时间要用过去式" },
      ]),
      ieltsUsage: "Task 1 描述过去年份的数据变化" },
    { categoryId: catMap["tenses"], name: "present-perfect", nameCn: "现在完成时", sortOrder: 3, level: "core",
      explanation: "现在完成时表示过去动作对现在的影响或持续到现在的状态。\n\n结构：have/has + 过去分词\n用法：\n1. 过去发生但对现在有影响\n2. 从过去持续到现在（常与 since, for 连用）\n3. 表示经验经历（ever, never）",
      examples: JSON.stringify([
        { sentence: "The number has increased significantly since 2010.", analysis: "从过去持续到现在的变化趋势" },
        { sentence: "Over the past decade, technology has transformed our daily lives.", analysis: "强调过去到现在的累积影响" },
      ]),
      ieltsUsage: "Task 1 描述从过去到现在的趋势变化" },
    { categoryId: catMap["tenses"], name: "future", nameCn: "将来时态", sortOrder: 4, level: "core",
      explanation: "英语中有多种表达将来的方式：\n\n1. will + 动词原形：预测、意愿\n2. be going to + 动词原形：计划、预兆\n3. 现在进行时表示将来：已安排好的\n4. 一般现在时表示将来：按时刻表",
      examples: JSON.stringify([
        { sentence: "Experts predict that the population will reach 9 billion by 2050.", analysis: "will 表示对未来数据的预测" },
        { sentence: "The city is going to invest more in public transportation.", analysis: "be going to 表示计划中的行动" },
      ]),
      ieltsUsage: "Task 2 预测未来趋势和结果" },
    { categoryId: catMap["tenses"], name: "continuous", nameCn: "进行时态", sortOrder: 5, level: "core",
      explanation: "进行时态表示在某一时刻或时段正在进行的动作。\n\n现在进行时：is/am/are + doing（正在发生）\n过去进行时：was/were + doing（过去某时正在做）\nIELTS 写作中常用现在进行时描述当前趋势。",
      examples: JSON.stringify([
        { sentence: "The number of electric vehicles is increasing rapidly.", analysis: "现在进行时强调当前正在发生的趋势变化" },
        { sentence: "More people are choosing to work from home.", analysis: "描述当前正在发生的趋势" },
      ]),
      ieltsUsage: "Task 1 描述当前趋势变化" },

    // passive-voice
    { categoryId: catMap["passive-voice"], name: "basics", nameCn: "被动语态基础", sortOrder: 1, level: "core",
      explanation: "被动语态表示主语是动作的承受者，而不是执行者。\n\n结构：be + 过去分词（done）\n\nThe chart shows data.（主动）→ Data is shown in the chart.（被动）\n\n何时用被动：\n1. 动作执行者不重要或未知\n2. 想要强调动作的承受者\n3. 学术写作中使语气更客观",
      examples: JSON.stringify([
        { sentence: "The data was collected from over 1,000 participants.", analysis: "强调数据被收集，而非谁收集" },
        { sentence: "It can be argued that climate change is the greatest challenge of our time.", analysis: "学术写作常用 It can be argued that..." },
      ]),
      commonErrors: JSON.stringify([
        { error: "The experiment was conducted by scientist.", correction: "The experiment was conducted by scientists / a scientist.", note: "可数名词单数不能单独使用，需加冠词或变复数" },
      ]),
      ieltsUsage: "Task 1 流程图/地图描述；Task 2 学术论证" },
    { categoryId: catMap["passive-voice"], name: "tenses", nameCn: "被动语态时态变化", sortOrder: 2, level: "core",
      explanation: "被动语态可以通过 be 动词的时态变化来表达不同时间：\n\n- 一般现在被动：is/are done\n- 一般过去被动：was/were done\n- 现在完成被动：have/has been done\n- 情态动词被动：can/must/should be done",
      examples: JSON.stringify([
        { sentence: "Carbon emissions must be reduced to tackle climate change.", analysis: "情态动词被动，表达必要性" },
        { sentence: "The new law has been introduced to protect workers' rights.", analysis: "现在完成被动，强调对现在的影响" },
      ]),
      ieltsUsage: "Task 1 流程图描述；写作建议段" },
    { categoryId: catMap["passive-voice"], name: "ielts-task1", nameCn: "Task 1 被动应用", sortOrder: 3, level: "advanced",
      explanation: "Task 1 流程图中被动语态尤其重要，因为重点在过程而非执行者：\n\n流程图常用被动：\n- First, the materials are collected and sorted.\n- The water is then heated to 100°C.\n\n地图题常用被动：\n- A new road was built connecting the east and west areas.\n- The factory was converted into a residential area.",
      examples: JSON.stringify([
        { sentence: "First, the raw materials are collected from various sources.", analysis: "流程图第一步的客观描述" },
        { sentence: "The old railway station was demolished and replaced by a shopping mall.", analysis: "地图题描述建筑变化" },
      ]),
      ieltsUsage: "Task 1 流程图/地图题必备" },

    // clauses
    { categoryId: catMap["clauses"], name: "relative", nameCn: "定语从句", sortOrder: 1, level: "core",
      explanation: "定语从句用来修饰名词或代词，相当于一个形容词的作用。\n\n关系代词：\n- who/whom（人）\n- which（物/事）\n- that（人/物均可）\n- whose（所属关系）\n\n限定性 vs 非限定性：\n- 限定性：The students who study hard usually get good results.（去掉后句意不完整）\n- 非限定性：The policy, which was introduced in 2020, has been effective.（加逗号，去掉句意仍完整）",
      examples: JSON.stringify([
        { sentence: "Students who study abroad often develop greater independence.", analysis: "限定性定语从句" },
        { sentence: "The government, which has faced criticism, decided to revise the policy.", analysis: "非限定性定语从句" },
      ]),
      commonErrors: JSON.stringify([
        { error: "The people which live in this area are concerned.", correction: "The people who live in this area are concerned.", note: "指人用 who，不用 which" },
      ]),
      ieltsUsage: "Task 2 定义概念、描述群体特征" },
    { categoryId: catMap["clauses"], name: "adverbial", nameCn: "状语从句", sortOrder: 2, level: "core",
      explanation: "状语从句在句中作状语，用来修饰主句的动词或整个句子。\n\n常见类型：\n- 时间：when, while, as, after, before, until\n- 原因：because, since, as\n- 让步：although, even though, while\n- 目的：so that, in order that\n- 结果：so...that, such...that",
      examples: JSON.stringify([
        { sentence: "Although the initial cost is high, the long-term benefits are significant.", analysis: "让步状语从句" },
        { sentence: "Because the demand has increased, manufacturers have expanded production.", analysis: "原因状语从句" },
      ]),
      ieltsUsage: "Task 2 逻辑展开的核心工具" },
    { categoryId: catMap["clauses"], name: "noun", nameCn: "名词性从句", sortOrder: 3, level: "advanced",
      explanation: "名词性从句在句中充当名词的角色，可以做主语、宾语、表语或同位语。\n\n引导词：that, whether/if, wh- 疑问词\n\n四大功能：\n1. 主语从句：What matters most is the quality of education.\n2. 宾语从句：Many people believe that technology has changed our lives.\n3. 表语从句：The main reason is that young people prefer cities.\n4. 同位语从句：The fact that pollution is increasing cannot be ignored.",
      examples: JSON.stringify([
        { sentence: "What matters most is not the quantity but the quality of education.", analysis: "主语从句 + 表语从句" },
        { sentence: "Many people believe that the benefits of technology outweigh the drawbacks.", analysis: "宾语从句，Task 2 常用结构" },
      ]),
      ieltsUsage: "Task 2 表达观点、解释原因、强调事实" },

    // conditionals
    { categoryId: catMap["conditionals"], name: "first", nameCn: "第一条件句（真实将来）", sortOrder: 1, level: "core",
      explanation: "第一条件句表示将来很可能发生的情况。\n\n结构：If + 一般现在时, will/can/may + 动词原形\n\n意义：条件很可能是真实的，结果很可能发生。",
      examples: JSON.stringify([
        { sentence: "If the government invests more in education, literacy rates will improve.", analysis: "条件很可能实现，预测结果" },
        { sentence: "If we continue to emit greenhouse gases, global temperatures will rise further.", analysis: "基于现实的合理预测" },
      ]),
      ieltsUsage: "Task 2 分析因果关系的核心句型" },
    { categoryId: catMap["conditionals"], name: "second", nameCn: "第二条件句（虚拟现在）", sortOrder: 2, level: "core",
      explanation: "第二条件句表示与现在事实相反或不太可能实现的假设。\n\n结构：If + 一般过去时, would/could/might + 动词原形\n\n注意：be 动词用 were（不论主语人称）",
      examples: JSON.stringify([
        { sentence: "If all countries adopted renewable energy, climate change would slow down.", analysis: "与现在事实相反的假设" },
        { sentence: "If I were the minister, I would allocate more funds to education.", analysis: "假设与现在事实不同" },
      ]),
      ieltsUsage: "Task 2 提出建议和假设论证" },
    { categoryId: catMap["conditionals"], name: "third", nameCn: "第三条件句（虚拟过去）", sortOrder: 3, level: "advanced",
      explanation: "第三条件句表示与过去事实相反的假设（无法改变）。\n\n结构：If + 过去完成时, would/could/might + have + 过去分词\n\n用来表达对过去的遗憾或对过去事件的反思。",
      examples: JSON.stringify([
        { sentence: "If the government had taken earlier action, the crisis could have been avoided.", analysis: "对过去未采取行动的反思" },
      ]),
      ieltsUsage: "Task 2 对历史政策/事件的反思和假设分析" },

    // subjunctive
    { categoryId: catMap["subjunctive"], name: "wish", nameCn: "wish 虚拟用法", sortOrder: 1, level: "core",
      explanation: "wish 后的从句要用虚拟语气，表示与事实相反的愿望。\n\n三种时间：\n1. 与现在相反：wish + 一般过去时（I wish I were better...）\n2. 与过去相反：wish + 过去完成时（I wish I had studied harder.）\n3. 与将来相反：wish + would/could + 动词原形",
      examples: JSON.stringify([
        { sentence: "I wish more attention were paid to environmental issues.", analysis: "与现在事实相反（关注不够）" },
        { sentence: "Many people wish they had learned a second language earlier.", analysis: "对过去错失机会的遗憾" },
      ]),
      ieltsUsage: "Task 2 表达对现状或过去的不满/愿望" },
    { categoryId: catMap["subjunctive"], name: "alternatives", nameCn: "it's time / would rather", sortOrder: 2, level: "advanced",
      explanation: "除了 wish，还有一些结构也使用虚拟语气：\n\nIt's (high) time + 一般过去时：表示该做某事了\n- It's time the government took action.\n\nwould rather + 一般过去时：宁愿某人做某事\n- I would rather young people focused on meaningful careers.\n\nas if/though + 一般过去时（或过去完成时）：好像",
      examples: JSON.stringify([
        { sentence: "It is high time governments around the world took climate change seriously.", analysis: "强烈建议应该采取行动" },
        { sentence: "Many people would rather their children pursued stable careers.", analysis: "表达偏好和希望" },
      ]),
      ieltsUsage: "Task 2 表达建议和偏好" },

    // comparison
    { categoryId: catMap["comparison"], name: "basics", nameCn: "比较级与最高级", sortOrder: 1, level: "foundation",
      explanation: "比较级：用于两者之间的比较\n- 单音节加 er/est：high → higher → highest\n- 多音节加 more/most：significant → more significant → most significant\n\n基本句型：\n- A is + 比较级 + than B\n- A is the + 最高级 + of/in...\n\n修饰比较级的副词：much, far, significantly, slightly, a little",
      examples: JSON.stringify([
        { sentence: "The number of students in urban areas is significantly higher than in rural areas.", analysis: "比较级 + 修饰副词" },
        { sentence: "Education is one of the most important factors in economic development.", analysis: "最高级 + one of 结构" },
      ]),
      ieltsUsage: "Task 1 数据对比核心结构" },
    { categoryId: catMap["comparison"], name: "multiples", nameCn: "倍数表达", sortOrder: 2, level: "core",
      explanation: "倍数表达是 Task 1 数据描述的重要工具：\n\n常见结构：\n1. A is twice/three times as + 形容词原级 + as B\n2. A is twice/three times the + 名词 + of B\n3. A doubled/tripled between X and Y\n4. There was a twofold/threefold increase in...",
      examples: JSON.stringify([
        { sentence: "The cost of living in cities is nearly twice as high as in rural areas.", analysis: "as...as 结构的倍数比较" },
        { sentence: "The number of Internet users has more than doubled since 2010.", analysis: "动词表示倍数增长" },
      ]),
      ieltsUsage: "Task 1 倍数关系描述" },
    { categoryId: catMap["comparison"], name: "ielts-task1", nameCn: "Task 1 比较句式", sortOrder: 3, level: "core",
      explanation: "Task 1 图表作文中比较无处不在：\n\n趋势对比：\n- While A increased, B declined.\n- A showed a steady rise, whereas B fluctuated.\n\n占比对比：\n- A accounted for the largest proportion of..., followed by B.\n\n连接词：while, whereas, in contrast, compared to, similarly, likewise",
      examples: JSON.stringify([
        { sentence: "While the percentage of people using public transport decreased, car usage increased significantly.", analysis: "while 引导的对比结构" },
        { sentence: "The highest proportion of the budget was spent on education, followed by healthcare.", analysis: "占比排序描述" },
      ]),
      ieltsUsage: "Task 1 必备对比句型" },

    // basic-sentences
    { categoryId: catMap["basic-sentences"], name: "five-patterns", nameCn: "五种基本句型", sortOrder: 1, level: "foundation",
      explanation: "英语的所有句子都可以归为以下五种基本句型：\n\n1. S + V（主谓）: Prices rose.\n2. S + V + O（主谓宾）: The chart shows data.\n3. S + V + C（主系表）: The trend is significant.\n4. S + V + O + O（主谓双宾）: Education gives people opportunities.\n5. S + V + O + C（主谓宾补）: Technology makes life convenient.",
      examples: JSON.stringify([
        { sentence: "The unemployment rate fell steadily over the period.", analysis: "S + V 句型，描述趋势" },
        { sentence: "Education provides individuals better job opportunities.", analysis: "S + V + O + O 双宾结构" },
      ]),
      ieltsUsage: "写作句法的地基" },
    { categoryId: catMap["basic-sentences"], name: "components", nameCn: "句子成分分析", sortOrder: 2, level: "foundation",
      explanation: "理解句子成分是写出正确句子的前提：\n\n八大成分：主语、谓语、宾语、表语、定语、状语、同位语、插入语\n\n例：Significantly, the number of students (主语) increased (谓语) dramatically (状语) last year (状语).",
      examples: JSON.stringify([
        { sentence: "The number of international students, which has grown rapidly, is now a key topic.", analysis: "主语（含定语从句），系动词，表语" },
      ]),
      ieltsUsage: "帮助理解复杂句和避免语法错误" },

    // sentence-expansion
    { categoryId: catMap["sentence-expansion"], name: "compound", nameCn: "并列句", sortOrder: 1, level: "core",
      explanation: "并列句通过并列连词将两个或多个简单句连接成复合句。\n\n常用并列连词：\n- and（并列）\n- but / yet（转折）\n- or（选择）\n- so（因果）\n- for（原因）\n\n此外还有：both...and, not only...but also, either...or",
      examples: JSON.stringify([
        { sentence: "The cost of living is high, but the job opportunities are abundant.", analysis: "but 表示转折" },
        { sentence: "Not only did the population increase, but also the average age rose.", analysis: "not only...but also 的倒装形式" },
      ]),
      ieltsUsage: "Task 2 连接论点，展示逻辑关系" },
    { categoryId: catMap["sentence-expansion"], name: "non-finite", nameCn: "非谓语结构", sortOrder: 2, level: "advanced",
      explanation: "非谓语动词是写作高级感的标志：\n\n1. 不定式（to do）：作目的、定语\n   - The government took steps to reduce pollution.\n\n2. 动名词（doing）：作主语、宾语\n   - Investing in education is crucial.\n\n3. 分词（doing / done）：主动/被动\n   - Faced with challenges, the company restructured.",
      examples: JSON.stringify([
        { sentence: "To address the housing shortage, the government has launched several initiatives.", analysis: "不定式表目的，简洁有力" },
        { sentence: "Investing in renewable energy is essential for a sustainable future.", analysis: "动名词作主语，学术感强" },
      ]),
      ieltsUsage: "Task 2 提升句子复杂度和写作分数" },
  ];

  for (const p of grammarPoints) {
    const pointId = p.categoryId + "-" + p.name;
    await prisma.grammarPoint.upsert({
      where: { id: pointId },
      update: p,
      create: { ...p, id: pointId },
    });
  }

  // ── VOCABULARY WORDS ──
  console.log("=== Seeding vocabulary words ===");

  const words = [
    // education
    { word: "curriculum", phonetic: "/kəˈrɪkjələm/", partOfSpeech: "noun", definition: "The subjects comprising a course of study", definitionCn: "课程", topic: "education", level: "core",
      exampleSentence: "The school revised its curriculum to include more practical skills.",
      collocations: JSON.stringify(["revise the curriculum", "national curriculum", "curriculum design"]),
      synonyms: JSON.stringify(["syllabus", "course", "program"]) },
    { word: "pedagogy", phonetic: "/ˈpedəɡɒdʒi/", partOfSpeech: "noun", definition: "The method and practice of teaching", definitionCn: "教学法", topic: "education", level: "advanced",
      exampleSentence: "Modern pedagogy emphasizes student-centered learning.",
      synonyms: JSON.stringify(["teaching method", "education"]), root: "ped" },
    { word: "literacy", phonetic: "/ˈlɪtərəsi/", partOfSpeech: "noun", definition: "The ability to read and write", definitionCn: "读写能力", topic: "education", level: "core",
      exampleSentence: "Improving literacy rates is a key goal for many developing countries.",
      collocations: JSON.stringify(["literacy rate", "improve literacy"]), synonyms: JSON.stringify(["reading ability"]) },
    { word: "academic", phonetic: "/ˌækəˈdemɪk/", partOfSpeech: "adjective", definition: "Relating to education and scholarship", definitionCn: "学术的", topic: "education", level: "foundation",
      exampleSentence: "Academic performance has improved over the past decade.",
      collocations: JSON.stringify(["academic performance", "academic research"]), synonyms: JSON.stringify(["scholarly", "educational"]) },
    { word: "vocational", phonetic: "/vəʊˈkeɪʃənl/", partOfSpeech: "adjective", definition: "Relating to skills needed for a particular job", definitionCn: "职业的", topic: "education", level: "core",
      exampleSentence: "Vocational training provides practical skills for employment.",
      collocations: JSON.stringify(["vocational training", "vocational education"]), synonyms: JSON.stringify(["professional", "career"]) },
    { word: "tuition", phonetic: "/tjuˈɪʃn/", partOfSpeech: "noun", definition: "Teaching or instruction; a fee for teaching", definitionCn: "学费；教学", topic: "education", level: "core",
      exampleSentence: "The rising cost of tuition has become a burden for many families.",
      collocations: JSON.stringify(["tuition fees", "tuition costs"]), synonyms: JSON.stringify(["instruction", "fees"]) },
    { word: "compulsory", phonetic: "/kəmˈpʌlsəri/", partOfSpeech: "adjective", definition: "Required by law or a rule", definitionCn: "强制性的", topic: "education", level: "core",
      exampleSentence: "Education is compulsory for children aged 5 to 16.",
      collocations: JSON.stringify(["compulsory education", "compulsory attendance"]), synonyms: JSON.stringify(["mandatory", "obligatory"]) },
    { word: "enrolment", phonetic: "/ɪnˈrəʊlmənt/", partOfSpeech: "noun", definition: "The action of enrolling in a course", definitionCn: "入学；注册", topic: "education", level: "core",
      exampleSentence: "University enrolment has increased by 15% over the past decade.",
      collocations: JSON.stringify(["university enrolment", "enrolment rate"]), synonyms: JSON.stringify(["registration", "admission"]) },

    // environment
    { word: "sustainable", phonetic: "/səˈsteɪnəbl/", partOfSpeech: "adjective", definition: "Able to be maintained without depleting resources", definitionCn: "可持续的", topic: "environment", level: "core",
      exampleSentence: "Sustainable development balances economic growth with environmental protection.",
      collocations: JSON.stringify(["sustainable development", "sustainable energy"]), synonyms: JSON.stringify(["renewable", "green"]), root: "tain" },
    { word: "emission", phonetic: "/ɪˈmɪʃn/", partOfSpeech: "noun", definition: "The production and discharge of gas or radiation", definitionCn: "排放", topic: "environment", level: "core",
      exampleSentence: "Carbon emissions have reached alarming levels worldwide.",
      collocations: JSON.stringify(["carbon emissions", "reduce emissions"]), synonyms: JSON.stringify(["discharge", "pollution"]), root: "miss" },
    { word: "biodiversity", phonetic: "/ˌbaɪəʊdaɪˈvɜːsəti/", partOfSpeech: "noun", definition: "The variety of plant and animal life", definitionCn: "生物多样性", topic: "environment", level: "core",
      exampleSentence: "Deforestation threatens biodiversity in tropical regions.",
      collocations: JSON.stringify(["protect biodiversity", "loss of biodiversity"]), prefix: "bio-" },
    { word: "conservation", phonetic: "/ˌkɒnsəˈveɪʃn/", partOfSpeech: "noun", definition: "The protection of the natural environment", definitionCn: "保护", topic: "environment", level: "core",
      exampleSentence: "Wildlife conservation efforts have helped protect endangered species.",
      collocations: JSON.stringify(["wildlife conservation", "conservation efforts"]), synonyms: JSON.stringify(["preservation", "protection"]), root: "serv" },
    { word: "deforestation", phonetic: "/diːˌfɒrɪˈsteɪʃn/", partOfSpeech: "noun", definition: "The clearing of forests on a large scale", definitionCn: "砍伐森林", topic: "environment", level: "core",
      exampleSentence: "Deforestation in the Amazon rainforest has accelerated in recent years.",
      collocations: JSON.stringify(["tropical deforestation", "prevent deforestation"]), prefix: "de-" },
    { word: "renewable", phonetic: "/rɪˈnjuːəbl/", partOfSpeech: "adjective", definition: "Naturally replenished; not depleted when used", definitionCn: "可再生的", topic: "environment", level: "core",
      exampleSentence: "Governments should invest more in renewable energy sources.",
      collocations: JSON.stringify(["renewable energy", "renewable resources"]), synonyms: JSON.stringify(["sustainable", "clean"]), prefix: "re-" },

    // technology
    { word: "innovation", phonetic: "/ˌɪnəˈveɪʃn/", partOfSpeech: "noun", definition: "A new method, idea, or product", definitionCn: "创新", topic: "technology", level: "core",
      exampleSentence: "Technological innovation has transformed the way we communicate.",
      collocations: JSON.stringify(["technological innovation", "drive innovation"]), synonyms: JSON.stringify(["invention", "breakthrough"]) },
    { word: "automation", phonetic: "/ˌɔːtəˈmeɪʃn/", partOfSpeech: "noun", definition: "The use of automatic equipment in manufacturing", definitionCn: "自动化", topic: "technology", level: "core",
      exampleSentence: "Automation is replacing many manual jobs in factories.",
      collocations: JSON.stringify(["industrial automation", "automation technology"]), synonyms: JSON.stringify(["mechanization", "computerization"]) },
    { word: "artificial", phonetic: "/ˌɑːtɪˈfɪʃl/", partOfSpeech: "adjective", definition: "Made or produced by humans rather than natural", definitionCn: "人造的", topic: "technology", level: "core",
      exampleSentence: "Artificial intelligence is revolutionizing healthcare diagnostics.",
      collocations: JSON.stringify(["artificial intelligence", "artificial organs"]), synonyms: JSON.stringify(["synthetic", "man-made"]) },
    { word: "disruptive", phonetic: "/dɪsˈrʌptɪv/", partOfSpeech: "adjective", definition: "Causing disruption, especially to traditional industries", definitionCn: "颠覆性的", topic: "technology", level: "advanced",
      exampleSentence: "Disruptive technologies like AI are reshaping entire industries.",
      collocations: JSON.stringify(["disruptive technology", "disruptive innovation"]), root: "rupt" },
    { word: "digital", phonetic: "/ˈdɪdʒɪtl/", partOfSpeech: "adjective", definition: "Relating to technology using computer-readable data", definitionCn: "数字的", topic: "technology", level: "foundation",
      exampleSentence: "The digital revolution has changed almost every aspect of our lives.",
      collocations: JSON.stringify(["digital age", "digital transformation"]), synonyms: JSON.stringify(["electronic", "online"]) },
    { word: "algorithm", phonetic: "/ˈælɡərɪðəm/", partOfSpeech: "noun", definition: "A process or set of rules for calculations", definitionCn: "算法", topic: "technology", level: "advanced",
      exampleSentence: "Social media algorithms determine what content users see.",
      collocations: JSON.stringify(["search algorithm", "recommendation algorithm"]) },

    // health
    { word: "obesity", phonetic: "/əʊˈbiːsəti/", partOfSpeech: "noun", definition: "The condition of being grossly overweight", definitionCn: "肥胖", topic: "health", level: "core",
      exampleSentence: "Childhood obesity has become a serious public health concern.",
      collocations: JSON.stringify(["childhood obesity", "obesity rates"]), synonyms: JSON.stringify(["overweight"]) },
    { word: "nutrition", phonetic: "/njuˈtrɪʃn/", partOfSpeech: "noun", definition: "The process of providing or obtaining necessary food", definitionCn: "营养", topic: "health", level: "core",
      exampleSentence: "Good nutrition is essential for both physical and mental development.",
      collocations: JSON.stringify(["good nutrition", "nutrition education"]), synonyms: JSON.stringify(["nourishment", "diet"]) },
    { word: "epidemic", phonetic: "/ˌepɪˈdemɪk/", partOfSpeech: "noun", definition: "A widespread occurrence of a disease", definitionCn: "流行病", topic: "health", level: "core",
      exampleSentence: "The government implemented measures to control the epidemic.",
      collocations: JSON.stringify(["health epidemic", "control the epidemic"]), synonyms: JSON.stringify(["outbreak", "pandemic"]) },
    { word: "wellbeing", phonetic: "/ˈwelbiːɪŋ/", partOfSpeech: "noun", definition: "The state of being comfortable, healthy, or happy", definitionCn: "福祉", topic: "health", level: "core",
      exampleSentence: "Mental wellbeing is just as important as physical health.",
      collocations: JSON.stringify(["mental wellbeing", "physical wellbeing"]), synonyms: JSON.stringify(["health", "wellness"]) },
    { word: "sedentary", phonetic: "/ˈsedntri/", partOfSpeech: "adjective", definition: "Tending to spend much time seated; inactive", definitionCn: "久坐的", topic: "health", level: "core",
      exampleSentence: "Sedentary lifestyles have contributed to rising obesity rates.",
      collocations: JSON.stringify(["sedentary lifestyle", "sedentary behavior"]), synonyms: JSON.stringify(["inactive"]) },

    // society
    { word: "urbanization", phonetic: "/ˌɜːbənaɪˈzeɪʃn/", partOfSpeech: "noun", definition: "The process of making an area more urban", definitionCn: "城市化", topic: "society", level: "core",
      exampleSentence: "Rapid urbanization has led to housing shortages in many cities.",
      collocations: JSON.stringify(["rapid urbanization", "urbanization process"]) },
    { word: "migration", phonetic: "/maɪˈɡreɪʃn/", partOfSpeech: "noun", definition: "Movement of people from one place to another", definitionCn: "迁移", topic: "society", level: "core",
      exampleSentence: "Rural-to-urban migration is a major demographic trend.",
      collocations: JSON.stringify(["rural-to-urban migration", "mass migration"]), root: "migr" },
    { word: "inequality", phonetic: "/ˌɪnɪˈkwɒləti/", partOfSpeech: "noun", definition: "Lack of equality; disparity", definitionCn: "不平等", topic: "society", level: "core",
      exampleSentence: "Income inequality has widened significantly over recent decades.",
      collocations: JSON.stringify(["income inequality", "social inequality"]), synonyms: JSON.stringify(["disparity", "imbalance"]) },
    { word: "aging", phonetic: "/ˈeɪdʒɪŋ/", partOfSpeech: "adjective", definition: "Becoming older", definitionCn: "老龄化的", topic: "society", level: "core",
      exampleSentence: "The aging population poses challenges for healthcare systems.",
      collocations: JSON.stringify(["aging population", "aging society"]) },
    { word: "globalization", phonetic: "/ˌɡləʊbəlaɪˈzeɪʃn/", partOfSpeech: "noun", definition: "Increasing interconnection between countries", definitionCn: "全球化", topic: "society", level: "core",
      exampleSentence: "Globalization has brought both economic opportunities and cultural challenges.",
      collocations: JSON.stringify(["economic globalization", "globalization process"]) },
    { word: "demographic", phonetic: "/ˌdeməˈɡræfɪk/", partOfSpeech: "adjective", definition: "Relating to populations", definitionCn: "人口的", topic: "society", level: "core",
      exampleSentence: "Demographic changes are reshaping the labor market.",
      collocations: JSON.stringify(["demographic change", "demographic trend"]) },

    // economy
    { word: "inflation", phonetic: "/ɪnˈfleɪʃn/", partOfSpeech: "noun", definition: "A general increase in prices", definitionCn: "通货膨胀", topic: "economy", level: "core",
      exampleSentence: "Rising inflation has eroded purchasing power for ordinary citizens.",
      collocations: JSON.stringify(["rising inflation", "inflation rate"]), root: "flat" },
    { word: "unemployment", phonetic: "/ˌʌnɪmˈplɔɪmənt/", partOfSpeech: "noun", definition: "The state of being without paid work", definitionCn: "失业", topic: "economy", level: "core",
      exampleSentence: "Youth unemployment remains a pressing issue in many countries.",
      collocations: JSON.stringify(["youth unemployment", "unemployment rate"]) },
    { word: "recession", phonetic: "/rɪˈseʃn/", partOfSpeech: "noun", definition: "A period of temporary economic decline", definitionCn: "经济衰退", topic: "economy", level: "core",
      exampleSentence: "The global recession of 2008 had a lasting impact on employment.",
      collocations: JSON.stringify(["economic recession", "global recession"]), synonyms: JSON.stringify(["downturn", "slump"]), root: "cess" },
    { word: "investment", phonetic: "/ɪnˈvestmənt/", partOfSpeech: "noun", definition: "The act of investing money for profit", definitionCn: "投资", topic: "economy", level: "foundation",
      exampleSentence: "Foreign direct investment has boosted the country's economy.",
      collocations: JSON.stringify(["foreign investment", "attract investment"]), synonyms: JSON.stringify(["capital", "funding"]) },
    { word: "productivity", phonetic: "/ˌprɒdʌkˈtɪvəti/", partOfSpeech: "noun", definition: "The efficiency of production", definitionCn: "生产率", topic: "economy", level: "core",
      exampleSentence: "Technological advances have significantly improved workplace productivity.",
      collocations: JSON.stringify(["workplace productivity", "increase productivity"]), root: "duct" },

    // culture
    { word: "heritage", phonetic: "/ˈherɪtɪdʒ/", partOfSpeech: "noun", definition: "Valued objects passed down from previous generations", definitionCn: "遗产", topic: "culture", level: "core",
      exampleSentence: "Preserving cultural heritage is vital for national identity.",
      collocations: JSON.stringify(["cultural heritage", "preserve heritage"]), synonyms: JSON.stringify(["legacy", "tradition"]) },
    { word: "diversity", phonetic: "/daɪˈvɜːsəti/", partOfSpeech: "noun", definition: "The state of being varied or diverse", definitionCn: "多样性", topic: "culture", level: "core",
      exampleSentence: "Cultural diversity enriches societies in many ways.",
      collocations: JSON.stringify(["cultural diversity", "ethnic diversity"]), synonyms: JSON.stringify(["variety", "multiculturalism"]) },
    { word: "tradition", phonetic: "/trəˈdɪʃn/", partOfSpeech: "noun", definition: "A long-established custom or belief", definitionCn: "传统", topic: "culture", level: "foundation",
      exampleSentence: "Many traditions have been passed down through generations.",
      collocations: JSON.stringify(["local tradition", "cultural tradition"]), synonyms: JSON.stringify(["custom", "convention"]) },
    { word: "multicultural", phonetic: "/ˌmʌltiˈkʌltʃərəl/", partOfSpeech: "adjective", definition: "Relating to several cultural or ethnic groups", definitionCn: "多元文化的", topic: "culture", level: "core",
      exampleSentence: "Multicultural societies benefit from diverse perspectives.",
      collocations: JSON.stringify(["multicultural society", "multicultural environment"]), prefix: "multi-" },
    { word: "assimilate", phonetic: "/əˈsɪməleɪt/", partOfSpeech: "verb", definition: "To absorb and integrate into a wider society", definitionCn: "同化", topic: "culture", level: "advanced",
      exampleSentence: "Immigrants often face pressure to assimilate into the dominant culture.",
      collocations: JSON.stringify(["assimilate into", "cultural assimilation"]), root: "simil" },

    // government
    { word: "legislation", phonetic: "/ˌledʒɪsˈleɪʃn/", partOfSpeech: "noun", definition: "Laws, considered collectively", definitionCn: "立法", topic: "government", level: "core",
      exampleSentence: "New legislation was introduced to protect workers' rights.",
      collocations: JSON.stringify(["introduce legislation", "new legislation"]), synonyms: JSON.stringify(["law", "regulation"]) },
    { word: "policy", phonetic: "/ˈpɒləsi/", partOfSpeech: "noun", definition: "A course of action adopted by a government", definitionCn: "政策", topic: "government", level: "foundation",
      exampleSentence: "The government's education policy has been widely debated.",
      collocations: JSON.stringify(["government policy", "economic policy"]), synonyms: JSON.stringify(["strategy", "plan"]) },
    { word: "regulation", phonetic: "/ˌreɡjuˈleɪʃn/", partOfSpeech: "noun", definition: "An official rule made by an authority", definitionCn: "法规", topic: "government", level: "core",
      exampleSentence: "Stricter regulations on pollution have been implemented.",
      collocations: JSON.stringify(["stricter regulations", "government regulation"]), synonyms: JSON.stringify(["rule", "law"]) },
    { word: "infrastructure", phonetic: "/ˈɪnfrəstrʌktʃə(r)/", partOfSpeech: "noun", definition: "Basic physical structures needed for a society to function", definitionCn: "基础设施", topic: "government", level: "core",
      exampleSentence: "The government has invested heavily in transport infrastructure.",
      collocations: JSON.stringify(["transport infrastructure", "public infrastructure"]), root: "struct" },
    { word: "taxation", phonetic: "/tækˈseɪʃn/", partOfSpeech: "noun", definition: "The system of imposing taxes", definitionCn: "税收", topic: "government", level: "core",
      exampleSentence: "Progressive taxation can help reduce income inequality.",
      collocations: JSON.stringify(["progressive taxation", "taxation system"]) },

    // crime
    { word: "rehabilitation", phonetic: "/ˌriːəˌbɪlɪˈteɪʃn/", partOfSpeech: "noun", definition: "The restoration of someone to a useful place in society", definitionCn: "改造", topic: "crime", level: "advanced",
      exampleSentence: "Prison rehabilitation programs reduce reoffending rates.",
      collocations: JSON.stringify(["rehabilitation program", "criminal rehabilitation"]) },
    { word: "deterrent", phonetic: "/dɪˈterənt/", partOfSpeech: "noun", definition: "Something that discourages an action", definitionCn: "威慑", topic: "crime", level: "core",
      exampleSentence: "Harsh sentences act as a deterrent against serious crimes.",
      collocations: JSON.stringify(["act as a deterrent", "effective deterrent"]) },
    { word: "delinquency", phonetic: "/dɪˈlɪŋkwənsi/", partOfSpeech: "noun", definition: "Minor crime, especially among young people", definitionCn: "青少年犯罪", topic: "crime", level: "core",
      exampleSentence: "Youth delinquency is often linked to social and economic factors.",
      collocations: JSON.stringify(["youth delinquency", "juvenile delinquency"]) },
    { word: "offender", phonetic: "/əˈfendə(r)/", partOfSpeech: "noun", definition: "A person who commits a crime", definitionCn: "罪犯", topic: "crime", level: "core",
      exampleSentence: "Rehabilitation programs help offenders reintegrate into society.",
      collocations: JSON.stringify(["repeat offender", "first-time offender"]), synonyms: JSON.stringify(["criminal", "lawbreaker"]) },
    { word: "enforcement", phonetic: "/ɪnˈfɔːsmənt/", partOfSpeech: "noun", definition: "The act of ensuring compliance with laws", definitionCn: "执法", topic: "crime", level: "core",
      exampleSentence: "Stricter law enforcement has led to a reduction in crime rates.",
      collocations: JSON.stringify(["law enforcement", "enforcement agency"]) },

    // media
    { word: "censorship", phonetic: "/ˈsensəʃɪp/", partOfSpeech: "noun", definition: "The suppression of speech or public communication", definitionCn: "审查", topic: "media", level: "core",
      exampleSentence: "Internet censorship remains a controversial issue globally.",
      collocations: JSON.stringify(["media censorship", "government censorship"]) },
    { word: "journalism", phonetic: "/ˈdʒɜːnəlɪzəm/", partOfSpeech: "noun", definition: "The activity of gathering and reporting news", definitionCn: "新闻业", topic: "media", level: "core",
      exampleSentence: "Investigative journalism plays a vital role in holding power to account.",
      collocations: JSON.stringify(["investigative journalism", "journalism ethics"]) },
    { word: "bias", phonetic: "/ˈbaɪəs/", partOfSpeech: "noun", definition: "Prejudice in favor of or against one thing", definitionCn: "偏见", topic: "media", level: "core",
      exampleSentence: "Media bias can influence public opinion in significant ways.",
      collocations: JSON.stringify(["media bias", "political bias"]), synonyms: JSON.stringify(["prejudice", "partiality"]) },
    { word: "misinformation", phonetic: "/ˌmɪsɪnfəˈmeɪʃn/", partOfSpeech: "noun", definition: "False information spread intentionally", definitionCn: "虚假信息", topic: "media", level: "core",
      exampleSentence: "Social media platforms have been criticized for allowing misinformation to spread.",
      collocations: JSON.stringify(["combat misinformation", "spread misinformation"]) },
    { word: "sensationalism", phonetic: "/senˈseɪʃənəlɪzəm/", partOfSpeech: "noun", definition: "The use of exciting stories to attract attention", definitionCn: "耸人听闻", topic: "media", level: "advanced",
      exampleSentence: "Media sensationalism often distorts the public's understanding of issues.",
      collocations: JSON.stringify(["media sensationalism"]) },

    // general
    { word: "analyze", phonetic: "/ˈænəlaɪz/", partOfSpeech: "verb", definition: "To examine something in detail", definitionCn: "分析", topic: "general", level: "core",
      exampleSentence: "Researchers analyzed the data from over 1,000 participants.",
      collocations: JSON.stringify(["analyze data", "analyze results"]), synonyms: JSON.stringify(["examine", "study"]) },
    { word: "significant", phonetic: "/sɪɡˈnɪfɪkənt/", partOfSpeech: "adjective", definition: "Important or large enough to be noticed", definitionCn: "显著的", topic: "general", level: "foundation",
      exampleSentence: "There was a significant improvement in test scores.",
      collocations: JSON.stringify(["significant increase", "significant impact"]), synonyms: JSON.stringify(["notable", "substantial"]) },
    { word: "consequently", phonetic: "/ˈkɒnsɪkwəntli/", partOfSpeech: "adverb", definition: "As a result; therefore", definitionCn: "因此", topic: "general", level: "core",
      exampleSentence: "Demand decreased; consequently, prices fell.",
      synonyms: JSON.stringify(["therefore", "thus"]), root: "sequ" },
    { word: "phenomenon", phonetic: "/fəˈnɒmɪnən/", partOfSpeech: "noun", definition: "A fact or event that can be observed", definitionCn: "现象", topic: "general", level: "core",
      exampleSentence: "Urbanization is a global phenomenon affecting millions.",
      collocations: JSON.stringify(["global phenomenon", "social phenomenon"]) },
    { word: "comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", partOfSpeech: "adjective", definition: "Including all elements; thorough", definitionCn: "全面的", topic: "general", level: "core",
      exampleSentence: "The government announced a comprehensive review of the education system.",
      collocations: JSON.stringify(["comprehensive review", "comprehensive approach"]), synonyms: JSON.stringify(["thorough", "extensive"]) },
    { word: "inevitable", phonetic: "/ɪnˈevɪtəbl/", partOfSpeech: "adjective", definition: "Certain to happen; unavoidable", definitionCn: "不可避免的", topic: "general", level: "core",
      exampleSentence: "Technological change is inevitable in modern society.",
      synonyms: JSON.stringify(["unavoidable", "certain"]) },
  ];

  for (const w of words) {
    const wordId = w.word + "-" + w.topic;
    await prisma.vocabularyWord.upsert({
      where: { id: wordId },
      update: w,
      create: { ...w, id: wordId },
    });
  }

  // Update topic word counts
  for (const t of topicDefs) {
    const count = words.filter((w) => w.topic === t.name).length;
    await prisma.vocabularyTopic.update({ where: { name: t.name }, data: { wordCount: count } });
  }


  // Seeding grammar exercises
  console.log("=== Seeding grammar exercises ===");
  const presentSimple2 = await prisma.grammarPoint.findFirst({ where: { name: "present-simple" } });
  const pastSimple2 = await prisma.grammarPoint.findFirst({ where: { name: "past-simple" } });
  const pp2 = await prisma.grammarPoint.findFirst({ where: { name: "present-perfect" } });
  const clauses2 = await prisma.grammarPoint.findFirst({ where: { name: "relative" } });
  const cond2 = await prisma.grammarPoint.findFirst({ where: { name: "first" } });
  const pass2 = await prisma.grammarPoint.findFirst({ where: { name: "basics" } });

  const exercises = [
    { type: "grammar", section: 0, questionText: "The graph ___ the number of students from 2000 to 2020.", options: JSON.stringify(["show","shows","showed","has shown"]), answer: "shows", explanation: "?????????????????????????????s?" },
    { type: "grammar", section: 0, questionText: "In 2010, the unemployment rate ___ dramatically to 8%.", options: JSON.stringify(["rise","rises","rose","risen"]), answer: "rose", explanation: "?????????????????????rise?????rose?" },
    { type: "grammar", section: 0, questionText: "The population of the city ___ by 20% since 2015.", options: JSON.stringify(["increased","has increased","was increasing","had increased"]), answer: "has increased", explanation: "?2015?????????????????" },
    { type: "grammar", section: 0, questionText: "___ the initial cost is high, the long-term benefits are significant.", options: JSON.stringify(["Because","Although","Since","If"]), answer: "Although", explanation: "????????????????????" },
    { type: "grammar", section: 0, questionText: "If the government ___ more in education, literacy rates will improve.", options: JSON.stringify(["invests","invested","will invest","would invest"]), answer: "invests", explanation: "??????If + ?????, will + ?????" },
    { type: "grammar", section: 0, questionText: "Carbon emissions must ___ to tackle climate change.", options: JSON.stringify(["reduce","reducing","be reduced","have reduced"]), answer: "be reduced", explanation: "?????????must + be + ?????" },
    { type: "grammar", section: 0, questionText: "The number of students in urban areas is ___ higher than in rural areas.", options: JSON.stringify(["more","much","most","very"]), answer: "much", explanation: "much???????higher???????" },
    { type: "grammar", section: 0, questionText: "Many people believe ___ technology has improved our quality of life.", options: JSON.stringify(["what","which","that","when"]), answer: "that", explanation: "that???????Task 2??????????" },
  ];
  for (const ex of exercises) {
    const eid = "grammar-" + ex.questionText.substring(0, 25);
    await prisma.question.upsert({
      where: { id: eid },
      update: ex,
      create: { ...ex, id: eid },
    });
  }

  // Summary
  console.log("=== Seed Complete! ===");
  const totalWords = await prisma.vocabularyWord.count();
  const totalGrammarPoints = await prisma.grammarPoint.count();
  console.log(`Topics: ${topicDefs.length}`);
  console.log(`Grammar points: ${totalGrammarPoints}`);
  console.log(`Vocabulary words: ${totalWords}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
