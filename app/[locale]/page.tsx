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
import { HandDrawnStar, HandDrawnCloud, HandDrawnSmiley, HandDrawnScribble } from "@/shared/visuals/doodles";
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
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      
      {/* Background Graphic Decoration elements */}
      <div className="absolute top-[5%] left-[-5%] w-[400px] h-[400px] text-zinc-100 dark:text-zinc-800 -z-20 rotate-12 opacity-70">
        <CartoonBlob1 fill="currentColor" />
      </div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] text-zinc-100 dark:text-zinc-800 -z-20 -rotate-12 opacity-80">
        <CartoonBlob2 fill="currentColor" />
      </div>
      <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] text-zinc-100 dark:text-zinc-800 -z-20 -rotate-6 opacity-60">
        <CartoonBlob3 fill="currentColor" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Hero Section: 网站欢迎区域 */}
        <FadeIn className="w-full max-w-[980px] flex flex-col items-center justify-center gap-8 py-12 md:py-20 text-center relative mt-6">
          
          {/* Action-packed Cartoon Floating Accents */}
          <div className="absolute -top-12 left-10 md:left-20 w-24 h-24 text-emerald-300 rotate-12 drop-shadow-sm pointer-events-none hidden md:block">
            <CartoonBlob3 className="w-full h-full text-foreground/10" fill="#a7f3d0" />
            <HandDrawnCloud className="absolute inset-0 w-16 h-16 m-auto text-emerald-800" />
          </div>

          <div className="absolute top-10 right-2 md:right-16 w-32 h-32 text-amber-300 -rotate-[15deg] drop-shadow-sm pointer-events-none animate-[pulse_6s_ease-in-out_infinite]">
            <CartoonStarburst fill="#fde047" className="w-full h-full text-foreground/10 animate-[spin_30s_linear_infinite]" />
            <HandDrawnStar className="absolute inset-0 w-12 h-12 m-auto text-amber-600" />
          </div>

          <div className="absolute bottom-12 right-20 w-28 h-28 text-indigo-300 rotate-[25deg] drop-shadow-sm pointer-events-none hidden sm:block">
            <CartoonBlob2 fill="#c7d2fe" className="w-full h-full text-foreground/10" />
            <HandDrawnSmiley className="absolute inset-0 w-12 h-12 m-auto text-indigo-700" />
          </div>

          <div className="relative inline-flex flex-col items-center mt-8">
            <div className="absolute -inset-4 bg-yellow-200/50 dark:bg-yellow-900/30 -skew-y-2 rounded-2xl -z-10 sketch-ui"></div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-tight tracking-wider lg:leading-[1.1] relative z-10 text-slate-800 dark:text-slate-100 font-handwriting-cjk drop-shadow-sm">
              {settings.site_title || t('title')}
            </h1>
            <svg className="absolute -bottom-5 left-[5%] w-[90%] h-8 text-primary/80 opacity-90 -z-10" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
                d="M5,15 Q50,-5 100,10 T195,15" />
            </svg>
          </div>
          
          <div className="h-16 flex items-center justify-center mt-6 md:mt-10 w-full max-w-[85%] mx-auto">
            <h2 className="text-2xl md:text-4xl text-slate-700 dark:text-slate-200 relative font-bold text-center font-handwriting-cjk underline decoration-wavy decoration-emerald-400 decoration-4 underline-offset-[10px]">
              <TypewriterEffect text={settings.site_description || t('description')} speed={80} loop={true} />
            </h2>
          </div>

          <div className="flex w-full max-w-2xl flex-col items-center gap-6 mt-12 bg-white/50 dark:bg-black/20 p-6 rounded-3xl sketch-ui border-2 border-dashed border-foreground/15 backdrop-blur-sm relative">
            <div className="absolute -top-4 -right-4 rotate-12 bg-red-400 text-white font-bold px-3 py-1 sketch-ui shadow-sm text-sm border-2 border-foreground">
              Hello! 👋
            </div>
            <HomeButtons viewPostsText={t('viewPosts')} />
            <SiteUptimeBadge />
          </div>
        </FadeIn>

        {/* Posts Grid: 文章列表区域 */}
        <section className="w-full mt-12 max-w-6xl space-y-10 md:mt-16 pb-20 relative z-20">
          <FadeIn delay={0.2} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-4 border-foreground/80 pb-6 gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight flex items-center gap-4 text-foreground font-handwriting-cjk relative">
              <span className="w-4 h-10 bg-primary sketch-ui inline-block"></span>
              <span className="relative z-10">{t('latestPosts')}</span>
            </h2>
            <Link href="/posts" className="text-xl font-bold bg-primary text-primary-foreground px-6 py-2 sketch-ui hover:scale-105 active:scale-95 transition-all group flex items-center gap-2 font-handwriting-cjk border-2 border-foreground shadow-[4px_4px_0_0_currentColor]">
              {t('viewAll')} 
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
            </Link>
          </FadeIn>
          
          <PostList posts={posts.slice(0, 6)} readMoreText={tCommon('readMore')} />
        </section>
      </div>
    </div>
  );
}
