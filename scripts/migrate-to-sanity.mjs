import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const outputPath = path.join(process.cwd(), 'sanity-data.ndjson');

if (!fs.existsSync(postsDirectory)) {
  console.error('Error: content/posts directory not found');
  process.exit(1);
}

const fileNames = fs.readdirSync(postsDirectory);
const stream = fs.createWriteStream(outputPath);

console.log('Starting migration...');

let count = 0;

fileNames.forEach((fileName) => {
  if (!fileName.endsWith('.md')) return;

  // 解析文件名: slug.lang.md
  // 例如: js-learning.zh.md -> slug: js-learning, lang: zh
  const match = fileName.match(/^(.*)\.([a-z]{2})\.md$/);
  let slug, lang;
  
  if (match) {
    slug = match[1];
    lang = match[2];
  } else {
    // 兼容旧格式 name.md -> 默认为 zh
    slug = fileName.replace(/\.md$/, '');
    lang = 'zh';
  }

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  try {
    const { data, content } = matter(fileContents);

    // 确保日期格式正确
    let dateStr;
    if (data.date instanceof Date) {
      dateStr = data.date.toISOString();
    } else if (data.date) {
      dateStr = new Date(data.date).toISOString();
    } else {
      dateStr = new Date().toISOString();
    }

    const doc = {
      _type: 'post',
      _id: `imported-${slug}-${lang}`, // 指定 ID 防止重复导入
      title: data.title,
      slug: { _type: 'slug', current: slug },
      date: dateStr,
      summary: data.summary,
      tags: data.tags || [],
      language: lang,
      content: content // Markdown content
    };

    stream.write(JSON.stringify(doc) + '\n');
    console.log(`Processed: ${fileName}`);
    count++;
  } catch (e) {
    console.error(`Failed to process ${fileName}:`, e);
  }
});

stream.end();
console.log(`\nSuccess! ${count} posts prepared in ${outputPath}`);
console.log('Run the following command to import to Sanity:');
console.log('npx sanity dataset import sanity-data.ndjson production');
