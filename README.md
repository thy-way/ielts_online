# IELTS Online — 科学备考，高效提分

基于认知科学和语言习得理论的 IELTS 在线学习平台。间隔复习 × 主动回忆 × AI 批改，覆盖听力、阅读、写作、口语四大模块。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS |
| 组件库 | shadcn/ui (Radix UI) |
| 图标 | lucide-react |
| 状态管理 | Zustand |
| 数据请求 | TanStack Query (React Query) |
| ORM | Prisma 5 |
| 数据库 | PostgreSQL |
| 认证 | NextAuth.js v4 |
| 部署 | Vercel |

## 快速开始

### 环境要求

- Node.js >= 18
- PostgreSQL >= 14
- npm >= 9

### 安装运行

```bash
# 1. 克隆仓库
git clone https://github.com/thy-way/ielts_online.git
cd ielts_online

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env  # 或直接编辑 .env
# 编辑 .env 填入你的 DATABASE_URL 和 NEXTAUTH_SECRET

# 4. 初始化数据库
npx prisma db push
npx prisma generate

# 5. 填充种子数据（可选）
npx tsx prisma/seed.ts

# 6. 启动开发服务器
npm run dev
# 打开 http://localhost:3000
```

### 环境变量 (.env)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ielts_online"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here"
OPENAI_API_KEY="sk-..."  # 可选，AI 批改功能需要
```

## 项目结构

```
src/
├── app/                         # Next.js App Router 页面
│   ├── page.tsx                # 首页 (Landing)
│   ├── layout.tsx              # 根布局
│   ├── globals.css             # 全局样式
│   ├── login/                  # 登录页
│   ├── register/               # 注册页
│   ├── dashboard/              # 仪表盘 (需登录)
│   ├── vocabulary/             # 词汇系统
│   │   ├── page.tsx            # 词汇主页 - 五阶段学习金字塔
│   │   ├── learn/              # 间隔复习闪卡 (SM-2 算法)
│   │   └── topics/             # 话题词汇列表 & 详情
│   ├── grammar/                # 语法学习路径
│   └── api/                    # API 路由
│       └── auth/               # NextAuth 认证 API
├── components/
│   ├── ui/                     # shadcn/ui 组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── layout/                 # 布局组件
│       ├── navbar.tsx          # 全局导航栏
│       └── footer.tsx          # 全局页脚
├── lib/                        # 工具库
│   ├── auth.ts                 # NextAuth 配置
│   ├── prisma.ts               # Prisma 客户端 (懒加载)
│   └── utils.ts                # cn() 工具函数
└── types/                      # TypeScript 类型定义

prisma/
├── schema.prisma               # 数据库 Schema (10 个模型)
└── seed.ts                     # 种子数据
```

## 功能模块

### 已实现

| 模块 | 功能 | 状态 |
|------|------|------|
| 用户系统 | 邮箱注册 / 密码登录 / JWT 会话 | ✅ 已实现 |
| 词汇系统 | 五阶段学习金字塔（词性 → 词根 → 句式 → 语法 → 话题） | ✅ 已实现 |
| 间隔复习 | SM-2 算法闪卡，三档评分（不认识 / 模糊 / 认识） | ✅ UI 已实现 |
| 话题词汇 | 10 大 IELTS 话题分类 + 词性筛选 | ✅ 已实现 |
| 语法学习 | 8 大语法分类（时态 / 被动 / 从句 / 条件句 / 虚拟 / 比较 / 句型 / 扩展） | ✅ 已实现 |
| 仪表盘 | 学习统计卡片 + 快捷操作 + 学习路线进度 | ✅ 已实现 |
| 响应式 | 全站移动端适配 | ✅ 已实现 |

### 待实现

| 模块 | 功能 |
|------|------|
| 听力系统 | Section 1-4 分类训练 + 播放器 + 倍速 |
| 阅读系统 | 计时练习 + 平行阅读法 + 长难句解析 |
| 写作 AI | Task 1/2 批改 + 范文库 + 语法纠错 |
| 口语系统 | 当季题库 + 录音 + AI 发音评估 |
| 模考系统 | 全科限时模考 + 自动算分 |
| 学习计划 | 基于目标分数和考试日期自动排期 |
| 支付系统 | 订阅制会员（月度 / 季度 / 冲刺包） |

## 数据库模型

核心数据表：

- **User** — 用户账号与学习统计
- **VocabularyWord** — 单词（含词性、词根、前缀、后缀、搭配、近反义词）
- **VocabularyTopic** — 词汇话题分类
- **UserVocabularyProgress** — SM-2 间隔复习进度
- **GrammarCategory** — 语法分类（时态、从句等）
- **GrammarPoint** — 语法知识点（含例句、IELTS 应用场景）
- **UserGrammarProgress** — 语法学习进度
- **Question** — 题库（听力 / 阅读 / 语法练习）
- **WritingTask** — 写作题目与范文
- **SpeakingTopic** — 口语话题

## 学习理念

| 原则 | 实现方式 |
|------|---------|
| 间隔重复 | SM-2 算法自动排期，三档评分反馈 |
| 主动回忆 | 闪卡翻转 + 限时作答，拒绝被动阅读 |
| 刻意练习 | 按题型拆解专项训练 |
| 交错练习 | 每日学习混合不同技能模块 |
| 脚手架 | 词性 → 词根 → 句式 → 语法 → 话题，逐级搭建 |
| 反馈循环 | 即时判分 + 解析展示 |
| 元认知 | 仪表盘可视化学习数据 |

## 开发命令

```bash
npm run dev        # 启动开发服务器
npm run build      # 生产构建
npm run start      # 启动生产服务器
npm run lint       # ESLint 检查
npm run db:push    # 推送 Schema 到数据库
npm run db:generate # 生成 Prisma Client
npm run db:studio  # 打开 Prisma Studio
npm run db:seed    # 填充种子数据
```

## 许可证

MIT
