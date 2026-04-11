import { Link } from "@/i18n/routing";
import { getPublishedPosts } from "@/lib/supabase/posts";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import { PostList } from "@/features/blog/components/shared/post-list";
import { FadeIn } from "@/shared/visuals/fade-in";
import { HomeButtons } from "@/features/blog/effects/home-buttons";
import { SiteUptimeBadge } from "@/shared/components/common/site-uptime";
import { getSiteSettings } from "@/lib/site-settings";
import { TypewriterEffect } from "@/shared/visuals/typewriter-effect";
import { HandDrawnArrow, HandDrawnStar, HandDrawnCloud, HandDrawnSmiley, HandDrawnScribble } from "@/shared/visuals/doodles";
import { CartoonBlob1, CartoonBlob2, CartoonBlob3, CartoonStarburst } from "@/shared/visuals/cartoon-shapes";

export const revalidate = 60;

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tCommon = await getTranslations('Common');
  const settings = await getSiteSettings();
  const posts = await getPublishedPosts('zh');

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-start pb-20">
      
      {/* 居中错落式相册布局 */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* 左侧文字与按钮区 */}
        <FadeIn className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 mt-8 lg:mt-0 z-20">
          
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border-2 border-white/50 dark:border-white/10 shadow-lg shadow-purple-200/50 dark:shadow-none rounded-full font-bold text-slate-700 dark:text-purple-100 transition-all hover:scale-105 backdrop-blur-md">
            <span className="text-xl animate-pulse">✨</span> 
            <span className="text-sm md:text-base tracking-wide font-heading">Welcome to my digital garden</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black leading-tight lg:leading-[1.15] text-slate-800 dark:text-white tracking-tight mt-4 z-10 font-heading drop-shadow-sm">
            {settings.site_title || t('title')}
          </h1>

          <div className="relative w-full max-w-xl mx-auto lg:mx-0 mt-6 group">
             <div className="absolute -inset-4 bg-gradient-to-br from-amber-100 to-rose-50 dark:from-amber-900/30 dark:to-rose-900/20 rounded-[2.5rem] -z-10 border border-white/60 dark:border-white/5 shadow-xl shadow-amber-100/50 dark:shadow-none transition-transform group-hover:scale-[1.02]"></div>
             <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-bold p-4 leading-relaxed font-heading">
               <TypewriterEffect text={settings.site_description || t('description')} speed={80} loop={true} />
             </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8 w-full">
            <HomeButtons viewPostsText={t('viewPosts')} />
          </div>
        </FadeIn>

        {/* 右侧现代圆润 Bento 卡片区 */}
        <FadeIn delay={0.2} className="w-full lg:w-[480px] flex justify-center relative my-12 lg:my-0 group">
          
          {/* Accent graphics behind */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-fuchsia-300 to-purple-400 opacity-30 dark:opacity-20 blur-3xl rounded-full z-10" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-cyan-300 to-blue-400 opacity-30 dark:opacity-20 blur-3xl rounded-full z-10" />

          {/* Main Floating Card */}
          <div className="relative w-full max-w-[360px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-4 hover:shadow-[0_40px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 z-20 rounded-[3rem] overflow-hidden">
             
             {/* Decorative Top Pill */}
             <div className="absolute top-6 right-8 px-4 py-1.5 bg-gradient-to-r from-amber-200 to-orange-300 text-orange-900 text-xs font-black rounded-full shadow-sm">
                 HELLO
             </div>
             
             {/* Circular Avatar Container */}
             <div className="w-full aspect-square mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 overflow-hidden relative flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-white dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-500">
                {/* 替换以前粗糙的手绘笑脸，使用圆润可爱的简单 SVG 元素 */}
                <div className="relative z-20 flex flex-col items-center justify-center space-y-4">
                   <div className="flex gap-6">
                      <div className="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200 animate-bounce" style={{animationDelay: "0ms"}}></div>
                      <div className="w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200 animate-bounce" style={{animationDelay: "150ms"}}></div>
                   </div>
                   <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-slate-800 dark:text-slate-200">
                     <path d="M4 4C12 20 36 20 44 4" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                   </svg>
                </div>

                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent z-10"></div>
             </div>
             
             {/* Content */}
             <div className="mt-8 text-center flex flex-col gap-2">
                <span className="text-3xl font-black text-slate-800 dark:text-white font-heading tracking-tight">
                  Hi, I'm emmm!
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full inline-block mx-auto">
                  Frontend Developer 🌈
                </span>
             </div>
          </div>

        </FadeIn>
      </div>

      {/* Posts Grid: 文章列表区域 */}
      <section className="w-full mt-24 max-w-[1280px] mx-auto px-4 md:px-8 space-y-12 relative z-20">
        <FadeIn delay={0.2} className="flex items-center justify-between pb-6 gap-6 relative border-b border-slate-200/60 dark:border-slate-800">
          
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight flex items-center gap-4 text-slate-800 dark:text-white z-10 font-heading">
            <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-sky-400 to-indigo-500 text-white rounded-[1.2rem] shadow-lg shadow-indigo-500/30">
               <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
            </div>
            <span>{t('latestPosts')}</span>
          </h2>

          <Link href="/posts" className="text-base font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-6 py-3 hover:bg-slate-50 hover:scale-105 group flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full transition-all tracking-wide">
            {t('viewAll')} 
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </FadeIn>
        
        <PostList posts={posts.slice(0, 6)} readMoreText={tCommon('readMore')} />
      </section>
    </div>
  );
}
