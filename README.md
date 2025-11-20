# My Blog Project

这是一个基于 Next.js 构建的个人博客项目。

## ✨ 特性

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/) (支持中文、英文、法文、日文)
- **内容管理**: Markdown 文件驱动，支持 Frontmatter
- **代码高亮**: [rehype-pretty-code](https://rehype-pretty.pages.dev/) (支持双主题自动切换)
- **主题**: 支持亮色/暗色模式切换

## 🛠️ 本地运行

1. **克隆项目**

```bash
git clone <repository-url>
cd my-blog
```

2. **安装依赖**

```bash
npm install
```

3. **启动开发服务器**

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📁 项目结构

- `app/`: Next.js App Router 页面和布局
- `components/`: React 组件 (包含 UI 组件和功能组件)
- `content/`: 博客文章 Markdown 文件
- `i18n/`: 国际化配置
- `messages/`: 国际化翻译文件
- `lib/`: 工具函数和数据获取逻辑
- `public/`: 静态资源

## 📝 撰写文章

在 `content/posts/` 目录下创建 Markdown 文件。
文件名格式建议：`slug.locale.md` (例如 `js-learning.zh.md`)。

Frontmatter 示例：

```yaml
---
title: 文章标题
date: '2024-03-20'
category: 技术
summary: 文章摘要...
---
```

## 🚀 部署

推荐使用 [Vercel](https://vercel.com/) 进行部署。

