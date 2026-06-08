# IELTS 在线学习平台 — 项目规划

---

## 一、项目概述

构建一个以**认知科学 + 语言习得理论**为底层逻辑的 IELTS 在线学习平台。帮助学生通过结构化、数据驱动的学习路径，高效备战雅思考试（听力、阅读、写作、口语四大模块）。

---

## 二、核心学习理念（科学方法论）

| 科学原则 | 在产品中的落地 |
|---------|--------------|
| **间隔重复 (Spaced Repetition)** | 词汇/语法卡片基于 SM-2 算法排期，自动推送复习任务 |
| **主动回忆 (Active Recall)** | 所有练习都以填空、听写、限时作答等形式驱动，拒绝被动阅读 |
| **刻意练习 (Deliberate Practice)** | 按题型拆解专项训练，精准打击薄弱环节 |
| **交错练习 (Interleaving)** | 每日学习计划混合不同技能模块，避免单一模块疲劳 |
| **即时反馈 (Feedback Loop)** | 写作 AI 批改、口语录音评分、客观题即时出分 |
| **脚手架 (Scaffolding)** | 从基础词汇 → 单句 → 段落 → 全文，逐级搭建能力 |
| **元认知 (Metacognition)** | 学习仪表盘展示各模块正确率、用时、趋势，促进自我反思 |

---

## 三、技术栈

### 前端
- **Next.js 14** (App Router) — SSR/SSG 兼顾 SEO 与性能
- **TypeScript** — 类型安全
- **Tailwind CSS** — 原子化样式
- **shadcn/ui** — 高质量 React 组件库
- **Zustand** — 轻量状态管理
- **React Query (TanStack Query)** — 服务端状态与缓存

### 后端
- **Next.js API Routes** — BFF 层，减少架构复杂度
- **Prisma ORM** — 类型安全的数据库访问
- **PostgreSQL** — 主数据库（用户、题库、进度、词汇）
- **Redis** — 缓存 & 会话管理 & 排行榜

### AI 能力
- **OpenAI API (GPT-4o)** — 写作批改、口语评估、范文生成
- **TTS (Text-to-Speech)** — 听力音频生成 / 口语示例朗读

### 基础设施
- **Vercel** — 部署 & Edge Functions
- **Cloudflare R2 / S3** — 音频 & 图片等静态资源
- **NextAuth.js** — 认证（支持 Google/GitHub/邮箱登录）

---

## 四、网站内容组成

### 4.1 词汇系统 (Vocabulary)
- 按话题分类（教育、环境、科技、健康、社会等）
- 按难度分级（基础 / 核心 / 进阶）
- 每词包含：释义、音标、例句、搭配、同义词
- **间隔复习引擎**：每日推送待复习词汇，支持「认识/模糊/忘记」三档评价
- 词汇量成长曲线可视化

### 4.2 语法系统 (Grammar)
- 按知识点拆解（时态、从句、被动、虚拟语气等）
- 每个知识点：规则讲解 → 例句 → 诊断练习 → 错题复习
- 语法薄弱点雷达图

### 4.3 听力模块 (Listening)
- 按 Section 1–4 分类训练
- 题型：填空、单选、多选、地图、配对
- 每道题附带原文 + 解析
- 支持倍速播放、逐句精听
- 模拟真实考试计时

### 4.4 阅读模块 (Reading)
- 按 Passage 1–3 和题型分类
- 题型：判断、填空、匹配、标题、选择
- 内置计时器 + 字数统计
- 每篇文章附带词汇表 & 长难句解析
- 平行阅读法 / 扫读技巧引导

### 4.5 写作模块 (Writing)
- **Task 1**：图表描述（柱状图、折线图、饼图、表格、流程图、地图）
- **Task 2**：议论文（观点类、讨论类、问题解决类、双边讨论）
- **AI 批改**：语法纠错、词汇升级、结构评分、范文对比
- 高分范文库（按话题/分数段筛选）

### 4.6 口语模块 (Speaking)
- Part 1 / Part 2 / Part 3 分项训练
- 当季题库（按季度更新）
- 模型回答 + 录音对比
- AI 发音评估（流利度、词汇、语法、发音）

### 4.7 模拟考试 (Mock Test)
- 完整 4 科限时模考（听力 30min / 阅读 60min / 写作 60min）
- 自动算分 & 成绩报告
- 历史成绩趋势图

### 4.8 学习仪表盘 (Dashboard)
- 今日任务清单
- 各模块正确率 & 用时统计
- 连续学习天数 & 学习时长
- 目标分数 vs 当前分数差距

### 4.9 学习计划 (Study Plan)
- 根据目标分数 & 考试日期自动生成每日计划
- 支持调整强度（轻松/标准/高强度）

---

## 五、数据库核心模型（概要）

```
User
  - id, name, email, targetScore, examDate
  - createdAt, streak, totalStudyMinutes

VocabularyWord
  - id, word, phonetic, definition, examples, collocations, synonyms
  - topic, difficulty (basic/core/advanced)

UserVocabularyProgress
  - userId, wordId
  - ease (SM-2), interval, nextReviewAt, consecutiveCorrect

GrammarPoint
  - id, name, category, explanation, examples

Question (Listening/Reading/Grammar)
  - id, type, section, passage, questionText, options, answer, explanation
  - audioUrl (listening only)

WritingTask
  - id, taskType (Task1/Task2), prompt, bandScore, sampleAnswer

SpeakingTopic
  - id, part (1/2/3), topic, questions, modelAnswer, audioUrl

UserSubmission
  - id, userId, questionId
  - userAnswer, isCorrect, timeSpent, submittedAt

MockTest
  - id, userId, scores (json), startedAt, completedAt
```

---

## 六、开发阶段

### Phase 1 — 基础骨架 (MVP)
- 项目脚手架搭建（Next.js + Prisma + Tailwind + shadcn/ui）
- 用户注册/登录（NextAuth.js）
- 数据库 Schema & 种子数据（少量样题）
- 首页 & 仪表盘框架

### Phase 2 — 词汇 + 语法核心
- 词汇浏览 & 分类
- SM-2 间隔复习引擎
- 语法知识点 + 诊断练习
- 学习仪表盘 V1（基础统计）

### Phase 3 — 听力 + 阅读
- 听力播放器 & 练习系统
- 阅读计时练习系统
- 答题即时判分 & 解析

### Phase 4 — 写作 + AI 批改
- 写作编辑器
- OpenAI API 集成（批改 + 评分）
- 范文库

### Phase 5 — 口语 + 模考
- 口语题库 & 录音功能
- AI 发音评估
- 完整模考流程 & 成绩报告

### Phase 6 — 学习计划 + 优化
- 自动生成学习计划
- 性能优化 & SEO
- 移动端适配
- 上线 & 运维

---

## 七、下一步

1. 确认技术栈选型是否合适
2. 初始化 Next.js 项目 + 配置 Prisma/数据库
3. 搭建用户认证系统
4. 开始 Phase 1 开发
