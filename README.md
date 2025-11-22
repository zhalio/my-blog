# Emmm's Blog

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
  - **链接预览**: 悬停显示外部链接预览卡片
  - **代码高亮**: [rehype-pretty-code](https://rehype-pretty.pages.dev/) (支持双主题自动切换，一键复制)
- **全站搜索**: 客户端全文搜索 (Orama + Mandarin Tokenizer)，支持精确匹配与快捷键 (⌘K) 唤起
- **数据统计**: 集成 [Umami Analytics](https://umami.is/) (隐私友好)
- **订阅服务**: 
  - **RSS**: 自动生成 RSS Feed
  - **邮件**: 集成 [Resend](https://resend.com/) API 提供邮件订阅
- **视觉特效**: 集成 [Vanta.js](https://www.vantajs.com/) (3D 动态背景，支持多种效果切换)、[Canvas Confetti](https://github.com/catdad/canvas-confetti) (交互庆典效果)、[Lottie](https://lottiefiles.com/) (404 动画)
- **动画效果**: [Framer Motion](https://www.framer.com/motion/) (页面过渡、滚动显现、列表交错动画)
- **交互体验**: 文章侧边栏目录 (TOC，支持智能滚动同步)、一键回到顶部、响应式布局
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

## 🌐 国际化与自动翻译

本项目支持多语言（目前配置为 zh, en, fr, ja）。为了简化维护，提供了自动化翻译脚本，利用 Google Translate API 将中文 (`zh.json`) 自动同步到其他语言文件。

### 增量翻译 (推荐)

当你添加了新的中文词条后，运行此命令，脚本只会翻译新增的部分：

```bash
npm run translate
```

### 全量重译

如果需要重新生成所有语言的翻译（例如修改了翻译逻辑或想刷新内容）：

```bash
npm run translate:all
```

### 文章翻译

自动扫描 `content/posts/` 下的中文文章 (`*.zh.md`)，并生成缺失的其他语言版本（en, fr, ja）。脚本会自动翻译 Frontmatter（标题、摘要）和正文，同时保留代码块格式。

```bash
npm run translate:post
```

> **提示**: 机器翻译可能会偶尔破坏复杂的 Markdown 格式（如表格），建议生成后进行人工检查。

### README 同步

将根目录的 `README.md` 内容自动同步到“关于”页面 (`content/pages/about.zh.md`)。

```bash
npm run sync:readme
```

**最佳实践流**: 修改 README -> `npm run sync:readme` -> `npm run translate:post` -> 全站关于页面更新完成。

> **注意**: 所有翻译脚本默认尝试使用本地代理 `http://127.0.0.1:7890` 以解决网络问题。如果你的代理端口不同，请设置环境变量 `HTTPS_PROXY`。

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

