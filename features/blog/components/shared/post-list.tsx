'use client';

import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
import { HandDrawnArrow, HandDrawnStar, HandDrawnSmiley, HandDrawnCloud } from "@/shared/visuals/doodles";
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
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
        <motion.article key={post.id} variants={item} className="h-full group">
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl p-6 bg-background sketch-ui transition-all hover:-translate-y-2 border-2 border-foreground/10 hover:border-foreground/30 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.15)] dark:hover:shadow-[8px_8px_0_0_rgba(255,255,255,0.15)] relative flex flex-col">
            
            {/* Cute corner doodles hidden by default, visible on hover */}
            <div className="absolute -top-4 -right-3 size-10 md:size-12 text-primary transform rotate-[15deg] group-hover:rotate-[25deg] group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-20 pointer-events-none drop-shadow-sm">
              <Icon className="fill-background stroke-[2.5px]" />
            </div>

            <header className="mb-4">
              <h3 className="text-xl md:text-2xl font-black tracking-wide text-foreground group-hover:text-primary transition-colors decoration-wavy decoration-2 underline-offset-4 group-hover:underline decoration-primary/60 line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <time dateTime={post.date} className="text-sm md:text-base font-bold text-muted-foreground/70 mt-3 block font-handwriting tracking-widest">
                {new Date(post.date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                }).replace(/\//g, '.')}
                {post.readingTime && <span className="ml-2">• {post.readingTime}</span>}
              </time>
            </header>

            <p className="text-base leading-relaxed text-foreground/80 font-medium mb-6 line-clamp-3 flex-1">
              {post.summary || post.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t-2 border-foreground/10 border-dashed flex flex-col gap-4">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="sketch-ui inline-flex items-center px-3 py-1 text-xs md:text-sm font-bold text-primary/80 bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      # {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between font-bold text-lg text-primary/80 group-hover:text-primary transition-colors mt-2">
                <span className="font-handwriting-cjk">{readMoreText}</span>
                <HandDrawnArrow className="w-7 h-7 -rotate-6 group-hover:translate-x-2 group-hover:-rotate-12 transition-all stroke-[2.5px] fill-transparent" />
              </div>
            </div>
          </Link>
        </motion.article>
        );
      })}
    </motion.div>
  );
}
