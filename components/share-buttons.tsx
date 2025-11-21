'use client';

import { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const t = useTranslations('Common');
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2 flex items-center gap-1">
        <Share2 className="h-4 w-4" />
        {t('share')}
      </span>
      <Button variant="outline" size="icon" onClick={onCopy} title={t('copyLink')} className="h-8 w-8">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">{t('copyLink')}</span>
      </Button>
    </div>
  );
}
