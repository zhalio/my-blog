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
import { PostData } from "@/lib/posts";
import { ThreeDCard } from "@/components/visuals/3d-card";

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
  show: { opacity: 1, y: 0 }
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
          <ThreeDCard className="h-full">
            <Card className="flex flex-col h-full border-none bg-transparent shadow-none">
              <CardHeader>
                <div className="mb-2 text-sm text-muted-foreground font-medium text-primary/80">
                  {post.category}
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>{post.date}</span>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-muted-foreground text-sm">
                  {post.summary}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full justify-start px-0 hover:bg-transparent hover:text-primary">
                  <Link href={`/posts/${post.id}`} className="flex items-center">
                    {readMoreText} <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </ThreeDCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
