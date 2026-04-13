'use client';

import { motion } from 'framer-motion';
import { Link } from "@/i18n/routing";
import { HandDrawnArrow, HandDrawnStar, HandDrawnSmiley, HandDrawnCloud, HandDrawnPlanet, HandDrawnSparkle, HandDrawnSwirl } from "@/shared/visuals/doodles";
import { CartoonBlob1, CartoonBlob2, CartoonBlob3 } from "@/shared/visuals/cartoon-shapes";
import { PostData } from "@/lib/types";

const DOODLES = [HandDrawnStar, HandDrawnSmiley, HandDrawnCloud, HandDrawnPlanet, HandDrawnSparkle, HandDrawnSwirl];
const BLOBS = [CartoonBlob1, CartoonBlob2, CartoonBlob3];

const CARD_COLORS = [
  { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-500 dark:text-blue-300', blob: 'text-blue-200 fill-blue-100 dark:text-blue-400/20 dark:fill-blue-500/10' },
  { bg: 'bg-emerald-100 dark:bg-emerald-500/20', text: 'text-emerald-500 dark:text-emerald-300', blob: 'text-emerald-200 fill-emerald-100 dark:text-emerald-400/20 dark:fill-emerald-500/10' },
  { bg: 'bg-amber-100 dark:bg-amber-500/20', text: 'text-amber-500 dark:text-amber-300', blob: 'text-amber-200 fill-amber-100 dark:text-amber-400/20 dark:fill-amber-500/10' },
  { bg: 'bg-indigo-100 dark:bg-indigo-500/20', text: 'text-indigo-500 dark:text-indigo-300', blob: 'text-indigo-200 fill-indigo-100 dark:text-indigo-400/20 dark:fill-indigo-500/10' },
  { bg: 'bg-rose-100 dark:bg-rose-500/20', text: 'text-rose-500 dark:text-rose-300', blob: 'text-rose-200 fill-rose-100 dark:text-rose-400/20 dark:fill-rose-500/10' },     
  { bg: 'bg-violet-100 dark:bg-violet-500/20', text: 'text-violet-500 dark:text-violet-300', blob: 'text-violet-200 fill-violet-100 dark:text-violet-400/20 dark:fill-violet-500/10' }
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
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem] bg-[#fffcf5] dark:bg-slate-800 transition-all duration-500 shadow-[8px_8px_0px_rgba(203,213,225,0.4)] dark:shadow-[8px_8px_0px_rgba(30,41,59,0.4)] hover:-translate-y-3 hover:translate-x-2 hover:-rotate-2 hover:shadow-[16px_16px_0px_rgba(203,213,225,0.7)] dark:hover:shadow-[16px_16px_0px_rgba(30,41,59,0.7)] border-2 border-slate-200 dark:border-slate-700/80 active:translate-y-1 active:translate-x-1 active:shadow-[2px_2px_0px_rgba(203,213,225,0.8)] dark:active:shadow-[2px_2px_0px_rgba(30,41,59,0.8)] relative flex flex-col overflow-hidden group">
            
            {/* Soft inner dashed border for hand-drawn planner feel */}
            <div className="absolute inset-2 md:inset-3 border-2 border-dashed border-slate-200/60 dark:border-slate-600/30 rounded-[1.25rem] pointer-events-none z-30 transition-colors group-hover:border-slate-300 dark:group-hover:border-slate-500/50" />

            {/* Thumbnail Cover - Rich colorful blocks */}
            <div className="h-40 sm:h-48 w-full relative overflow-hidden flex items-center justify-center transition-colors bg-white dark:bg-slate-900/50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#334155_1px,transparent_1px)]">              {/* Decorative Blob */}
              {(() => {
                const Blob = BLOBS[i % BLOBS.length];
                return (
                  <Blob className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] animate-[spin_40s_linear_infinite] opacity-90 group-hover:scale-[1.1] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${thumbBg.blob}`}/>
                )
              })()}

              {/* Additional scattered doodles within the card banner */}       
              <HandDrawnStar className={`absolute top-4 left-4 w-8 h-8 opacity-0 -translate-y-2 group-hover:opacity-80 group-hover:translate-y-0 group-hover:rotate-[360deg] transition-all duration-700 delay-100 ${thumbBg.text}`} />
              <HandDrawnSparkle className={`absolute bottom-4 left-1/4 w-6 h-6 opacity-0 translate-y-2 group-hover:opacity-80 group-hover:translate-y-0 group-hover:animate-pulse transition-all duration-700 delay-200 ${thumbBg.text}`} />    
              <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/20 backdrop-blur-[1px] transition-all duration-500 group-hover:backdrop-blur-sm"></div>
              <div className={`w-20 h-20 bg-white dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,0.06)] dark:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-2 border-slate-100 dark:border-slate-700 ${thumbBg.text}`}>
                <Icon className="w-10 h-10 drop-shadow-sm" />
              </div>
            </div>

            {/* Card Body */}
            <div className="px-6 py-7 md:px-8 pb-8 flex-1 flex flex-col relative bg-transparent z-20">
              
              {/* Cute Washi Tape effect top center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 dark:bg-yellow-600/30 backdrop-blur-[2px] rotate-[-2deg] shadow-sm transform hover:rotate-2 transition-transform duration-300"></div>

              <div className="absolute -top-4 left-6 px-3.5 py-1 tracking-wider bg-white dark:bg-slate-800 backdrop-blur-md rounded-full text-xs font-black text-slate-600 dark:text-slate-300 group-hover:-translate-y-1 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-2 border-slate-200 dark:border-slate-600 shadow-[2px_2px_0px_rgba(203,213,225,0.5)] dark:shadow-[2px_2px_0px_rgba(30,41,59,0.5)]">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\//g, '.')}
                </time>
              </div>

              <h3 className="line-clamp-2 text-xl md:text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors leading-[1.3] mt-4 mb-3 font-heading" style={{wordBreak: "break-word"}}>
                {post.title}
              </h3>

              <p className="text-sm md:text-[15px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                {post.summary || post.excerpt}
              </p>

              <div className="mt-auto pt-5 border-t-2 border-dashed border-slate-200 dark:border-slate-700/60 flex flex-col gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white dark:bg-slate-800/50 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-primary rounded-lg border-2 border-slate-100 dark:border-slate-700 text-[11px] font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between font-black text-xs md:text-sm mt-2 text-slate-400 dark:text-slate-500 transition-colors uppercase tracking-widest">
                  <span className="flex items-center gap-2 group-hover:text-sky-500 transition-colors">
                    {readMoreText}
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/40 transition-colors duration-300 overflow-hidden">
                       <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-sky-500 dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </span>
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
