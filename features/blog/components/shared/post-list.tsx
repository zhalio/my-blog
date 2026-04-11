'use client';

import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
import { HandDrawnArrow, HandDrawnStar, HandDrawnSmiley, HandDrawnCloud } from "@/shared/visuals/doodles";
import { PostData } from "@/lib/types";

const DOODLES = [HandDrawnStar, HandDrawnSmiley, HandDrawnCloud];

const CARD_COLORS = [
  'bg-[#ffdfba] dark:bg-orange-950', // pastel orange
  'bg-[#ffffba] dark:bg-yellow-950', // pastel yellow
  'bg-[#baffc9] dark:bg-green-950',  // pastel green
  'bg-[#bae1ff] dark:bg-sky-950',    // pastel blue
  'bg-[#ffb3ba] dark:bg-rose-950',   // pastel pink
  'bg-[#e2c6ff] dark:bg-purple-950'  // pastel purple
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
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem] bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-2 border-2 border-slate-100 dark:border-slate-800 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] relative flex flex-col overflow-hidden">
            
            {/* Colorful Thumbnail Cover */}
            <div className={`h-40 sm:h-48 w-full relative overflow-hidden flex items-center justify-center transition-colors ${thumbBg}`}>
              {/* Soft decorative blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

              <Icon className="w-24 h-24 text-white/90 drop-shadow-md stroke-[2px] fill-white/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 z-10" />
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col relative bg-transparent">
              
              <div className="absolute -top-4 left-6 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-[1rem] text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:-translate-y-1 transition-transform border border-slate-100 dark:border-slate-700 shadow-sm border-b-[3px] border-b-slate-200 dark:border-b-slate-700">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                  }).replace(/\//g, '.')}
                </time>
              </div>

              <h3 className="line-clamp-2 text-xl md:text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors leading-snug mt-4 mb-3" style={{wordBreak: "break-word"}}>
                {post.title}
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3">
                {post.summary || post.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between font-bold text-[15px] mt-2 group-hover:text-primary text-slate-400 transition-colors">
                  <span className="font-heading">{readMoreText}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-500 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </div>
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
