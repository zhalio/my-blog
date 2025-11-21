# My Blog Project

这是一个基于 Next.js 构建的个人博客项目，集成了现代化的技术栈和便捷的写作工作流。

## ✨ 特性

- **框架**: [Next.js 15](https://nextjs.org/) (App Router, Static Export)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/)
- **国际化**: [next-intl](https://next-intl-docs.vercel.app/) (支持中文、英文、法文、日文)
- **内容管理**: 
  - **本地 CMS**: 集成 [Decap CMS](https://decapcms.org/)，提供可视化写作体验
  - **Markdown**: 传统文件驱动，支持 Frontmatter
- **阅读体验**:
  - **阅读进度条**: 顶部显示阅读进度
  - **阅读时间**: 自动计算文章阅读时长
  - **图片缩放**: 点击图片查看大图 (Medium Zoom)
  - **代码高亮**: [rehype-pretty-code](https://rehype-pretty.pages.dev/) (支持双主题自动切换，一键复制)
- **全站搜索**: 客户端模糊搜索 (Fuse.js)，支持快捷键 (⌘K) 唤起
- **动画效果**: [Framer Motion](https://www.framer.com/motion/) (页面过渡、滚动显现、列表交错动画)
- **交互体验**: 文章侧边栏目录 (TOC)、一键回到顶部、响应式布局
- **留言板**: 集成 [Giscus](https://giscus.app/) 评论系统
- **SEO**: 自动生成 Sitemap 和 Robots.txt，完善的 Metadata 配置
- **主题**: 支持亮色/暗色模式切换

## 🛠️ 本地运行

1. **安装依赖**

```bash
npm install
```

2. **启动开发环境**

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看博客。

## ✍️ 写作指南

### 方式一：使用可视化 CMS (推荐)

集成了 Decap CMS，支持本地可视化编辑。

1. **启动 CMS 代理服务** (保持运行)
   ```bash
   npm run cms
   ```

2. **启动开发服务器** (如果未运行)
   ```bash
   npm run dev
   ```

3. **访问后台**
   打开 [http://localhost:3000/admin](http://localhost:3000/admin) 即可进入管理界面。

### 方式二：使用命令行脚本

快速创建一个新的文章模板：

```bash
npm run new
```
按照提示输入标题、文件名等信息，脚本会自动生成带有 Frontmatter 的 Markdown 文件。

### 方式三：手动创建

在 `content/posts/` 目录下创建 Markdown 文件。
文件名格式：`slug.locale.md` (例如 `my-post.zh.md`)。

Frontmatter 示例：

```yaml
---
title: 文章标题
date: '2025-11-20'
category: Tech
summary: 文章摘要...
image: /images/cover.jpg # 可选封面图
---
```

## 🚀 发布与部署

### 一键发布

当你完成写作并准备提交代码时，可以使用以下命令自动添加、提交并推送代码：

```bash
npm run publish
```

### 部署

本项目配置为静态导出 (`output: 'export'`)，构建后会生成 `out/` 目录。
推荐部署到 [Vercel](https://vercel.com/)、[Netlify](https://www.netlify.com/) 或 GitHub Pages。

构建命令：
```bash
npm run build
```

## 📁 项目结构

- `app/`: Next.js App Router 页面和布局
  - `(root)/`: 根路由重定向
  - `[locale]/`: 国际化路由页面
  - `admin/`: CMS 页面入口
- `components/`: React 组件
- `content/`: 博客文章和页面 Markdown 文件
- `i18n/`: 国际化配置
- `messages/`: 国际化翻译 JSON 文件
- `lib/`: 工具函数 (文章解析、日期处理等)
- `public/`: 静态资源 (图片、CMS 配置)
- `scripts/`: 自动化脚本

## 📄 License

MIT

