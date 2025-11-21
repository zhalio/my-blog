import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Comments } from "@/components/comments";
import { FadeIn } from "@/components/fade-in";
import { TypewriterEffect } from "@/components/typewriter-effect";

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function GuestbookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Guestbook');

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <FadeIn className="mx-auto max-w-3xl">
        <div className="space-y-4 border-b pb-8 mb-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t('title')}</h1>
          <div className="text-xl text-muted-foreground h-8">
            <TypewriterEffect text={t('description')} />
          </div>
        </div>
        
        <Comments />
      </FadeIn>
    </div>
  );
}
