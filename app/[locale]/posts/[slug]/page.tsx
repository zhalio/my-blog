import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';
import { PostLayout } from "@/components/blog/post-layout";
import { FadeIn } from "@/components/visuals/fade-in";
import { ArticleContent } from "@/components/blog/article-content";
import { PostBreadcrumb } from "@/components/blog/post-breadcrumb";
import { ShareButtons } from "@/components/blog/share-buttons";

const locales = ['zh', 'en', 'fr', 'ja'];

// 生成静态路径 (SSG)
export function generateStaticParams() {
  // We can use 'zh' or any locale to get the list of all slugs
  const posts = getSortedPostsData('zh');
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

  const post = await getPostData(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <PostLayout toc={post.toc || []}>
      <FadeIn>
        <PostBreadcrumb title={post.title} />
        
        <article className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-muted-foreground">
                <time>{post.date}</time>
                <span>•</span>
                <span className="font-medium text-primary">{post.category}</span>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
              <ShareButtons 
                url={`https://emmmxx.xyz/${locale}/posts/${slug}`} 
              />
            </div>
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
