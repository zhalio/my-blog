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
            <Card className="flex h-full flex-col p-4 md:p-6 relative overflow-visible bg-background/80 backdrop-blur-md transition-all group-hover:border-foreground/30 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] group-hover:-translate-y-1">
              
              {/* Cute corner doodles hidden by default, visible on hover container */}
              <div className="absolute -top-4 -right-3 size-10 md:size-12 text-primary transform rotate-[15deg] group-hover:rotate-[25deg] group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-20 pointer-events-none drop-shadow-sm">
                <Icon className="fill-background stroke-[2.5px]" />
              </div>

              <CardHeader className="space-y-3 pt-2 px-0">
                <CardTitle className="line-clamp-2 text-xl md:text-2xl font-extrabold tracking-wide decoration-wavy decoration-2 underline-offset-4 group-hover:underline decoration-primary/60">
                  {post.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-3 text-sm md:text-base font-bold text-muted-foreground/70">
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

              <CardContent className="flex-1 pb-4 px-0">
                <p className="line-clamp-3 text-base leading-relaxed text-foreground/80 font-medium">
                  {post.summary || post.excerpt}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2.5 relative z-10">
                    {post.tags.slice(0, 3).map((tag, i) => (
                      <span key={tag} className="sketch-ui relative z-10 inline-flex items-center px-3 py-1 text-xs md:text-sm font-bold text-primary/80 bg-primary/10 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="sketch-ui relative z-10 inline-flex items-center px-2 py-1 text-xs md:text-sm font-bold text-muted-foreground/70 bg-muted/30">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pb-2 pt-4 border-t-2 border-foreground/10 border-dashed mt-auto px-0">
                <div className="flex w-full items-center justify-between font-bold text-lg md:text-xl text-primary/80 group-hover:text-primary transition-colors">
                  <span>{readMoreText}</span>
                  <HandDrawnArrow className="w-7 h-7 md:w-8 md:h-8 -rotate-6 group-hover:translate-x-1 group-hover:-rotate-2 transition-all stroke-[2.5px] fill-transparent" />
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
