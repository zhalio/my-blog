/**
 * Restore Markdown content from local backup files into Sanity `content` field.
 *
 * Usage (PowerShell):
 *   $env:NEXT_PUBLIC_SANITY_PROJECT_ID="<projectId>";
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production";
 *   $env:SANITY_API_TOKEN="<token>";
 *   node scripts/restore-markdown-from-backup.mjs
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import matter from 'gray-matter';

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('Missing Sanity environment variables.');
  process.exit(1);
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('Missing SANITY_API_TOKEN. You need a token with write access.');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-23',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const mappings = [
  {
    localPath: 'content/posts-backup/js-learning.zh.md',
    docType: 'post',
    slug: 'js-learning',
    language: 'zh',
  },
  {
    localPath: 'content/pages-backup/about.zh.md',
    docType: 'page',
    slug: 'about',
    language: 'zh',
  },
];

async function restoreOne(mapping) {
  const { localPath, docType, slug, language } = mapping;
  const fullPath = path.join(process.cwd(), localPath);

  console.log(`\nProcessing ${docType} from ${localPath} ...`);

  if (!fs.existsSync(fullPath)) {
    console.error('  ✗ Backup file not found:', fullPath);
    return;
  }

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { content: markdown } = matter(raw);

  console.log(`  Read ${markdown.length} characters of markdown`);

  const query = `*[_type == "${docType}" && slug.current == $slug && language == $language][0]{ _id, title }`;
  const doc = await client.fetch(query, { slug, language });

  if (!doc) {
    console.error(`  ✗ No ${docType} document found for slug="${slug}", language="${language}"`);
    return;
  }

  console.log(`  Found document: ${doc.title} (${doc._id})`);

  try {
    await client.patch(doc._id).set({ content: markdown }).commit();
    console.log('  ✓ Updated content with raw markdown');
  } catch (err) {
    console.error('  ✗ Failed to update document:', err.message || err);
  }
}

async function main() {
  console.log('=== Restore Markdown from backup to Sanity ===');

  for (const m of mappings) {
    await restoreOne(m);
  }

  console.log('\n=== Done ===');
}

main().catch((err) => {
  console.error('Restore script failed:', err);
  process.exit(1);
});
