import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("=== Seeding listening passages ===");

  const p0 = await prisma.listeningPassage.create({
    data: { section: 1, title: "Student Accommodation Enquiry", transcript: "Transcript for Student Accommodation Enquiry.", difficulty: "easy", sortOrder: 0 },
  });
  console.log("  [1/8] Student Accommodation Enquiry");
  await prisma.question.create({
    data: { id: "listening-0-0", type: "listening", section: 1, questionText: "What type of accommodation does the student prefer?", options: JSON.stringify(["Shared house", "University dormitory", "Private flat", "Homestay"]), answer: "Private flat", listeningPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "listening-0-1", type: "listening", section: 1, questionText: "What is the maximum budget per week?", options: JSON.stringify(["$100", "$150", "$200", "$250"]), answer: "$200", listeningPassageId: p0.id },
  });
  await prisma.question.create({
    data: { id: "listening-0-2", type: "listening", section: 1, questionText: "When does the student need to move in?", options: JSON.stringify(["1st September", "15th September", "1st October", "15th October"]), answer: "15th September", listeningPassageId: p0.id },
  });
  const p1 = await prisma.listeningPassage.create({
    data: { section: 1, title: "Library Registration", transcript: "Transcript for Library Registration.", difficulty: "easy", sortOrder: 1 },
  });
  console.log("  [2/8] Library Registration");
  await prisma.question.create({
    data: { id: "listening-1-0", type: "listening", section: 1, questionText: "What is the student full name?", options: JSON.stringify(["John Smith", "James Brown", "Jack Wilson", "Jason Lee"]), answer: "James Brown", listeningPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "listening-1-1", type: "listening", section: 1, questionText: "What type of library card does the student apply for?", options: JSON.stringify(["Standard", "Premium", "Student", "Temporary"]), answer: "Student", listeningPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "listening-1-2", type: "listening", section: 1, questionText: "How long is the library membership valid?", options: JSON.stringify(["3 months", "6 months", "1 year", "2 years"]), answer: "1 year", listeningPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "listening-1-3", type: "listening", section: 1, questionText: "What documents does the student need to provide?", options: JSON.stringify(["Passport", "Student ID", "Drivers license", "Birth certificate"]), answer: "Student ID", listeningPassageId: p1.id },
  });
  await prisma.question.create({
    data: { id: "listening-1-4", type: "listening", section: 1, questionText: "How many items can the student borrow at once?", options: JSON.stringify(["3", "5", "8", "10"]), answer: "5", listeningPassageId: p1.id },
  });
  const p2 = await prisma.listeningPassage.create({
    data: { section: 2, title: "Museum Exhibition Tour", transcript: "Transcript for Museum Exhibition Tour.", difficulty: "medium", sortOrder: 2 },
  });
  console.log("  [3/8] Museum Exhibition Tour");
  await prisma.question.create({
    data: { id: "listening-2-0", type: "listening", section: 2, questionText: "What is the main exhibition about?", options: JSON.stringify(["Ancient Egypt", "Modern Art", "Space Exploration", "Ocean Life"]), answer: "Ancient Egypt", listeningPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "listening-2-1", type: "listening", section: 2, questionText: "How long does the guided tour last?", options: JSON.stringify(["30 minutes", "45 minutes", "60 minutes", "90 minutes"]), answer: "45 minutes", listeningPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "listening-2-2", type: "listening", section: 2, questionText: "What is NOT allowed in the exhibition hall?", options: JSON.stringify(["Photography", "Food and drinks", "Bags", "Mobile phones"]), answer: "Photography", listeningPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "listening-2-3", type: "listening", section: 2, questionText: "When is the museum closed?", options: JSON.stringify(["Mondays", "Tuesdays", "Wednesdays", "Thursdays"]), answer: "Mondays", listeningPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "listening-2-4", type: "listening", section: 2, questionText: "How much is the student discount?", options: JSON.stringify(["10%", "20%", "30%", "50%"]), answer: "50%", listeningPassageId: p2.id },
  });
  await prisma.question.create({
    data: { id: "listening-2-5", type: "listening", section: 2, questionText: "Where is the museum located?", options: JSON.stringify(["City Center", "North of the river", "Near the park", "Opposite the station"]), answer: "Near the park", listeningPassageId: p2.id },
  });
  const p3 = await prisma.listeningPassage.create({
    data: { section: 2, title: "Volunteer Program Information", transcript: "Transcript for Volunteer Program Information.", difficulty: "medium", sortOrder: 3 },
  });
  console.log("  [4/8] Volunteer Program Information");
  await prisma.question.create({
    data: { id: "listening-3-0", type: "listening", section: 2, questionText: "What type of volunteer work is available?", options: JSON.stringify(["Teaching", "Environmental cleanup", "Hospital assistance", "Animal care"]), answer: "Environmental cleanup", listeningPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "listening-3-1", type: "listening", section: 2, questionText: "How many hours per week are expected?", options: JSON.stringify(["2-3", "4-5", "6-8", "10-12"]), answer: "6-8", listeningPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "listening-3-2", type: "listening", section: 2, questionText: "What is provided to volunteers?", options: JSON.stringify(["Uniform", "Meals", "Transportation", "Training"]), answer: "Training", listeningPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "listening-3-3", type: "listening", section: 2, questionText: "Where does the program take place?", options: JSON.stringify(["In the city", "In coastal areas", "In national parks", "In schools"]), answer: "In national parks", listeningPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "listening-3-4", type: "listening", section: 2, questionText: "What age groups can participate?", options: JSON.stringify(["16-25", "18-30", "20-35", "25-40"]), answer: "18-30", listeningPassageId: p3.id },
  });
  await prisma.question.create({
    data: { id: "listening-3-5", type: "listening", section: 2, questionText: "When does the next program start?", options: JSON.stringify(["Next month", "In two months", "Next week", "Next season"]), answer: "Next month", listeningPassageId: p3.id },
  });
  const p4 = await prisma.listeningPassage.create({
    data: { section: 3, title: "Business Lecture Series", transcript: "Transcript for Business Lecture Series.", difficulty: "hard", sortOrder: 4 },
  });
  console.log("  [5/8] Business Lecture Series");
  await prisma.question.create({
    data: { id: "listening-4-0", type: "listening", section: 3, questionText: "What is the main topic of the lecture series?", options: JSON.stringify(["Marketing Strategies", "Global Economy", "Entrepreneurship", "Leadership"]), answer: "Global Economy", listeningPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "listening-4-1", type: "listening", section: 3, questionText: "Who is the guest speaker next week?", options: JSON.stringify(["Professor Wang", "Dr Smith", "Ms Johnson", "Mr Lee"]), answer: "Dr Smith", listeningPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "listening-4-2", type: "listening", section: 3, questionText: "What does the speaker say about emerging markets?", options: JSON.stringify(["They are declining", "They are growing rapidly", "They are stable", "They are unpredictable"]), answer: "They are growing rapidly", listeningPassageId: p4.id },
  });
  await prisma.question.create({
    data: { id: "listening-4-3", type: "listening", section: 3, questionText: "What is recommended for businesses entering new markets?", options: JSON.stringify(["Quick expansion", "Local partnerships", "Aggressive marketing", "Price reduction"]), answer: "Local partnerships", listeningPassageId: p4.id },
  });
  const p5 = await prisma.listeningPassage.create({
    data: { section: 3, title: "Environmental Policy Debate", transcript: "Transcript for Environmental Policy Debate.", difficulty: "hard", sortOrder: 5 },
  });
  console.log("  [6/8] Environmental Policy Debate");
  await prisma.question.create({
    data: { id: "listening-5-0", type: "listening", section: 3, questionText: "What percentage of emissions should be reduced by 2030?", options: JSON.stringify(["30%", "40%", "50%", "60%"]), answer: "50%", listeningPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "listening-5-1", type: "listening", section: 3, questionText: "Which country is mentioned as a successful example?", options: JSON.stringify(["Germany", "Sweden", "Japan", "Canada"]), answer: "Sweden", listeningPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "listening-5-2", type: "listening", section: 3, questionText: "What is the main argument against the policy?", options: JSON.stringify(["Too expensive", "Too slow", "Too complicated", "Too restrictive"]), answer: "Too expensive", listeningPassageId: p5.id },
  });
  await prisma.question.create({
    data: { id: "listening-5-3", type: "listening", section: 3, questionText: "What alternative does the opposition propose?", options: JSON.stringify(["Voluntary agreements", "Technological solutions", "International treaties", "Public awareness"]), answer: "Technological solutions", listeningPassageId: p5.id },
  });
  const p6 = await prisma.listeningPassage.create({
    data: { section: 4, title: "University Admission Interview", transcript: "Transcript for University Admission Interview.", difficulty: "hard", sortOrder: 6 },
  });
  console.log("  [7/8] University Admission Interview");
  await prisma.question.create({
    data: { id: "listening-6-0", type: "listening", section: 4, questionText: "What program is the student applying for?", options: JSON.stringify(["Business Administration", "Environmental Science", "Computer Engineering", "International Relations"]), answer: "Environmental Science", listeningPassageId: p6.id },
  });
  await prisma.question.create({
    data: { id: "listening-6-1", type: "listening", section: 4, questionText: "What experience does the student have?", options: JSON.stringify(["Research internship", "Volunteer work", "Part-time job", "Study abroad"]), answer: "Research internship", listeningPassageId: p6.id },
  });
  await prisma.question.create({
    data: { id: "listening-6-2", type: "listening", section: 4, questionText: "Why does the student choose this university?", options: JSON.stringify(["Location", "Reputation", "Scholarship", "Faculty expertise"]), answer: "Faculty expertise", listeningPassageId: p6.id },
  });
  await prisma.question.create({
    data: { id: "listening-6-3", type: "listening", section: 4, questionText: "What are the student career goals?", options: JSON.stringify(["Researcher", "Policy advisor", "Teacher", "Entrepreneur"]), answer: "Policy advisor", listeningPassageId: p6.id },
  });
  await prisma.question.create({
    data: { id: "listening-6-4", type: "listening", section: 4, questionText: "What skill does the student identify as their strength?", options: JSON.stringify(["Data analysis", "Public speaking", "Writing", "Teamwork"]), answer: "Data analysis", listeningPassageId: p6.id },
  });
  const p7 = await prisma.listeningPassage.create({
    data: { section: 4, title: "Conference Registration", transcript: "Transcript for Conference Registration.", difficulty: "hard", sortOrder: 7 },
  });
  console.log("  [8/8] Conference Registration");
  await prisma.question.create({
    data: { id: "listening-7-0", type: "listening", section: 4, questionText: "What is the name of the conference?", options: JSON.stringify(["Future Tech 2025", "Innovation Summit", "Digital World", "Tech Connect"]), answer: "Innovation Summit", listeningPassageId: p7.id },
  });
  await prisma.question.create({
    data: { id: "listening-7-1", type: "listening", section: 4, questionText: "How much is the early bird registration fee?", options: JSON.stringify(["$250", "$300", "$350", "$400"]), answer: "$300", listeningPassageId: p7.id },
  });
  await prisma.question.create({
    data: { id: "listening-7-2", type: "listening", section: 4, questionText: "What is included in the full package?", options: JSON.stringify(["Lunch only", "All meals and accommodation", "Conference materials and lunch", "Transportation and materials"]), answer: "Conference materials and lunch", listeningPassageId: p7.id },
  });
  await prisma.question.create({
    data: { id: "listening-7-3", type: "listening", section: 4, questionText: "What is the deadline for submitting papers?", options: JSON.stringify(["1st March", "15th March", "1st April", "15th April"]), answer: "15th March", listeningPassageId: p7.id },
  });
  await prisma.question.create({
    data: { id: "listening-7-4", type: "listening", section: 4, questionText: "Where will the conference be held?", options: JSON.stringify(["Convention Center", "University Hall", "City Hotel", "Business Park"]), answer: "Convention Center", listeningPassageId: p7.id },
  });
  await prisma.question.create({
    data: { id: "listening-7-5", type: "listening", section: 4, questionText: "How many attendees are expected?", options: JSON.stringify(["200", "500", "800", "1000"]), answer: "500", listeningPassageId: p7.id },
  });

  const t = await prisma.listeningPassage.count();
  const q = await prisma.question.count({ where: { type: "listening" } });
  console.log(`OK: \${t} passages, \${q} questions`);
}

main().catch((e)=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
