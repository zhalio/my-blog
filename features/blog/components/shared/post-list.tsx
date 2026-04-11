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
import { HandDrawnStar, HandDrawnArrow, HandDrawnSmiley, HandDrawnCloud } from "@/shared/visuals/doodles";
import { PostData } from "@/lib/types";

const DOODLES = [HandDrawnStar, HandDrawnSmiley, HandDrawnCloud];

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
      {posts.map((post, i) => {
        const Icon = DOODLES[i % DOODLES.length];
        return (
        <motion.div key={post.id} variants={item} className="h-full group">
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <Card className="sketch-ui flex h-full flex-col bg-card z-10 p-1 md:p-3 relative overflow-visible border-2 border-foreground hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.85)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.85)] transition-all duration-300">
              
              {/* Cute corner doodles hidden by default, visible on hover container */}
              <div className="absolute -top-4 -right-3 size-10 md:size-12 text-foreground transform rotate-[15deg] group-hover:rotate-[25deg] transition-transform opacity-0 group-hover:opacity-100 z-20 pointer-events-none drop-shadow-md">
                <Icon className="w-full h-full fill-background stroke-[2px]" />
              </div>

              <CardHeader className="space-y-3 pt-4">
                <CardTitle className="line-clamp-2 text-xl md:text-2xl font-extrabold tracking-wide decoration-wavy decoration-2 underline-offset-4 group-hover:underline">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-3 text-sm md:text-base font-bold text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: '2-digit', 
                      day: '2-digit' 
                    }).replace(/\//g, '.')}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <p className="line-clamp-3 text-base leading-relaxed text-foreground/80 font-medium">
                  {post.summary || post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 relative z-10">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={tag} className="sketch-ui relative z-10 inline-block bg-muted text-foreground px-3 py-1 text-xs md:text-sm font-bold border-2 border-transparent transition-colors group-hover:border-foreground group-hover:bg-background">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="sketch-ui relative z-10 inline-block bg-muted/50 text-muted-foreground px-2 py-1 text-xs md:text-sm font-bold border-2 border-transparent">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pb-3 pt-3 border-t-2 border-muted-foreground/30 border-dashed mx-6 -px-6 mt-auto">
                <div className="flex w-full items-center justify-between font-bold text-lg md:text-xl text-primary group-hover:text-foreground transition-colors">
                  <span>{readMoreText}</span>
                  <HandDrawnArrow className="w-6 h-6 md:w-8 md:h-8 -rotate-12 group-hover:translate-x-2 group-hover:-rotate-0 transition-transform stroke-[2.5px]" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
        );
      })}
    </motion.div>
  );
}
