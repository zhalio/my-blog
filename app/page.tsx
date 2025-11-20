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
import { ArrowRight, Github, MessageCircle } from "lucide-react";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData();
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Hero Section: 网站欢迎区域 */}
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          emmm的个人博客
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          分享技术、生活与思考，记录学习成长的点滴。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <Button asChild size="lg">
            <Link href="/posts">
              浏览文章 <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/zhemmmzh" target="_blank" rel="noreferrer">
              <Github className="mr-2 size-4" /> GitHub
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 size-4" /> QQ
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
          {posts.slice(0, 3).map((post) => (
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
                  <Link href={`/posts/${post.id}`} className="flex items-center">
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