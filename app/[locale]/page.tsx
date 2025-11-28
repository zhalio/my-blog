import { Link } from "@/i18n/routing";
import { getSanitySortedPostsData } from "@/lib/sanity-posts";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import { PostList } from "@/components/blog/post-list";
import { FadeIn } from "@/components/visuals/fade-in";
import { TypewriterEffect } from "@/components/visuals/typewriter-effect";
import { TextShimmer } from "@/components/visuals/text-shimmer";
import { HomeButtons } from "@/components/effects/home-buttons";

export const revalidate = 60;

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations('Home');
  const tCommon = await getTranslations('Common');
  // Content is authored in Chinese. Always fetch Chinese posts regardless of UI locale.
  const posts = await getSanitySortedPostsData('zh');

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-10">
        {/* Hero Section: 网站欢迎区域 */}
        <FadeIn className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            <TextShimmer className="inline-block">
              {t('title')}
            </TextShimmer>
          </h1>
          <div className="max-w-[750px] text-lg text-muted-foreground sm:text-xl h-8">
            <TypewriterEffect text={t('description')} speed={150} waitBeforeDelete={5000} />
          </div>
          <HomeButtons viewPostsText={t('viewPosts')} />
        </FadeIn>

        {/* Posts Grid: 文章列表区域 */}
        <section className="mx-auto max-w-5xl space-y-8 mt-12">
          <FadeIn delay={0.2} className="flex items-center justify-between border-b pb-2">
            <h2 className="text-2xl font-bold tracking-tight">{t('latestPosts')}</h2>
            <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-primary">
              {t('viewAll')} &rarr;
            </Link>
          </FadeIn>
          
          <PostList posts={posts.slice(0, 3)} readMoreText={tCommon('readMore')} />
        </section>
      </div>
    </div>
  );
}
