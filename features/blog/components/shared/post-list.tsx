'use client';

import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
import { HandDrawnArrow, HandDrawnStar, HandDrawnSmiley, HandDrawnCloud } from "@/shared/visuals/doodles";
import { PostData } from "@/lib/types";

const DOODLES = [HandDrawnStar, HandDrawnSmiley, HandDrawnCloud];

const CARD_COLORS = [
  'bg-[#ffadad] dark:bg-[#6b2a2a]', 
  'bg-[#caffbf] dark:bg-[#2b592b]', 
  'bg-[#9bf6ff] dark:bg-[#1a5b5b]', 
  'bg-[#ffd6a5] dark:bg-[#734b1a]', 
  'bg-[#bdb2ff] dark:bg-[#2a2a6b]', 
  'bg-[#ffc6ff] dark:bg-[#6b2a6b]'
];

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
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {posts.map((post, i) => {
        const Icon = DOODLES[i % DOODLES.length];
        const thumbBg = CARD_COLORS[i % CARD_COLORS.length];

        return (
        <motion.article key={post.id} variants={item} className="h-full group">
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm transition-all hover:-translate-y-2 border border-slate-200/60 dark:border-zinc-800/60 shadow-sm hover:shadow-xl relative flex flex-col overflow-hidden">
            
            {/* Colorful Thumbnail Cover */}
            <div className={`h-40 sm:h-48 w-full relative overflow-hidden flex items-center justify-center transition-colors ${thumbBg}`}>
              {/* Subtle line pattern on cover */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:100%_12px]"></div>
              
              <Icon className="w-24 h-24 text-white/40 dark:text-black/20 stroke-2 fill-transparent group-hover:scale-125 group-hover:rotate-6 transition-transform duration-700 z-10" />
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 dark:bg-black/10 rounded-full blur-2xl z-0"></div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col relative bg-transparent">
              
              <time dateTime={post.date} className="absolute -top-4 left-6 px-4 py-1.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-full text-xs font-bold font-mono z-20 shadow-sm text-slate-500 dark:text-slate-400 group-hover:-translate-y-0.5 transition-transform border border-slate-100 dark:border-zinc-700">
                {new Date(post.date).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
                }).replace(/\//g, '.')}
              </time>

              <h3 className="line-clamp-2 text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors leading-snug mt-3 mb-3">
                {post.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed mb-6 line-clamp-3">
                {post.summary || post.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-800 flex flex-col gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-50/80 dark:bg-zinc-800/80 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors">
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between font-semibold text-sm text-slate-600 mt-2">
                  <span className="group-hover:text-primary transition-colors">{readMoreText}</span>
                  <HandDrawnArrow className="w-5 h-5 -rotate-[20deg] group-hover:translate-x-2 group-hover:rotate-0 transition-all stroke-2 fill-transparent text-primary/50 group-hover:text-primary" />
                </div>
              </div>

            </div>
          </Link>
        </motion.article>
        );
      })}
    </motion.div>
  );
}
