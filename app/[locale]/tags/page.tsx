import { getPublishedPosts } from "@/lib/supabase/posts";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Hash } from 'lucide-react';

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TagsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Tags');

  // Build tags directly from all published posts so this is a true "all tags" page.
  const posts = await getPublishedPosts('zh');
  const tagCountMap = new Map<string, number>();

  for (const post of posts) {
    const tags = post.tags || [];
    for (const tag of tags) {
      const normalizedTag = tag.trim();
      if (!normalizedTag) continue;
      tagCountMap.set(normalizedTag, (tagCountMap.get(normalizedTag) || 0) + 1);
    }
  }

  const sortedTags = Array.from(tagCountMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  const totalPosts = sortedTags.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col items-start gap-5 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-3">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">{t('title')}</h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            {sortedTags.length} 个标签
          </span>
          <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            {totalPosts} 次归档
          </span>
        </div>
      </div>
      <hr className="my-8" />

      {sortedTags.length === 0 ? (
        <div className="rounded-2xl border border-border/70 bg-background/70 px-6 py-10 text-center text-muted-foreground backdrop-blur">
          暂无标签数据
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTags.map((tag) => (
            <Link key={tag.name} href={`/tags/${tag.name}`} className="group block no-underline">
              <article className="flex h-full flex-col rounded-2xl border border-border/70 bg-gradient-to-r from-background/90 via-background/82 to-background/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-200 group-hover:-translate-y-1 group-hover:border-border dark:border-white/6 dark:from-zinc-900/40 dark:via-zinc-900/30 dark:to-zinc-900/20 dark:shadow-lg dark:shadow-black/20">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/80 text-muted-foreground dark:border-white/12 dark:bg-white/8">
                  <Hash className="h-4 w-4" />
                </div>
                <h2 className="line-clamp-1 text-lg font-semibold text-foreground">{tag.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t('count', { count: tag.count })}</p>
                <div className="mt-4 inline-flex items-center text-sm text-foreground/75 transition-colors group-hover:text-primary">
                  查看标签
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
