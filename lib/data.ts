export type Post = {
  id: number;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "使用 Next.js 构建博客",
    summary: "学习如何使用 React 和 Next.js 搭建个人网站，从零开始配置环境、安装依赖并部署到 GitHub Pages。",
    content: `
      <p>Next.js 是一个用于构建全栈 Web 应用程序的 React 框架。它提供了许多开箱即用的功能，如服务器端渲染 (SSR)、静态站点生成 (SSG) 和 API 路由。</p>
      <h3 class="text-xl font-bold mt-4 mb-2">为什么选择 Next.js？</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>性能优化：</strong> 自动代码分割和图像优化。</li>
        <li><strong>SEO 友好：</strong> 服务器端渲染让搜索引擎更容易抓取内容。</li>
        <li><strong>开发体验：</strong> 快速刷新 (Fast Refresh) 和强大的路由系统。</li>
      </ul>
      <p class="mt-4">在本教程中，我们将从零开始搭建一个博客...</p>
    `,
    date: "2023-10-01",
    category: "Tech",
  },
  {
    id: 2,
    title: "Tailwind CSS 的魅力",
    summary: "为什么 utility-first CSS 框架如此流行？深入探讨 Tailwind CSS 的核心概念、优势以及在现代前端开发中的应用。",
    content: `
      <p>Tailwind CSS 是一个功能类优先 (utility-first) 的 CSS 框架。与 Bootstrap 等传统框架不同，它不提供预先设计的组件，而是提供了一组低级的功能类。</p>
      <h3 class="text-xl font-bold mt-4 mb-2">核心概念</h3>
      <p>通过组合 text-center, p-4, mt-10 等类名，你可以快速构建出独特的界面，而无需离开 HTML。</p>
    `,
    date: "2023-10-05",
    category: "Design",
  },
  {
    id: 3,
    title: "我的第一次更新",
    summary: "这是我通过 Git Push 自动部署上来的新文章！体验 CI/CD 流水线带来的便捷与高效。",
    content: `
      <p>自动化部署 (CI/CD) 是现代软件开发流程中不可或缺的一部分。通过 GitHub Actions，我们可以轻松实现代码提交后自动构建和部署。</p>
      <p class="mt-4">这次更新验证了我的流水线配置是正确的！</p>
    `,
    date: "2025-11-20",
    category: "Life",
  },
];