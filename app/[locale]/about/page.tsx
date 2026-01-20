import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PostLayout } from "@/components/blog/post-layout";
import { FadeIn } from "@/components/visuals/fade-in";

// Enable ISR for about page (seconds)
export const revalidate = 3600; // Regenerate once per hour

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <PostLayout toc={[]}>
      <FadeIn>
        <article className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t('title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('description')}
            </p>
          </div>
          
          <div className="mt-8 leading-7 text-lg space-y-6">
            <p>{t('intro')}</p>
            <p>{t('content')}</p>
          </div>
        </article>
      </FadeIn>
    </PostLayout>
  );
}