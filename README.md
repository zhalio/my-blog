# ZHalio's Blog & Portfolio

基于 Next.js 16、Tailwind CSS v4、TipTap 和 Supabase 构建的现代化个人博客与轻量作品集。

**在线访问**: [https://emmmxx.xyz](https://emmmxx.xyz)  
**用途定位**: 个人技术博客 + 简历/作品集补充，集中展示项目案例、工程化思路与可运行 Demo。

---

## 技术栈

- **核心框架**: Next.js 16 (App Router) + TypeScript
- **样式方案**: Tailwind CSS v4
- **UI 组件**: shadcn/ui, Radix UI, Lucide React
- **动画特效**: Framer Motion, Vanta.js (WebGL 背景特效), Lottie (404 动画)
- **数据可视化**: Recharts (管理后台图表)
- **内容管理**: TipTap 富文本编辑器 (Block-based)
- **后端服务**: Supabase (PostgreSQL 数据库, Auth 鉴权, Storage)
- **缓存/计数**: Upstash Redis (浏览量/点赞)
- **国际化**: next-intl (支持 zh, en, fr, ja)
- **全文搜索**: Orama (纯客户端高性能搜索)
- **代码高亮**: Shiki (VS Code 同款主题，支持亮/暗双模式)
- **部署托管**: Vercel (Edge Network)
- **评论系统**: Giscus (GitHub Discussions)

## 核心特性

- **✨ 沉浸式体验**: 3D 悬浮卡片、磁力按钮、平滑滚动、粒子特效背景
- **📝 强大的 CMS**: 
  - 集成 TipTap 编辑器，支持代码高亮、表格、任务列表、图片上传
  - **全新仪表盘**: GitHub 风格创作热力图、简约灰度配色
  - 实时草稿保存与预览机制
- **🛡️ 数据自主可控**: 
  - 核心数据托管于 Supabase，拥有完整所有权
  - 媒体资源存储于 Supabase Storage
- **🌍 国际化支持**: 完整的路由级多语言支持 (i18n)
- **🚀 极致性能**:
  - Turbopack 开发构建
  - 图片/字体自动优化
  - 客户端路由预加载
  - ISR (Incremental Static Regeneration) 按需重新生成
- **📈 多维统计**: 
  - 集成 Vercel Analytics (流量分析)
  - 自建文章阅读量/点赞数统计系统
  - 管理后台可视化数据看板
- **📄 About 页作为可编辑文章**:
  - About 页面从后台 `slug=about` 文章读取
  - 可在管理端编辑/发布，不出现在前台文章列表
  - 支持多语言，自动回退到中文版本
  - 便于更新个人介绍与作品集内容

## 管理后台

本项目包含一个功能完备的后台管理系统 (`/admin`)。

### 访问方式

- **本地开发**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **线上环境**: [https://emmmxx.xyz/admin](https://emmmxx.xyz/admin)

### 功能亮点

- **数据看板**: 
  - **创作活跃度**: 可视化展示过去一年的文章发布频率（GitHub Heatmap 风格）
  - **待办事项**: 快速访问未完成的草稿
  - 实时统计：总文章数、草稿数、总阅读量
- **文章管理**: 完整的增删改查 (CRUD) 流程，支持多语言、自定义 Slug、封面上传
- **系统设置**: 站点基本信息配置

## 快速开始

1. **安装依赖**

```bash
pnpm install
```

2. **配置环境变量**

复制 `.env.local.example` 为 `.env.local` 并填入以下服务的 Key：
- Supabase (URL, Anon Key)
- Upstash Redis (URL, Token)
- Giscus (Repo Info)

3. **初始化数据库**

访问 Supabase 控制台，在 SQL Editor 中运行 `supabase/schema.sql` 创建表结构：
- `posts` 表：文章存储
- `tags` 表：标签聚合
- `site_settings` 表：站点配置
- 相关 RLS (Row Level Security) 策略与触发器

4. **启动开发服务器**

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可看到效果。

5. **访问后台管理**

访问 [http://localhost:3000/admin](http://localhost:3000/admin)，使用 Supabase Auth 登录（需在 Supabase 控制台创建用户）。

---

## 目录结构

```
├── app/                  # Next.js App Router 路由
│   ├── (root)/           # 博客前台页面
│   ├── admin/            # 管理后台页面
│   └── api/              # 后端 API 路由
├── components/           # React 组件
│   ├── admin/            # 后台专用组件 (图表, 列表)
│   ├── blog/             # 博客文章相关组件
│   ├── editor/           # TipTap 编辑器配置
│   ├── effects/          # 视觉特效 (Vanta, Particles)
│   └── ui/               # shadcn/ui 基础组件
├── lib/                  # 工具函数与类型定义
├── messages/             # i18n 翻译文件
├── public/               # 静态资源
├── scripts/              # 辅助脚本 (RSS 生成)
└── supabase/             # 数据库迁移与结构文件
```

## 常用命令

| 命令                | 说明                                                   |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`        | 启动本地开发服务器 (Turbopack)                        |
| `pnpm build`      | 构建生产版本并生成 RSS/Sitemap                         |
| `pnpm start`      | 启动生产服务器                                         |
| `pnpm lint`       | 运行代码风格检查                                       |

---

## 部署

由 [Vercel](https://vercel.com) 提供自动部署支持。推送到 `main` 分支即可自动触发构建。

```bash
git push origin main
```

**注意事项**:
- 确保在 Vercel 项目设置中配置所有必需的环境变量
- Supabase 数据库需预先完成迁移（运行 schema.sql）

## 环境变量

请在 `.env.local` 或 Vercel 项目设置中配置以下变量：

### Supabase (必填)

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase 服务角色密钥

### 可选功能 (选填)

- `UPSTASH_REDIS_REST_URL`: Redis URL (浏览量统计)
- `UPSTASH_REDIS_REST_TOKEN`: Redis Token
- `NEXT_PUBLIC_GISCUS_REPO`: Giscus 仓库 (评论系统)
- `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus 仓库 ID
- `NEXT_PUBLIC_GISCUS_CATEGORY`: Giscus 分类
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus 分类 ID

---

## 主要功能演示

- **富文本编辑**: TipTap 编辑器支持拖拽图片上传、代码高亮、表格、任务列表等
- **实时预览**: 后台编辑文章时可实时预览排版效果
- **多语言路由**: 访问 `/zh/posts`, `/en/posts` 等路由查看不同语言版本
- **全文搜索**: 使用 Cmd/Ctrl+K 快捷键唤起搜索框，支持中英文全文检索
- **SEO 优化**: 自动生成 sitemap.xml, robots.txt, RSS/Atom feed

---

## 文档

更多详细信息请参考：
- [TipTap + Supabase 设置指南](docs/TIPTAP_SUPABASE_SETUP.md)

## License

MIT
