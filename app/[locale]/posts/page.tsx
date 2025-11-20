import { getSortedPostsData } from "@/lib/posts";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PostList } from "@/components/post-list";

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Posts');
  const tCommon = await getTranslations('Common');

  const posts = getSortedPostsData(locale);
  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">{t('title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <PostList posts={posts} readMoreText={tCommon('readMore')} />
    </div>
  );
}