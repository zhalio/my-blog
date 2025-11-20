import { posts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// 生成静态路径 (SSG)
export function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // 在 Next.js 15 中，params 需要被 await
  const { id } = await params;
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
      <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
        <Link href="/posts" className="flex items-center gap-2 text-muted-foreground">
          <ChevronLeft className="size-4" /> 返回列表
        </Link>
      </Button>
      
      <article className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 border-b pb-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time>{post.date}</time>
            <span>•</span>
            <span className="font-medium text-primary">{post.category}</span>
          </div>
        </div>
        
        <div 
          className="mt-8 leading-7 text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}