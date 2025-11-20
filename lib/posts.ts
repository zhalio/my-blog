import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const pagesDirectory = path.join(process.cwd(), 'content/pages');

export type TocItem = {
  id: string;
  text: string;
  depth: number;
};

export type PostData = {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  contentHtml?: string;
  toc?: TocItem[];
};

// Helper to extract text from a node
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

export function getSortedPostsData(locale: string = 'zh'): PostData[] {
  // ...existing code...
  // Get file names under /posts
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  // 1. Identify all unique slugs
  const slugs = new Set<string>();
  fileNames.forEach(fileName => {
    if (fileName.endsWith('.md')) {
      // Remove .md and locale suffix (e.g., .zh, .en)
      // Pattern: name.locale.md -> name
      const match = fileName.match(/^(.*)\.[a-z]{2}\.md$/);
      if (match) {
        slugs.add(match[1]);
      } else {
        // Handle legacy files without locale if any (though we renamed them)
        slugs.add(fileName.replace(/\.md$/, ''));
      }
    }
  });

  const allPostsData = Array.from(slugs).map((id) => {
    // 2. Determine which file to read for this slug and locale
    let fileName = `${id}.${locale}.md`;
    let fullPath = path.join(postsDirectory, fileName);

    // Fallback to 'zh' if specific locale file doesn't exist
    if (!fs.existsSync(fullPath)) {
      fileName = `${id}.zh.md`;
      fullPath = path.join(postsDirectory, fileName);
    }

    // If fallback also doesn't exist (shouldn't happen if logic is correct), skip or handle error
    if (!fs.existsSync(fullPath)) {
       // Try legacy format just in case
       fileName = `${id}.md`;
       fullPath = path.join(postsDirectory, fileName);
       if (!fs.existsSync(fullPath)) {
         return null;
       }
    }

    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; category: string; summary: string }),
    };
  }).filter((post): post is PostData => post !== null);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string, locale: string = 'zh'): Promise<PostData> {
  let fullPath = path.join(postsDirectory, `${id}.${locale}.md`);
  
  // Fallback to zh
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.zh.md`);
  }
  
  // Fallback to legacy
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const toc: TocItem[] = [];

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
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
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    toc,
    ...(matterResult.data as { date: string; title: string; category: string; summary: string }),
  };
}

export async function getPageData(id: string, locale: string = 'zh'): Promise<PostData> {
  let fullPath = path.join(pagesDirectory, `${id}.${locale}.md`);
  
  // Fallback to zh
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(pagesDirectory, `${id}.zh.md`);
  }
  
  // Fallback to legacy/generic
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(pagesDirectory, `${id}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Page not found: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const toc: TocItem[] = [];

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
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
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    toc,
    ...(matterResult.data as { date: string; title: string; category: string; summary: string }),
  };
}
