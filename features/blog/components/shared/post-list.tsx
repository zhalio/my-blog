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
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl p-6 bg-[#fffaf0] dark:bg-zinc-900 sketch-ui transition-all hover:-translate-y-2 border-4 border-foreground shadow-[6px_6px_0_0_currentColor] dark:shadow-[6px_6px_0_0_#ffffff] hover:shadow-[10px_10px_0_0_#f43f5e] relative flex flex-col">
            
            {/* Cute corner doodles hidden by default, visible on hover */}
            <div className="absolute -top-6 -right-6 size-12 md:size-16 text-[#f43f5e] transform rotate-[15deg] group-hover:rotate-[25deg] group-hover:scale-125 transition-all opacity-0 group-hover:opacity-100 z-20 pointer-events-none drop-shadow-sm">
              <Icon className="fill-transparent stroke-[3px]" />
            </div>

            <header className="mb-4 relative">
              <h3 className="text-2xl md:text-3xl font-black tracking-wide text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <time dateTime={post.date} className="text-sm md:text-base font-bold text-foreground/60 mt-3 flex items-center gap-2 font-mono tracking-widest bg-black/5 dark:bg-white/10 w-fit px-3 py-1 rounded-full sketch-ui">
                {new Date(post.date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                }).replace(/\//g, '.')}
                {post.readingTime && <span className="text-foreground/40 font-bold">• {post.readingTime}</span>}
              </time>
            </header>

            <p className="text-base leading-relaxed text-foreground/80 font-medium mb-6 line-clamp-3 my-4 flex-1">
              {post.summary || post.excerpt}
            </p>

            <div className="mt-auto pt-4 border-t-4 border-foreground border-solid flex flex-col gap-4">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="sketch-ui inline-flex items-center px-3 py-1 text-xs md:text-sm font-bold text-foreground bg-[#ffde59] border-2 border-foreground group-hover:scale-105 transition-all">
                      # {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between font-bold text-xl text-foreground group-hover:text-primary transition-colors mt-2">
                <span className="font-handwriting-cjk underline decoration-wavy underline-offset-4">{readMoreText}</span>
                <HandDrawnArrow className="w-8 h-8 -rotate-6 group-hover:translate-x-3 group-hover:-rotate-12 transition-all stroke-[3px] fill-transparent text-primary" />
              </div>
            </div>
          </Link>
        </motion.article>
        );
      })}
    </motion.div>
  );
}
