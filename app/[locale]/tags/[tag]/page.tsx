import { getSanitySortedPostsData, getSanityAllTags } from "@/lib/sanity-posts";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PostList } from "@/components/blog/post-list";

const locales = ['zh', 'en', 'fr', 'ja'];

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  
  for (const locale of locales) {
    const tags = await getSanityAllTags(locale);
    Object.keys(tags).forEach((tag) => {
      params.push({ locale, tag });
    });
  }

  return params;
}

export default async function TagPage({ params }: { params: Promise<{ locale: string; tag: string }> }) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Tags');
  const tCommon = await getTranslations('Common');

  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getSanitySortedPostsData(locale);
  const posts = allPosts.filter((post) => post.tags && post.tags.includes(decodedTag));

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">#{decodedTag}</h1>
          <p className="text-xl text-muted-foreground">
            {t('count', { count: posts.length })}
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <PostList posts={posts} readMoreText={tCommon('readMore')} />
    </div>
  );
}
