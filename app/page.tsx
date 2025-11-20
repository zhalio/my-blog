import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "使用 Next.js 构建博客",
    summary: "学习如何使用 React 和 Next.js 搭建个人网站，从零开始配置环境、安装依赖并部署到 GitHub Pages。",
    date: "2023-10-01",
    category: "Tech",
  },
  {
    id: 2,
    title: "Tailwind CSS 的魅力",
    summary: "为什么 utility-first CSS 框架如此流行？深入探讨 Tailwind CSS 的核心概念、优势以及在现代前端开发中的应用。",
    date: "2023-10-05",
    category: "Design",
  },
  {
    id: 3,
    title: "我的第一次更新",
    summary: "这是我通过 Git Push 自动部署上来的新文章！体验 CI/CD 流水线带来的便捷与高效。",
    date: "2025-11-20",
    category: "Life",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Hero Section: 网站欢迎区域 */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          我的个人博客
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          分享技术、生活与思考。在这里，我记录学习成长的点滴，探索编程世界的奥秘。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <Button asChild size="lg">
            <Link href="/posts">
              浏览文章 <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="mr-2 size-4" /> GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* Posts Grid: 文章列表区域 */}
      <section className="mx-auto max-w-5xl space-y-8">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-bold tracking-tight">最新文章</h2>
          <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-primary">
            查看全部 &rarr;
          </Link>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 text-sm text-muted-foreground font-medium text-primary/80">
                  {post.category}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-muted-foreground text-sm">
                  {post.summary}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-start px-0 hover:bg-transparent hover:text-primary">
                  <Link href="#" className="flex items-center">
                    阅读更多 <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}