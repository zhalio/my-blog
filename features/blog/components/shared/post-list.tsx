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
          <Link href={`/posts/${post.slug}`} className="block h-full outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-[2rem] bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-4 hover:scale-[1.02] border-[4px] border-slate-900 dark:border-slate-800 shadow-[8px_8px_0_0_rgba(15,23,42,1)] dark:shadow-[8px_8px_0_0_rgba(15,23,42,1)] hover:shadow-[12px_12px_0_0_rgba(15,23,42,1)] dark:hover:shadow-[12px_12px_0_0_rgba(15,23,42,1)] active:translate-y-2 active:shadow-none relative flex flex-col overflow-hidden">

            {/* Colorful Thumbnail Cover - Vibrant flat aesthetic */}
            <div className={`h-40 sm:h-48 w-full relative overflow-hidden flex items-center justify-center transition-colors border-b-[4px] border-slate-900 dark:border-slate-800 ${thumbBg}`}>
              {/* Halftone / Dot pattern overlay for cartoon feel */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '20px 20px', color: 'rgba(0,0,0,0.5)' }}></div>

              <Icon className="w-24 h-24 text-slate-900 dark:text-slate-100 drop-shadow-[4px_4px_0_rgba(255,255,255,0.8)] dark:drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] stroke-[3px] fill-white/50 dark:fill-slate-900/50 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10" />
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col relative bg-transparent">  

              <div className="absolute -top-4 left-6 px-4 py-1 tracking-wider bg-white dark:bg-slate-700 rounded-[1rem] text-xs font-black text-slate-900 dark:text-slate-100 group-hover:-translate-y-2 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-[3px] border-slate-900 dark:border-slate-800 shadow-[3px_3px_0_0_rgba(15,23,42,1)]">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  }).replace(/\//g, '.')}
                </time>
              </div>

              <h3 className="line-clamp-2 text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors leading-snug mt-6 mb-3 font-heading" style={{wordBreak: "break-word"}}>
                {post.title}
              </h3>

              <p className="text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed mb-6 line-clamp-3 selection:bg-pink-300">
                {post.summary || post.excerpt}
              </p>

              <div className="mt-auto pt-4 border-t-[3px] border-dashed border-slate-200 dark:border-slate-700 flex flex-col gap-4">
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-amber-300 dark:bg-amber-600 border-[2px] border-slate-900 shadow-[2px_2px_0_0_rgba(15,23,42,1)] text-slate-900 dark:text-slate-100 hover:-translate-y-1 rounded-full text-xs font-black transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-help">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between font-black text-[15px] mt-2 group-hover:text-pink-500 text-slate-800 dark:text-slate-200 transition-colors uppercase tracking-wider">        
                  <span className="font-heading">{readMoreText}</span>
                  <div className="w-10 h-10 rounded-full border-[3px] border-slate-900 bg-emerald-300 dark:bg-emerald-600 flex items-center justify-center group-hover:scale-110 shadow-[2px_2px_0_0_rgba(15,23,42,1)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
