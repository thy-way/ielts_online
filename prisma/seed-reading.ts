import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding reading passages ===");

  const p0 = await prisma.readingPassage.create({
    data: { title: "Renewable Energy: Powering the Future", passage: "Renewable energy sources, such as solar, wind, and hydroelectric power, have become increasingly important in the fight against climate change. Unlike fossil fuels, which release harmful greenhouse gases when burned, renewable energy produces little to no emissions. Many countries have set ambitious targets for renewable energy adoption. For example, Denmark aims to be completely free of fossil fuels by 2050. Germany has invested heavily in solar power, while China leads the world in wind energy capacity. However, the transition to renewable energy is not without challenges. Energy storage remains a significant issue, as solar and wind power are intermittent. Batteries and other storage technologies are improving but still expensive. Despite these challenges,", difficulty: "easy", sortOrder: 0, wordCount: 112 },
  });
  console.log("  [1/6] Renewable Energy: Powering the Future");
  await prisma.question.create({
    data: { id: "reading-0-0", type: "reading", section: 1, questionText: "Renewable energy produces no harmful emissions.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "reading-0-1", type: "reading", section: 1, questionText: "Denmark plans to eliminate fossil fuel use by 2050.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "reading-0-2", type: "reading", section: 1, questionText: "Germany has the highest number of wind turbines in the world.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "Not Given", readingPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "reading-0-3", type: "reading", section: 1, questionText: "What is mentioned as a challenge of renewable energy?", options: JSON.stringify(["High cost of solar panels", "Energy storage limitations", "Lack of government support", "Public opposition"]), answer: "Energy storage limitations", readingPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "reading-0-4", type: "reading", section: 1, questionText: "Which country leads in wind energy capacity?", options: JSON.stringify(["Germany", "Denmark", "China", "USA"]), answer: "China", readingPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "reading-0-5", type: "reading", section: 1, questionText: "The word intermittent in the passage means:", options: JSON.stringify(["Continuous", "Unreliable", "Expensive", "Clean"]), answer: "Unreliable", readingPassageId: p0.id },
  });
  const p1 = await prisma.readingPassage.create({
    data: { title: "The History of Coffee", passage: "Coffee has a rich and fascinating history that spans centuries. The story begins in Ethiopia, where legend says a goat herder named Kaldi discovered the energizing effects of coffee beans after noticing his goats became lively after eating them. From Ethiopia, coffee spread to the Arabian Peninsula in the 15th century. The first coffeehouses opened in Mecca and quickly became centers of social activity. By the 17th century, coffee had reached Europe, where it was initially met with suspicion. Some called it the bitter invention of Satan, while others embraced it. Coffeehouses in England became known as penny universities because for the price of a penny, one could engage in stimulating conversation. Today, coffee is one of the most traded commodities in the world.", difficulty: "easy", sortOrder: 1, wordCount: 124 },
  });
  console.log("  [2/6] The History of Coffee");
  await prisma.question.create({
    data: { id: "reading-1-0", type: "reading", section: 1, questionText: "Coffee was first discovered in the Arabian Peninsula.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-1", type: "reading", section: 1, questionText: "The first coffeehouses were established in Mecca.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-2", type: "reading", section: 1, questionText: "Coffee was immediately welcomed when it arrived in Europe.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-3", type: "reading", section: 1, questionText: "Who discovered the energizing effects of coffee beans?", options: JSON.stringify(["A merchant", "A goat herder", "A monk", "A scientist"]), answer: "A goat herder", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-4", type: "reading", section: 1, questionText: "What were coffeehouses in England called?", options: JSON.stringify(["Social clubs", "Penny universities", "Coffee academies", "Discussion halls"]), answer: "Penny universities", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-5", type: "reading", section: 1, questionText: "The word commodities in the passage means:", options: JSON.stringify(["Products", "Drinks", "Resources", "Goods"]), answer: "Products", readingPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "reading-1-6", type: "reading", section: 1, questionText: "When did coffee first reach Europe?", options: JSON.stringify(["15th century", "16th century", "17th century", "18th century"]), answer: "17th century", readingPassageId: p1.id },
  });
  const p2 = await prisma.readingPassage.create({
    data: { title: "Urban Green Spaces: Benefits and Challenges", passage: "Urban green spaces, including parks, gardens, and nature reserves, provide numerous benefits to city dwellers. Research has shown that access to green spaces improves mental health, reduces stress, and encourages physical activity. They also help reduce air pollution and lower city temperatures. Cities like Singapore have integrated green spaces into their urban planning, creating a garden city. However, maintaining these spaces presents challenges. Budget constraints often limit the resources available for upkeep. Additionally, green spaces can sometimes attract unwanted wildlife or become gathering places for antisocial behavior. Despite these issues, the benefits of urban green spaces far outweigh the drawbacks, and urban planners increasingly recognize their importance for sustainable city development.", difficulty: "medium", sortOrder: 2, wordCount: 111 },
  });
  console.log("  [3/6] Urban Green Spaces: Benefits and Challenges");
  await prisma.question.create({
    data: { id: "reading-2-0", type: "reading", section: 1, questionText: "Green spaces help reduce stress levels.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-1", type: "reading", section: 1, questionText: "Singapore is known for its garden city concept.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-2", type: "reading", section: 1, questionText: "Urban green spaces always lead to increased crime rates.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-3", type: "reading", section: 1, questionText: "What is a challenge mentioned for maintaining green spaces?", options: JSON.stringify(["Water shortage", "Budget constraints", "Lack of interest", "Climate change"]), answer: "Budget constraints", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-4", type: "reading", section: 1, questionText: "Which city is highlighted as an example of good green space planning?", options: JSON.stringify(["London", "New York", "Singapore", "Tokyo"]), answer: "Singapore", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-5", type: "reading", section: 1, questionText: "The word integrated in the passage means:", options: JSON.stringify(["Separated", "Combined", "Isolated", "Removed"]), answer: "Combined", readingPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "reading-2-6", type: "reading", section: 1, questionText: "List TWO benefits of urban green spaces mentioned in the passage:", options: JSON.stringify(["Mental health and business growth", "Mental health and pollution reduction", "Exercise and tourism", "Education and entertainment"]), answer: "Mental health and pollution reduction", readingPassageId: p2.id },
  });
  const p3 = await prisma.readingPassage.create({
    data: { title: "The Science of Learning Languages", passage: "Learning a second language has been shown to have numerous cognitive benefits. Studies indicate that bilingual individuals often demonstrate better executive function, including improved attention control and problem-solving skills. The best time to learn a language is during childhood, when the brain is most plastic. However, adults can also achieve fluency through consistent practice and immersion. Language learning methods have evolved significantly. Traditional grammar-translation approaches have given way to communicative methods that emphasize real-world usage. Technology has also transformed language learning. Apps like Duolingo and Babbel offer accessible practice, while online platforms connect learners with native speakers worldwide. Research suggests that combining multiple methods yields the best results. The key success factors include motivation, consistent practice, and exposure to authentic language use.", difficulty: "medium", sortOrder: 3, wordCount: 122 },
  });
  console.log("  [4/6] The Science of Learning Languages");
  await prisma.question.create({
    data: { id: "reading-3-0", type: "reading", section: 1, questionText: "Bilingual individuals have better problem-solving skills.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-1", type: "reading", section: 1, questionText: "Adults cannot become fluent in a second language.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-2", type: "reading", section: 1, questionText: "Grammar-translation is the most effective method.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-3", type: "reading", section: 1, questionText: "What does the word plastic refer to in the passage?", options: JSON.stringify(["Flexible", "Artificial", "Fragile", "Synthetic"]), answer: "Flexible", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-4", type: "reading", section: 1, questionText: "Which is mentioned as a key success factor?", options: JSON.stringify(["Natural talent", "Consistent practice", "Expensive courses", "Young age"]), answer: "Consistent practice", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-5", type: "reading", section: 1, questionText: "The passage suggests that the best approach is:", options: JSON.stringify(["Using only apps", "Traditional methods", "Combining methods", "Immersion only"]), answer: "Combining methods", readingPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "reading-3-6", type: "reading", section: 1, questionText: "What has transformed language learning according to the passage?", options: JSON.stringify(["New textbooks", "Government policy", "Technology", "Scientific research"]), answer: "Technology", readingPassageId: p3.id },
  });
  const p4 = await prisma.readingPassage.create({
    data: { title: "Artificial Intelligence in Healthcare", passage: "Artificial intelligence is revolutionizing healthcare in unprecedented ways. Machine learning algorithms can now diagnose certain diseases more accurately than human doctors. For instance, AI systems have achieved remarkable success in detecting cancerous tumors in medical images, sometimes identifying abnormalities that human radiologists might miss. Beyond diagnosis, AI is being used to develop personalized treatment plans, predict patient outcomes, and accelerate drug discovery. The potential benefits are enormous: earlier detection of diseases, reduced healthcare costs, and improved patient outcomes. However, the integration of AI in healthcare also raises significant ethical concerns. Data privacy is a major issue, as AI systems require vast amounts of patient data to function effectively. There are also questions about accountability when an AI system makes a mistake. Furthermore, there is concern that AI could exacerbate existing healthcare inequalities if access to AI-powered healthcare is limited to wealthy populations. Despite these challenges, the trajectory of AI in healthcare is clear.", difficulty: "hard", sortOrder: 4, wordCount: 153 },
  });
  console.log("  [5/6] Artificial Intelligence in Healthcare");
  await prisma.question.create({
    data: { id: "reading-4-0", type: "reading", section: 1, questionText: "AI can detect cancerous tumors in medical images.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-1", type: "reading", section: 1, questionText: "AI systems require small amounts of data to function.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-2", type: "reading", section: 1, questionText: "AI has completely replaced human doctors in diagnosis.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-3", type: "reading", section: 1, questionText: "What is mentioned as an ethical concern?", options: JSON.stringify(["High cost of AI", "Data privacy", "Slow adoption", "Technical limitations"]), answer: "Data privacy", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-4", type: "reading", section: 1, questionText: "The word unprecedented in the passage means:", options: JSON.stringify(["Unimportant", "Unpredictable", "Unparalleled", "Unnecessary"]), answer: "Unparalleled", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-5", type: "reading", section: 1, questionText: "List TWO benefits of AI in healthcare:", options: JSON.stringify(["Faster internet and cheaper equipment", "Earlier detection and reduced costs", "More doctors and better training", "Less paperwork and more patients"]), answer: "Earlier detection and reduced costs", readingPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "reading-4-6", type: "reading", section: 1, questionText: "What concern is raised about AI and healthcare equality?", options: JSON.stringify(["AI is too expensive for hospitals", "AI may only benefit wealthy populations", "AI does not work in rural areas", "AI requires too much electricity"]), answer: "AI may only benefit wealthy populations", readingPassageId: p4.id },
  });
  const p5 = await prisma.readingPassage.create({
    data: { title: "The Economics of Climate Change", passage: "The economic implications of climate change are profound and far-reaching. The Stern Review, one of the most comprehensive economic analyses of climate change, concluded that the costs of inaction far outweigh the costs of action. According to the review, failing to address climate change could reduce global GDP by up to 20%. In contrast, the cost of taking action was estimated at only 1% of global GDP. Carbon pricing has emerged as a key policy tool. By putting a price on carbon emissions, governments can create economic incentives for businesses to reduce their carbon footprint. The European Union Emissions Trading System is the largest carbon market in the world. However, implementing carbon pricing faces political opposition. Critics argue that it places an unfair burden on low-income households and could harm economic competitiveness. Proponents counter that the long-term economic benefits of avoiding catastrophic climate change far outweigh these short-term costs.", difficulty: "hard", sortOrder: 5, wordCount: 149 },
  });
  console.log("  [6/6] The Economics of Climate Change");
  await prisma.question.create({
    data: { id: "reading-5-0", type: "reading", section: 1, questionText: "The Stern Review estimated that climate inaction could reduce GDP by 20%.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-1", type: "reading", section: 1, questionText: "The EU has the largest carbon market in the world.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "True", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-2", type: "reading", section: 1, questionText: "Carbon pricing has been universally accepted by all countries.", options: JSON.stringify(["True", "False", "Not Given"]), answer: "False", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-3", type: "reading", section: 1, questionText: "What is carbon pricing designed to create?", options: JSON.stringify(["Tax revenue", "Incentives for reducing emissions", "Government jobs", "International cooperation"]), answer: "Incentives for reducing emissions", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-4", type: "reading", section: 1, questionText: "The word profound in the passage means:", options: JSON.stringify(["Superficial", "Deep", "Minor", "Temporary"]), answer: "Deep", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-5", type: "reading", section: 1, questionText: "What is a criticism of carbon pricing mentioned in the passage?", options: JSON.stringify(["It is ineffective", "It burdens low-income households", "It is too expensive to implement", "It does not reduce emissions"]), answer: "It burdens low-income households", readingPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "reading-5-6", type: "reading", section: 1, questionText: "According to the passage, action on climate change costs approximately what percentage of GDP?", options: JSON.stringify(["5%", "1%", "10%", "20%"]), answer: "1%", readingPassageId: p5.id },
  });

  const t = await prisma.readingPassage.count();
  const q = await prisma.question.count({ where: { type: "reading" } });
  console.log(`OK: ${t} passages, ${q} questions`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
