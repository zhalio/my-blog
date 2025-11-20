import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="space-y-4">
        <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('intro')}
        </p>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 space-y-6 text-lg leading-relaxed">
          <p>
            {t('description')}
          </p>

          <h2 className="text-2xl font-bold tracking-tight mt-8">{t('contactTitle')}</h2>
          <p>
            {t('contactDesc')}
          </p>
          <div className="flex gap-4">
             <Button variant="outline" asChild>
              <Link href="https://github.com/zhemmmzh" target="_blank">
                <Github className="mr-2 size-4" /> GitHub
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://qm.qq.com/cgi-bin/qm/qr?k=GJV7-av-NF7gsXV13umV8RqQC0Cum5zo" target="_blank">
                <MessageCircle className="mr-2 size-4" /> QQ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}