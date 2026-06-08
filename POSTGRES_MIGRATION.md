# PostgreSQL 切换备忘

## 何时切换
当项目准备部署到生产环境，或需要以下特性时：
- 多用户并发写入
- 全文搜索
- 更复杂的查询（窗口函数、CTE 等）
- Vercel / Railway / Supabase 等托管数据库

## 切换步骤

### 1. 修改 `prisma/schema.prisma`
```diff
- provider = "sqlite"
- url      = "file:./dev.db"
+ provider = "postgresql"
+ url      = env("DATABASE_URL")
```

### 2. 修改 `.env`
```diff
- DATABASE_URL="file:./dev.db"
+ DATABASE_URL="postgresql://user:password@host:5432/ielts_online"
```

### 3. 推送到 PostgreSQL
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

## 已知差异
- `@updatedAt` 在 PostgreSQL 中原生支持（更可靠）
- `cuid()` 生成的 ID 在两种数据库中均可用
- SQLite 的 `dev.db` 不适合 Git 追踪（已在 .gitignore 中）