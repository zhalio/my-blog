# TipTap + Supabase 博客系统配置指南

## 📋 项目概述

这个博客系统使用：
- **TipTap** - 强大的富文本编辑器
- **Supabase** - PostgreSQL 数据库 + 后端服务
- **Next.js 16** - React 框架
- **Vercel** - 部署平台

## 🚀 快速开始

### 1. 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project" 创建新项目
3. 记录以下信息（在 Project Settings > API）：
   - Project URL (例如: `https://xxx.supabase.co`)
   - anon public key
   - service_role key (可选，仅用于服务端)

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入 Supabase 凭据：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. 创建数据库表

1. 打开 Supabase Dashboard
2. 进入 "SQL Editor"
3. 复制 `supabase/schema.sql` 的全部内容
4. 粘贴并执行

这将创建：
- `posts` - 文章表
- `pages` - 页面表
- `tags` - 标签表
- `media` - 媒体文件表
- 所有必要的索引和触发器

### 4. 配置 Storage（可选，用于图片上传）

1. 在 Supabase Dashboard 进入 "Storage"
2. 创建新 bucket: `blog-images`
3. 设置为 Public bucket
4. 配置 Storage policies 允许上传和读取

### 5. 启动开发服务器

```bash
pnpm dev
```

服务器启动后：
- 博客首页: http://localhost:3000
- 管理后台: http://localhost:3000/admin/posts

## 📝 使用指南

### 创建第一篇文章

1. 访问 http://localhost:3000/admin/posts
2. 点击"新建文章"
3. 填写标题、Slug 等信息
4. 使用 TipTap 编辑器编写内容
5. 点击"发布"或"保存草稿"

### TipTap 编辑器功能

**基础格式化：**
- 粗体、斜体、下划线、删除线
- 标题（H1-H3）
- 行内代码、高亮

**列表：**
- 无序列表
- 有序列表
- 任务列表（待办事项）

**高级功能：**
- 代码块（带语法高亮）
- 引用块
- 表格
- 图片
- 链接
- 文本对齐（左/中/右）

**快捷键：**
- `Ctrl/Cmd + B` - 粗体
- `Ctrl/Cmd + I` - 斜体
- `Ctrl/Cmd + Z` - 撤销
- `Ctrl/Cmd + Shift + Z` - 重做
- `Ctrl/Cmd + K` - 添加链接

### API 端点

#### 获取文章列表
```http
GET /api/admin/posts?locale=zh&published=true&tag=技术
```

#### 获取单篇文章
```http
GET /api/admin/posts/[id]
```

#### 创建文章
```http
POST /api/admin/posts
Content-Type: application/json

{
  "title": "文章标题",
  "slug": "article-slug",
  "content": {...},  // TipTap JSON
  "description": "文章简介",
  "tags": ["技术", "教程"],
  "locale": "zh",
  "published": true
}
```

#### 更新文章
```http
PUT /api/admin/posts/[id]
Content-Type: application/json

{
  "title": "更新的标题",
  ...
}
```

#### 删除文章
```http
DELETE /api/admin/posts/[id]
```

## 🎨 自定义样式

### 修改编辑器样式

编辑 `components/editor/tiptap-editor.tsx`：

```tsx
editorProps: {
  attributes: {
    class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none...'
  }
}
```

### 修改代码块主题

编辑 `app/globals.css` 中的 Sugar High 变量：

```css
pre code {
  --sh-class: #2d5e9d;
  --sh-identifier: #354150;
  --sh-sign: #8996a3;
  --sh-string: #007f7a;
  --sh-keyword: #e02518;
  --sh-comment: #a19595;
  --sh-jsxliterals: #6266d1;
  --sh-property: #e25a1c;
  --sh-entity: #e25a1c;
}
```

## 🚀 部署到 Vercel

### 1. 推送到 GitHub

```bash
git add .
git commit -m "Setup TipTap + Supabase blog"
git push
```

### 2. 连接 Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 导入 GitHub 仓库
3. 配置环境变量（复制 .env.local 的内容）
4. 点击 Deploy

### 3. 配置域名（可选）

1. 在 Vercel 项目设置中添加自定义域名
2. 按照指引配置 DNS

## 🔧 高级配置

### 启用全文搜索

数据库已经创建了全文搜索索引，可以在 API 中使用：

```typescript
const { data } = await supabase
  .from('posts')
  .select('*')
  .textSearch('title', '搜索关键词')
```

### 添加认证

当前系统允许所有人访问管理后台。生产环境需要添加认证：

1. 在 Supabase 启用 Auth
2. 修改 `app/admin/layout.tsx` 添加登录检查
3. 更新数据库 RLS 策略

### 优化图片

使用 Supabase Storage 的图片转换：

```typescript
const imageUrl = supabase.storage
  .from('blog-images')
  .getPublicUrl('image.jpg', {
    transform: {
      width: 800,
      height: 600,
      quality: 80
    }
  })
```

## 📚 数据库结构

### posts 表
- `id` - UUID 主键
- `title` - 标题
- `slug` - URL 友好的标识符
- `content` - TipTap JSON 格式内容
- `description` - SEO 简介
- `cover_image` - 封面图片 URL
- `tags` - 标签数组
- `locale` - 语言代码
- `published` - 是否发布
- `published_at` - 发布时间
- `views` - 浏览量
- `reading_time` - 阅读时间（分钟）

### 关键功能
- 自动更新 `updated_at` 时间戳
- 标签计数自动维护
- 全文搜索索引
- 行级安全策略（RLS）

## 🐛 故障排除

### 1. 无法连接到 Supabase

检查：
- `.env.local` 文件是否正确配置
- Supabase URL 和 Key 是否正确
- 网络连接是否正常

### 2. SQL 执行失败

确保：
- 已启用 UUID 扩展
- 按顺序执行全部 SQL
- 检查 Supabase SQL Editor 的错误信息

### 3. 编辑器不显示

检查：
- TipTap 相关包是否安装完整
- 浏览器控制台是否有错误
- 确保所有依赖版本兼容

### 4. 代码高亮不工作

确认：
- `lowlight` 已安装
- `CodeBlockLowlight` 扩展已正确配置
- CSS 样式已加载

## 📖 相关文档

- [TipTap Documentation](https://tiptap.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 💡 提示

- 定期备份 Supabase 数据库
- 使用 Git 进行版本控制
- 监控 Supabase 使用量
- 定期更新依赖包
- 考虑添加图片压缩和 CDN
- 实施内容备份策略
