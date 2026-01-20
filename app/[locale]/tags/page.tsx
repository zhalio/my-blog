import { getAllTags } from "@/lib/supabase-posts";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TagsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Tags');

  const tags = await getAllTags(locale);
  const sortedTags = tags.sort((a, b) => b.count - a.count);

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
      <div className="flex flex-wrap gap-4">
        {sortedTags.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name}`} className="no-underline">
            <div className="flex items-center gap-2 rounded-lg border p-3 hover:bg-muted transition-colors">
              <span className="text-lg font-medium">#{tag.name}</span>
              <span className="text-sm text-muted-foreground bg-muted-foreground/10 px-2 py-0.5 rounded-full">
                {tag.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
