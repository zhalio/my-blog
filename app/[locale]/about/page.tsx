import { setRequestLocale } from 'next-intl/server';
import { getSanityPageData } from "@/lib/sanity-posts";
import { PostLayout } from "@/components/blog/post-layout";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/visuals/fade-in";
import { ArticleContent } from "@/components/blog/article-content";

const locales = ['zh', 'en', 'fr', 'ja'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let pageData;

  try {
    pageData = await getSanityPageData('about', locale);
  } catch (e) {
    console.error("Failed to fetch from Sanity:", e);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <PostLayout toc={pageData.toc || []}>
      <FadeIn>
        <article className="prose dark:prose-invert max-w-none">
          <div className="space-y-4 border-b pb-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{pageData.title}</h1>
            {pageData.summary && (
               <p className="text-xl text-muted-foreground">
                 {pageData.summary}
               </p>
            )}
          </div>
          
          <ArticleContent 
            className="mt-8 leading-7 text-lg"
            html={pageData.contentHtml || ''} 
          />
        </article>
      </FadeIn>
    </PostLayout>
  );
}