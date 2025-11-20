import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PostsPage() {
  const posts = getSortedPostsData();
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">所有文章</h1>
          <p className="text-xl text-muted-foreground">
            这里汇集了我所有的思考与教程。
          </p>
        </div>
      </div>
      <hr className="my-8" />
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
                <Link href={`/posts/${post.id}`} className="flex items-center">
                  阅读更多 <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}