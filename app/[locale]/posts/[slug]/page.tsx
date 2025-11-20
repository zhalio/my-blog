import { getSortedPostsData, getPostData } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PostLayout } from "@/components/post-layout";

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
  const tCommon = await getTranslations('Common');

  const post = await getPostData(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <PostLayout toc={post.toc || []}>
      <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
        <Link href="/posts" className="flex items-center gap-2 text-muted-foreground">
          <ChevronLeft className="size-4" /> {tCommon('back')}
        </Link>
      </Button>
      
      <article className="prose dark:prose-invert max-w-none">
        <div className="space-y-4 border-b pb-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <time>{post.date}</time>
            <span>•</span>
            <span className="font-medium text-primary">{post.category}</span>
          </div>
        </div>
        
        <div 
          className="mt-8 leading-7 text-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} 
        />
      </article>
    </PostLayout>
  );
}
