---
title: 关于本博客
date: '2025-11-22'
summary: 这是emmm的个人博客
---

# My Blog

基于 Next.js 15、Tailwind CSS v4 和 shadcn/ui 构建的个人博客。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS v4
- **UI**: shadcn/ui, Framer Motion
- **内容**: Markdown (支持 Frontmatter)
- **国际化**: next-intl (支持 zh, en, fr, ja)
- **搜索**: Orama (客户端全文搜索)
- **统计**: Vercel Analytics & Speed Insights
- **数据库**: Upstash Redis (用于浏览量和点赞)
- **评论**: Giscus

## 功能特性

- **动态内容**: 基于 Markdown 的文章，支持代码高亮 (`rehype-pretty-code`)。
- **交互 UI**: 3D 卡片、磁力按钮、平滑滚动、暗色模式。
- **互动**: 实时浏览量、点赞、GitHub 评论。
- **SEO**: 自动生成 Sitemap、Robots.txt 和 Open Graph 图片。
- **性能**: 图片优化、字体加载优化、极小的客户端 JS 体积。

## 快速开始

1. **安装依赖**

```bash
npm install
```

2. **启动开发服务器**

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 写作指南

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

## 常用命令 (备忘)

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run publish` | 一键提交代码并推送到远程仓库 (git add & commit & push) |
| `npm run lint` | 运行代码检查 |

## 部署

本项目部署在 Vercel 上。

```bash
npm run build
```

## 环境变量

请在 `.env.local` 或 Vercel 项目设置中配置以下变量：

- `UPSTASH_REDIS_REST_URL`: Redis URL
- `UPSTASH_REDIS_REST_TOKEN`: Redis Token
- `NEXT_PUBLIC_GISCUS_REPO`: Giscus 仓库
- `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus 仓库 ID
- `NEXT_PUBLIC_GISCUS_CATEGORY`: Giscus 分类
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus 分类 ID

## License

MIT

