'use client';

import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
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
import { PostData } from "@/lib/types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
};

interface PostListProps {
  posts: PostData[];
  readMoreText: string;
}

export function PostList({ posts, readMoreText }: PostListProps) {
  return (
    <motion.div 
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item} className="h-full">
          <Card className="group/card flex h-full flex-col rounded-2xl border border-white/16 bg-gradient-to-r from-white/28 via-white/14 to-emerald-50/20 shadow-lg shadow-emerald-500/5 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-white/24 hover:from-white/34 hover:via-white/18 hover:to-emerald-50/24 dark:border-white/6 dark:from-zinc-900/40 dark:via-zinc-900/30 dark:to-emerald-900/14">
              <CardHeader className="space-y-3">
                <CardTitle className="line-clamp-2 text-lg">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="relative inline-block no-underline text-foreground transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/80 after:transition-all after:duration-200 group-hover/card:after:w-full"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm text-zinc-500/90 transition-colors duration-200 group-hover/card:text-zinc-300">
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {post.summary || post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link key={tag} href={`/tags/${tag}`} className="relative z-10 no-underline">
                        <span className="rounded-md border border-white/18 bg-gradient-to-r from-white/30 via-white/18 to-emerald-50/26 px-2 py-1 text-xs text-zinc-700/80 backdrop-blur-md transition-colors hover:text-primary dark:border-white/8 dark:from-zinc-900/52 dark:via-zinc-900/40 dark:to-emerald-900/20 dark:text-zinc-300/85">
                          #{tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-start px-0 text-foreground/80 transition-colors hover:bg-transparent hover:text-primary">
                  <Link href={`/posts/${post.slug}`} className="flex items-center">
                    {readMoreText} <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
