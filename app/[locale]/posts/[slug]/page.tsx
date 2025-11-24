import { Link } from "@/i18n/routing";
import { getSanitySortedPostsData, getSanityPostData } from "@/lib/sanity-posts";
import { notFound } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';
import { PostLayout } from "@/components/blog/post-layout";
import { FadeIn } from "@/components/visuals/fade-in";
import { ArticleContent } from "@/components/blog/article-content";
import { PostBreadcrumb } from "@/components/blog/post-breadcrumb";
import { FallbackBanner } from '@/components/blog/fallback-banner';
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostStats } from "@/components/blog/post-stats";

const locales = ['zh', 'en', 'fr', 'ja'];

// 生成静态路径 (SSG)
export async function generateStaticParams() {
  // We can use 'zh' or any locale to get the list of all slugs
  const posts = await getSanitySortedPostsData('zh');
  const params = [];
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.id });
    }
  }
  return params;
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getSanityPostData(slug, locale);

  if (!post) {
    notFound();
  }

  // If the returned post language is different from the UI locale (e.g. fallback to 'zh'),
  // show a small hint to the user.
  const showFallbackNote = post.language && post.language !== locale;
  const fallbackMessage = {
    zh: '仅有中文版本',
    en: 'This article is only available in Chinese',
    fr: 'Cet article est uniquement disponible en chinois',
    ja: 'この記事は中国語のみ対応しています',
  }[locale] || 'This article is only available in Chinese';

  return (
    <PostLayout toc={post.toc || []}>
      <FadeIn>
        <PostBreadcrumb title={post.title} />
        
        <article className="prose dark:prose-invert max-w-none">
          {showFallbackNote && (
            <FallbackBanner postId={post.id} message={fallbackMessage} />
          )}
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="flex items-start justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 text-muted-foreground text-sm">
                <time dateTime={post.date} className="whitespace-nowrap text-sm">{new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {post.readingTime && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="hidden sm:inline">•</span>
                    <span className="sm:inline">{post.readingTime}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <PostStats slug={slug} />
                <ShareButtons 
                  url={`https://emmmxx.xyz/${locale}/posts/${slug}`} 
                />
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map(tag => (
                  <Link key={tag} href={`/tags/${tag}`} className="no-underline">
                    <span className="text-sm bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      #{tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <ArticleContent 
            className="mt-8 leading-7 text-base md:text-lg"
            html={post.contentHtml || ''} 
          />
        </article>
      </FadeIn>
    </PostLayout>
  );
}
