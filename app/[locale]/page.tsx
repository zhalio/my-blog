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
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Hero Section: 网站欢迎区域 */}
        <FadeIn className="w-full max-w-[980px] flex flex-col items-center justify-center gap-8 py-12 md:py-20 text-center relative mt-6">
          
          {/* Hand-drawn Floating Accents */}
          <div className="absolute -top-4 right-10 md:right-32 text-amber-400 rotate-[15deg] md:scale-125 animate-[bounce_5s_ease-in-out_infinite] opacity-90 drop-shadow-sm">
            <HandDrawnStar className="w-12 h-12" />
          </div>

          <div className="absolute top-20 left-4 md:left-24 text-emerald-400 -rotate-[10deg] md:scale-125 animate-[pulse_4s_ease-in-out_infinite] opacity-90 drop-shadow-sm">
             <HandDrawnCloud className="w-16 h-16" />
          </div>

          <div className="absolute bottom-20 right-4 md:right-16 text-indigo-400 rotate-[15deg] md:scale-150 animate-[pulse_5s_ease-in-out_infinite] hidden sm:block opacity-80 drop-shadow-sm">
            <HandDrawnSmiley className="w-12 h-12" />
          </div>

          <div className="relative inline-flex flex-col items-center mt-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-wide lg:leading-[1.1] relative z-10 text-slate-800 dark:text-slate-100 font-handwriting-cjk">
              {settings.site_title || t('title')}
            </h1>
            <svg className="absolute -bottom-4 left-0 w-full h-8 text-primary/60 opacity-80 -z-10" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"
                d="M5,15 Q50,-5 100,10 T195,15" />
            </svg>
          </div>
          
          <div className="h-16 flex items-center justify-center mt-4 md:mt-8 w-full max-w-[80%] mx-auto">
            <h2 className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 relative font-bold text-center font-handwriting-cjk">
              <TypewriterEffect text={settings.site_description || t('description')} speed={80} loop={true} />
            </h2>
          </div>

          <div className="flex w-full max-w-2xl flex-col items-center gap-6 mt-8">
            <HomeButtons viewPostsText={t('viewPosts')} />
            <SiteUptimeBadge />
          </div>
        </FadeIn>

        {/* Posts Grid: 文章列表区域 */}
        <section className="w-full mt-12 max-w-6xl space-y-10 md:mt-16">
          <FadeIn delay={0.2} className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-foreground/10 border-dashed pb-6 gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3 text-foreground font-handwriting-cjk relative">
              <span className="relative z-10">{t('latestPosts')}</span>
              <HandDrawnScribble className="absolute -bottom-3 left-0 w-full h-6 text-primary/40 -z-10" />
            </h2>
            <Link href="/posts" className="text-lg font-bold text-muted-foreground hover:text-primary transition-colors group flex items-center gap-2 font-handwriting-cjk">
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
