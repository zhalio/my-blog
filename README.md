# Emmm's Blog

基于 Next.js 15、Tailwind CSS v4 和 shadcn/ui 构建的个人博客。

https://emmmxx.xyz

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS v4
- **UI**: shadcn/ui, Framer Motion
- **内容管理 (CMS)**: Sanity (Headless CMS) + Markdown
- **国际化**: next-intl (支持 zh, en, fr, ja)
- **搜索**: Orama (客户端全文搜索)
- **统计**: Vercel Analytics & Speed Insights
- **数据库**: Upstash Redis (用于浏览量和点赞)
- **评论**: Giscus

## 功能特性

- **双模写作**: 支持本地 Markdown 文件写作，也支持通过 Sanity Studio 在线写作（支持移动端）。
- **实时预览**: 在 Sanity Studio 中编辑时可实时预览文章效果。
- **动态内容**: 基于 Markdown 的文章，支持代码高亮 (`rehype-pretty-code`)。
- **交互 UI**: 3D 卡片、磁力按钮、平滑滚动、暗色模式。
- **互动**: 实时浏览量、点赞、GitHub 评论。
- **SEO**: 自动生成 Sitemap、Robots.txt 和 Open Graph 图片。
- **性能**: 图片优化、字体加载优化、极小的客户端 JS 体积。

## 在线写作 (Sanity CMS)

本项目集成了 Sanity Studio，提供了一个强大的在线写作环境。

### 1. 访问 Studio

- **本地开发**: 访问 [http://localhost:3000/studio](http://localhost:3000/studio)
- **线上环境**: 访问 [https://emmmxx.xyz/studio](https://emmmxx.xyz/studio)

### 2. 功能

- **随时随地写作**: 支持电脑和手机端访问，草稿自动保存到云端。
- **Markdown 支持**: 内置 Markdown 编辑器，体验与本地写作一致。
- **多语言管理**: 在编辑器中直接选择文章语言。

### 3. 数据迁移

如果你有本地的 Markdown 文章想要迁移到 Sanity 云端，可以使用内置脚本：

```bash
# 1. 生成导入数据
node scripts/migrate-to-sanity.mjs

# 2. 登录 Sanity (如果未登录)
npx sanity login

# 3. 导入数据
npx sanity dataset import sanity-data.ndjson production
```

## 快速开始

1. **安装依赖**

```bash
npm install
```

2. **配置环境变量**

复制 `.env.local.example` 为 `.env.local` 并填入相关 Key。

3. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 写作指南

### 方式一：在线写作 (推荐)
访问 `/studio` 路由，登录后即可创建和编辑文章。文章会自动同步到云端数据库。

### 方式二：本地写作
在 `content/posts/` 目录下创建一个新的 Markdown 文件。
文件名格式：`slug.locale.md` (例如 `hello-world.zh.md`)。

**Frontmatter 模板:**

```yaml
---
title: 你的文章标题
date: 2025-11-22
summary: 文章的简短摘要。
tags:
  - Tech
  - Next.js
---
```

## 常用命令

| 命令                | 说明                                                   |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`     | 启动本地开发服务器                                     |
| `npm run build`   | 构建生产版本                                           |
| `npm run publish` | 一键提交代码并推送到远程仓库 (git add & commit & push) |
| `npm run lint`    | 运行代码检查                                           |

## 部署

本项目部署在 Vercel 上。

```bash
npm run build
```

## 环境变量

请在 `.env.local` 或 Vercel 项目设置中配置以下变量：

### Sanity CMS (必填)
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity 项目 ID
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity 数据集 (通常为 production)

### 功能支持 (选填)
- `UPSTASH_REDIS_REST_URL`: Redis URL (浏览量统计)
- `UPSTASH_REDIS_REST_TOKEN`: Redis Token
- `NEXT_PUBLIC_GISCUS_REPO`: Giscus 仓库 (评论系统)
- `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus 仓库 ID
- `NEXT_PUBLIC_GISCUS_CATEGORY`: Giscus 分类
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus 分类 ID

## License

MIT
