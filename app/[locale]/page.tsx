import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, MessageCircle } from "lucide-react";
import { getSortedPostsData } from "@/lib/posts";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';
import { PostList } from "@/components/post-list";
import { FadeIn } from "@/components/fade-in";

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
  const posts = getSortedPostsData(locale);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Hero Section: 网站欢迎区域 */}
      <FadeIn className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          {t('title')}
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          {t('description')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          <Button asChild size="lg">
            <Link href="/posts">
              {t('viewPosts')} <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://github.com/zhemmmzh" target="_blank" rel="noreferrer">
              <Github className="mr-2 size-4" /> GitHub
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 size-4" /> QQ
            </Link>
          </Button>
        </div>
      </FadeIn>

      {/* Posts Grid: 文章列表区域 */}
      <section className="mx-auto max-w-5xl space-y-8">
        <FadeIn delay={0.2} className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-bold tracking-tight">{t('latestPosts')}</h2>
          <Link href="/posts" className="text-sm font-medium text-muted-foreground hover:text-primary">
            {t('viewAll')} &rarr;
          </Link>
        </FadeIn>
        
        <PostList posts={posts.slice(0, 3)} readMoreText={tCommon('readMore')} />
      </section>
    </div>
  );
}