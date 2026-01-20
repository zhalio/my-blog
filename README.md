# ZHalio's Blog

基于 Next.js 16、Tailwind CSS v4、TipTap 和 Supabase 构建的个人博客。

https://emmmxx.xyz

## 技术栈

- **框架**: Next.js 16 
- **样式**: Tailwind CSS v4
- **UI**: shadcn/ui, Framer Motion
- **内容管理**: TipTap 富文本编辑器 + Supabase PostgreSQL
- **国际化**: next-intl (支持 zh, en, fr, ja)
- **搜索**: Orama (客户端全文搜索)
- **统计**: Vercel Analytics & Speed Insights
- **数据库**: Upstash Redis (用于浏览量和点赞) + Supabase (文章存储)
- **评论**: Giscus

## 功能特性

- **写作**: 强大的 TipTap 富文本编辑器（支持代码块、表格、任务列表等）
- **完全控制**: 基于 Supabase 的自托管数据库，完整的数据所有权
- **实时预览**: 编辑即所见的内容展示
- **交互 UI**: 3D 卡片、磁力按钮、平滑滚动、暗色模式
- **互动**: 实时浏览量、点赞、GitHub 评论
- **SEO**: 自动生成 Sitemap、Robots.txt 和 Open Graph 图片
- **性能**: 图片优化、字体加载优化、极小的客户端 JS 体积

## 管理后台

本项目集成了完整的管理后台，基于 TipTap 编辑器。

### 访问管理后台

- **本地开发**: 访问 [http://localhost:3000/admin/posts](http://localhost:3000/admin/posts)
- **线上环境**: 访问 [https://emmmxx.xyz/admin/posts](https://emmmxx.xyz/admin/posts)

### 功能

- **所见即所得编辑**: TipTap 提供强大的富文本编辑体验
- **多语言支持**: 为每篇文章选择语言
- **标签管理**: 灵活的标签系统
- **草稿/发布**: 支持保存草稿和发布文章
- **自动统计**: 自动计算阅读时间

## 快速开始

1. **安装依赖**

```bash
pnpm install
```

2. **配置环境变量**

复制 `.env.local.example` 为 `.env.local` 并填入相关 Key。

3. **创建数据库**

在 Supabase 项目中执行 `supabase/schema.sql` 文件。

4. **启动开发服务器**

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 写作指南

访问 `/admin/posts` 路由，点击"新建文章"即可开始创建内容。

**文章包含以下字段:**

- **标题**: 文章标题
- **Slug**: URL 友好的路径 (自动生成或自定义)
- **描述**: 文章摘要
- **内容**: 使用 TipTap 编辑器编写的富文本内容
- **封面图**: 文章缩略图 URL
- **标签**: 多个标签支持
- **语言**: zh, en, fr, ja
- **发布状态**: 草稿或已发布

## 常用命令

| 命令                | 说明                                                   |
| ------------------- | ------------------------------------------------------ |
| `pnpm dev`        | 启动本地开发服务器                                     |
| `pnpm build`      | 构建生产版本                                           |
| `pnpm start`      | 启动生产服务器                                         |
| `pnpm lint`       | 运行代码检查                                           |

## 部署

本项目部署在 Vercel 上。

```bash
pnpm build
```

## 环境变量

请在 `.env.local` 或 Vercel 项目设置中配置以下变量：

### Supabase (必填)

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 项目 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名密钥
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase 服务角色密钥

### 功能支持 (选填)

- `UPSTASH_REDIS_REST_URL`: Redis URL (浏览量统计)
- `UPSTASH_REDIS_REST_TOKEN`: Redis Token
- `NEXT_PUBLIC_GISCUS_REPO`: Giscus 仓库 (评论系统)
- `NEXT_PUBLIC_GISCUS_REPO_ID`: Giscus 仓库 ID
- `NEXT_PUBLIC_GISCUS_CATEGORY`: Giscus 分类
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus 分类 ID

## 文档

更多详细信息请参考：
- [TipTap + Supabase 设置指南](docs/TIPTAP_SUPABASE_SETUP.md)
- [迁移完成总结](MIGRATION_COMPLETE.md)

## License

MIT
