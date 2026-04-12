import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getPublishedPosts } from "@/lib/supabase/posts";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import { PostList } from "@/features/blog/components/shared/post-list";
import { FadeIn } from "@/shared/visuals/fade-in";
import { HomeButtons } from "@/features/blog/effects/home-buttons";
import { SiteUptimeBadge } from "@/shared/components/common/site-uptime";
import { getSiteSettings } from "@/lib/site-settings";
import { TypewriterEffect } from "@/shared/visuals/typewriter-effect";
import { GridPattern } from "@/shared/effects/background-pattern";
import { Particles } from "@/shared/effects/particles";
import { SpotlightCard } from "@/shared/visuals/spotlight-card";
import { TextShimmer } from "@/shared/visuals/text-shimmer";

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
    <div className="relative overflow-hidden flex flex-col justify-start pb-12 w-full">
      
      {/* 现代动效与结构化背景层 */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden h-[1000px] max-h-[100vh]">
         {/* 微光网格背景提供专业的科技感 */}
         <GridPattern className="opacity-[0.15] dark:opacity-[0.05]" />
         
         {/* 粒子交互效果增加灵动感和科技感 */}
         <Particles 
            className="absolute inset-0" 
            quantity={80} 
            ease={80} 
            color="#38bdf8" 
         />
      </div>
      {/* 内容区域 */}
      <div className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-20 lg:py-24 xl:py-32 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-16 md:gap-20 lg:gap-24 xl:gap-32 relative z-10">
        
        {/* 左侧文字与按钮区 */}
        <FadeIn className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20 w-full lg:pr-4 xl:pr-10">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm border border-emerald-200/50 dark:border-emerald-700/30 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-default group mb-6 md:mb-8 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <TextShimmer className="text-[10px] sm:text-xs md:text-sm tracking-wide font-heading uppercase font-bold text-emerald-700 dark:text-emerald-400" shimmerWidth={150}>
              Welcome to my digital garden
            </TextShimmer>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6rem] xl:text-[6.5rem] font-black leading-[1.1] text-slate-800 dark:text-slate-100 tracking-tight z-10 font-heading relative inline-block group mb-6 md:mb-8">
            <span className="relative z-10 inline-block px-1">{settings.site_title || t('title')}</span>
          </h1>

          <div className="relative w-full max-w-[90%] sm:max-w-md md:max-w-2xl mx-auto lg:mx-0 cursor-default mb-8 md:mb-12">
             <div className="relative min-h-[60px] sm:min-h-[80px] text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed sm:leading-relaxed z-10 w-full max-w-xl text-center lg:text-left mx-auto lg:mx-0 transition-all duration-300 flex items-start justify-center lg:justify-start">
               <TypewriterEffect text={settings.site_description || t('description')} speed={50} waitBeforeDelete={6000} />
             </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 relative z-20">
             <HomeButtons viewPostsText={t('viewPosts')} />
             <SiteUptimeBadge />
          </div>
          
          {/* Removed decorative doodles below buttons to reduce visual noise */}
        </FadeIn>

        {/* 右侧个人卡片 */}
        <FadeIn delay={0.2} className="w-full lg:w-[480px] xl:w-[500px] flex justify-center lg:justify-end xl:justify-center relative mt-16 sm:mt-24 lg:my-0 lg:pl-10">

          {/* Main Profile Card - Neo-Brutalism & Playful design */}
          <SpotlightCard className="relative w-full max-w-[280px] sm:max-w-[320px] bg-white/90 dark:bg-slate-800/90 p-8 sm:p-10 pb-10 sm:pb-12 shadow-[8px_8px_0px_#e2e8f0] dark:shadow-[8px_8px_0px_#1e293b] z-20 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-700 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[14px_14px_0px_#cbd5e1] dark:hover:shadow-[14px_14px_0px_#0f172a] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group flex flex-col items-center backdrop-blur-sm" spotlightColor="rgba(56, 189, 248, 0.2)">

             {/* Decorative Top Pill */}
             <div className="absolute top-5 right-6 sm:top-8 sm:right-8 px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-300 text-[9px] sm:text-[10px] font-bold rounded-full border border-slate-200/50 dark:border-slate-600/50 shadow-sm backdrop-blur-md z-30 tracking-widest uppercase">
                 HELLO
             </div>

             {/* Circular Avatar */}
             <div className="w-32 h-32 sm:w-40 sm:h-40 mt-6 sm:mt-8 relative bg-slate-50 dark:bg-slate-800/50 rounded-full border-[4px] sm:border-[6px] border-white dark:border-slate-700/80 shadow-md group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden">
                <Image src="/images/touxiang.jpg" alt="Avatar" fill priority sizes="(max-width: 640px) 128px, 160px" className="object-cover" />
             </div>

             {/* Content */}
             <div className="mt-8 sm:mt-10 text-center flex flex-col gap-2 relative z-20 w-full">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-heading tracking-tight hover:text-sky-500 transition-colors mb-1">
                  Hi, I&apos;m emmm!
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 sm:py-2.5 mt-2 rounded-full flex items-center justify-center gap-1.5 mx-auto border border-slate-100 dark:border-slate-700/80 shadow-sm shadow-slate-100 dark:shadow-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                  Frontend Developer
                </span>
             </div>
          </SpotlightCard>
        </FadeIn>
      </div>

      {/* Posts Grid: 文章列表区域 */}
      <section className="w-full mt-8 md:mt-16 lg:mt-20 max-w-[1280px] mx-auto px-4 md:px-8 space-y-10 md:space-y-12 relative z-20">
        <FadeIn delay={0.2} className="flex items-center justify-between pb-8 gap-6 relative">
          {/* Subtle separator line instead of heavy border */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>
          
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight flex items-center gap-4 text-slate-800 dark:text-white z-10 font-heading">
            <span>{t('latestPosts')}</span>
          </h2>

          <Link href="/posts" className="text-sm md:text-base font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-6 py-2.5 group flex items-center gap-2 border border-slate-200 dark:border-slate-700/50 shadow-sm rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] tracking-wide">
            {t('viewAll')} 
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-1 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </FadeIn>
        
        <PostList posts={posts.slice(0, 6)} readMoreText={tCommon('readMore')} />
      </section>
    </div>
  );
}
