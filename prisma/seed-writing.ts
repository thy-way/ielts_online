import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding all writing tasks ===");
  const allTasks: { id: string; taskType: string; prompt: string; bandScore: number; sampleAnswer: string; }[] = [
    { id: "writing-0", taskType: "task1", bandScore: 7.5, prompt: "The chart below shows the number of international students in four countries from 2000 to 2020.\n\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant.", sampleAnswer: "The bar chart illustrates the number of international students..." },
    { id: "writing-1", taskType: "task1", bandScore: 7.0, prompt: "The pie charts below show the percentage of energy consumption by source in a country in 2000 and 2020.\n\nSummarize the information.", sampleAnswer: "The pie charts compare the proportion of energy consumption..." },
    { id: "writing-2", taskType: "task1", bandScore: 6.5, prompt: "The table below shows the average monthly rainfall and temperature in three cities.\n\nSummarize the information.", sampleAnswer: "The table presents data on average monthly rainfall..." },
    { id: "writing-3", taskType: "task1", bandScore: 7.0, prompt: "The diagram below shows the process of recycling plastic bottles.\n\nSummarize the information.", sampleAnswer: "The diagram illustrates the step-by-step process of recycling..." },
    { id: "writing-4", taskType: "task2", bandScore: 7.0, prompt: "Some people believe that governments should invest more money in public transportation rather than in building new roads. To what extent do you agree or disagree?", sampleAnswer: "The debate over whether government funds should be directed towards public transportation..." },
    { id: "writing-5", taskType: "task2", bandScore: 7.5, prompt: "In many countries, the gap between rich and poor is widening. What problems does this cause and what solutions can you suggest?", sampleAnswer: "The widening income inequality has become one of the most pressing issues..." },
    { id: "writing-6", taskType: "task2", bandScore: 6.5, prompt: "Some people think that the best way to solve environmental problems is to increase the cost of fuel. To what extent do you agree or disagree?", sampleAnswer: "Environmental degradation is a growing concern worldwide..." },
    { id: "writing-7", taskType: "task2", bandScore: 7.0, prompt: "Some people believe that unpaid community service should be a compulsory part of high school programs. To what extent do you agree or disagree?", sampleAnswer: "The proposal to make unpaid community service mandatory..." },
  ];
  for (const t of allTasks) {
    await prisma.writingTask.upsert({ where: { id: t.id }, update: t, create: t });
  }
  const c = await prisma.writingTask.count();
  console.log("Writing tasks: " + c);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
