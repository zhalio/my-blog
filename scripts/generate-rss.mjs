
import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import { createClient } from '@sanity/client';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emmmxx.xyz';
const publicDirectory = path.join(process.cwd(), 'public');

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn('Missing Sanity environment variables. Skipping RSS generation.');
  // Do not fail the build when Sanity env is not provided (e.g., preview deployments).
  process.exit(0);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-23',
  useCdn: false,
});

async function generateRssFeed() {
  const feed = new Feed({
    title: "Emmm's Blog",
    description: "A personal blog about technology and life.",
    id: siteUrl,
    link: siteUrl,
    language: "zh",
    image: `${siteUrl}/icon.png`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Emmm`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
      json: `${siteUrl}/rss.json`,
      atom: `${siteUrl}/atom.xml`,
    },
    author: {
      name: "Emmm",
      email: "1992107794@qq.com",
      link: siteUrl,
    },
  });

  // Fetch posts from Sanity for zh locale
  const query = `*[_type == "post" && language == $lang] | order(date desc){title, "id": slug.current, date, summary, content, tags}`;
  const posts = await client.fetch(query, { lang: 'zh' });

  posts.forEach((post) => {
    const url = `${siteUrl}/zh/posts/${post.id}`;
    const title = typeof post.title === 'string' ? post.title : String(post.title || '');
    const summary = typeof post.summary === 'string' ? post.summary : String(post.summary || '');
    let content = '';

    if (typeof post.content === 'string') {
      content = post.content;
    } else if (post.content !== undefined && post.content !== null) {
      // Fallback: avoid breaking RSS when content is not a simple string
      try {
        content = JSON.stringify(post.content);
      } catch {
        content = '';
      }
    }

    feed.addItem({
      title,
      id: url,
      link: url,
      description: summary,
      content,
      author: [
        {
          name: "Emmm",
          email: "1992107794@qq.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.date),
    });
  });

  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicDirectory, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(publicDirectory, 'rss.json'), feed.json1());

  console.log('RSS feeds generated successfully!');
}

generateRssFeed().catch((err) => {
  console.error('Failed to generate RSS:', err);
  process.exit(1);
});
