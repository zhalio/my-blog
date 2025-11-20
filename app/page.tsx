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

// 模拟博客数据
const posts = [
  {
    id: 1,
    title: "使用 Next.js 构建博客",
    summary: "学习如何使用 React 和 Next.js 搭建个人网站...",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Tailwind CSS 的魅力",
    summary: "为什么 utility-first CSS 框架如此流行？",
    date: "2023-10-05",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          我的个人博客
        </h1>
        <p className="mt-4 text-muted-foreground">
          分享技术、生活与思考
        </p>
      </header>

      <main className="container mx-auto max-w-2xl space-y-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.summary}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                {/* 这里暂时链接到 #，实际项目中链接到 /posts/[slug] */}
                <Link href="#">阅读更多</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}