import { client } from '@/sanity/lib/client';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import readingTime from 'reading-time';
import { PostData, TocItem } from './types';

// Helper to extract text from a node (copied from posts.ts)
interface Node {
  type: string;
  value?: string;
  children?: Node[];
  tagName?: string;
  properties?: {
    id?: string;
  };
}

function getNodeText(node: Node): string {
  if (node.type === 'text') {
    return node.value || '';
  }
  if (node.children) {
    return node.children.map(getNodeText).join('');
  }
  return '';
}

interface SanityPost {
  title: string;
  id: string;
  date: string;
  summary: string;
  tags?: string[];
  content?: string;
  language?: string;
}

export async function getSanitySortedPostsData(locale: string = 'zh'): Promise<PostData[]> {
  const query = `*[_type == "post" && language == $locale] | order(date desc) {
    title,
    "id": slug.current,
    date,
    summary,
    tags,
    content,
    language
  }`;

  const posts = await client.fetch<SanityPost[]>(query, { locale });

  return posts.map((post) => {
    const stats = readingTime(post.content || '');
    return {
      id: post.id,
      title: post.title,
      date: post.date,
      summary: post.summary,
      tags: post.tags || [],
      readingTime: stats.text,
      content: post.content, // Raw content
      language: post.language || locale,
    };
  });
}

export async function getSanityPostData(id: string, locale: string = 'zh'): Promise<PostData | null> {
  // Try to fetch the post with the requested locale first. If not found, fall back to Chinese ('zh').
  const baseQuery = `*[_type == "post" && slug.current == $id && language == $locale][0] {
    title,
    "id": slug.current,
    date,
    summary,
    tags,
    content,
    language
  }`;

  // Try requested locale first
  let post = await client.fetch(baseQuery, { id, locale });
  let usedLocale = locale;

  if (!post && locale !== 'zh') {
    // Fallback to Chinese content if the requested locale has no post
    post = await client.fetch(baseQuery, { id, locale: 'zh' });
    usedLocale = 'zh';
  }

  if (!post) {
    return null;
  }

  const stats = readingTime(post.content || '');
  const toc: TocItem[] = [];

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree) => {
      visit(tree, 'element', (node: unknown) => {
        const elementNode = node as Node;
        if (elementNode.tagName && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(elementNode.tagName)) {
          const id = elementNode.properties?.id;
          const text = getNodeText(elementNode);
          const depth = parseInt(elementNode.tagName.substring(1), 10);
          if (id && text) {
            toc.push({ id, text, depth });
          }
        }
      });
    })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'one-dark-pro',
        light: 'one-light',
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(post.content || '');
    
  const contentHtml = processedContent.toString();

  return {
    id: post.id,
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags || [],
    readingTime: stats.text,
    contentHtml,
    toc,
    language: post.language || usedLocale,
  };
}

export async function getSanityPageData(id: string, locale: string = 'zh'): Promise<PostData | null> {
  const query = `*[_type == "page" && slug.current == $id && language == $locale][0] {
    title,
    "id": slug.current,
    date,
    summary,
    content,
    language
  }`;

  let page = await client.fetch(query, { id, locale });
  let usedLocale = locale;
  if (!page && locale !== 'zh') {
    page = await client.fetch(query, { id, locale: 'zh' });
    usedLocale = 'zh';
  }

  if (!page) {
    return null;
  }

  const toc: TocItem[] = [];

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree) => {
      visit(tree, 'element', (node: unknown) => {
        const elementNode = node as Node;
        if (elementNode.tagName && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(elementNode.tagName)) {
          const id = elementNode.properties?.id;
          const text = getNodeText(elementNode);
          const depth = parseInt(elementNode.tagName.substring(1), 10);
          if (id && text) {
            toc.push({ id, text, depth });
          }
        }
      });
    })
    .use(rehypePrettyCode, {
      theme: {
        dark: 'one-dark-pro',
        light: 'one-light',
      },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(page.content || '');
    
  const contentHtml = processedContent.toString();

  return {
    id: page.id,
    title: page.title,
    date: page.date,
    summary: page.summary,
    contentHtml,
    toc,
    language: page.language || usedLocale,
  };
}

export async function getSanityAllTags(locale: string = 'zh'): Promise<Record<string, number>> {
  const posts = await getSanitySortedPostsData(locale);
  const tagsCount: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (tagsCount[tag]) {
          tagsCount[tag]++;
        } else {
          tagsCount[tag] = 1;
        }
      });
    }
  });

  return tagsCount;
}
