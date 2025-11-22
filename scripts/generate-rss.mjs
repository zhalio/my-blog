
import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDirectory = path.join(__dirname, '../content/posts');
const publicDirectory = path.join(__dirname, '../public');
const siteUrl = 'https://emmmxx.xyz'; // Replace with your actual site URL

async function generateRssFeed() {
  const feed = new Feed({
    title: "Emmm's Blog",
    description: "A personal blog about technology and life.",
    id: siteUrl,
    link: siteUrl,
    language: "zh", // Default language
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

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      // Extract locale from filename (e.g., my-post.zh.md)
      const parts = fileName.split('.');
      const locale = parts.length > 2 ? parts[parts.length - 2] : 'en';
      const id = parts.slice(0, parts.length - 2).join('.');

      return {
        id,
        locale,
        ...matterResult.data,
        content: matterResult.content,
      };
    });

  // Filter for default locale (e.g., 'zh') or generate multiple feeds?
  // For now, let's generate a feed for 'zh' posts as the main feed.
  const posts = allPostsData
    .filter((post) => post.locale === 'zh')
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  posts.forEach((post) => {
    const url = `${siteUrl}/zh/posts/${post.id}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      content: post.content, // Optional: include full content
      author: [
        {
          name: "Emmm",
          email: "1992107794@qq.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.date),
      image: post.image ? `${siteUrl}${post.image}` : undefined,
    });
  });

  fs.writeFileSync(path.join(publicDirectory, 'rss.xml'), feed.rss2());
  fs.writeFileSync(path.join(publicDirectory, 'atom.xml'), feed.atom1());
  fs.writeFileSync(path.join(publicDirectory, 'rss.json'), feed.json1());

  console.log('RSS feeds generated successfully!');
}

generateRssFeed();
