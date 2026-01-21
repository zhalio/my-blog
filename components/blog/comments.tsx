'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Comments() {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [enabled, setEnabled] = useState(true); // Default to true to prevent hydration mismatch if possible, or fetch early
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSettings() {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            // If feature_flags is present, use it. Default to true if not found/error mostly? 
            // Better defaulting: If data.settings exists, respect it.
            if (data.settings?.feature_flags) {
                setEnabled(data.settings.feature_flags.enable_comments !== false); // Default true unless explicitly false
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }
    checkSettings();
  }, []);

  if (loading) return null; // Or a skeleton
  if (!enabled) return (
      <div className="py-10 text-center text-muted-foreground border-t mt-10">
          <p>由于技术原因或维护需要，评论区已暂时关闭。</p>
      </div>
  );

  return (
    <div className="mt-10 animate-in fade-in slide-in-from-bottom-2">
      <Giscus
        id="comments"
        repo="zhalio/my-blog"
        repoId="R_kgDOQZTj3g"
        category="Announcements"
        categoryId="DIC_kwDOQZTj3s4CyBgh"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={currentTheme === 'dark' ? 'dark' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
