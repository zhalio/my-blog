import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { PostLayout } from "@/components/blog/post-layout";
import { FadeIn } from "@/components/visuals/fade-in";
import { TipTapRenderer } from "@/components/editor/tiptap-renderer";
import { supabase } from '@/lib/supabase/client';

// Enable ISR for about page (seconds)
export const revalidate = 300; // Regenerate at most once per 5 minutes

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function getAboutPost(locale: string) {
  // Try locale first, then fallback to zh
  const fetchPost = async (loc: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', 'about')
      .eq('locale', loc)
      .eq('published', true)
      .single();

    if (error) return null;
    return data;
  };

  const current = await fetchPost(locale);
  if (current) return current;
  if (locale !== 'zh') {
    const fallback = await fetchPost('zh');
    if (fallback) return fallback;
  }
  return null;
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const post = await getAboutPost(locale);
  if (!post) {
    notFound();
  }

  const toc: any[] = [];

  return (
    <PostLayout toc={toc}>
      <FadeIn>
        <article className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
            {post.description && (
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>
            )}
          </div>

          <TipTapRenderer
            className="mt-8 leading-7 text-base md:text-lg"
            content={post.content}
            toc={toc}
          />
        </article>
      </FadeIn>
    </PostLayout>
  );
}