import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from 'google-translate-api-x';
import { ProxyAgent, setGlobalDispatcher } from 'undici';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const POSTS_DIR = path.join(__dirname, '../content/posts');
const SOURCE_LANG = 'zh';
const TARGET_LANGS = ['en', 'fr', 'ja'];

// 尝试自动检测代理
const PROXY_URL = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || 'http://127.0.0.1:7890';

if (PROXY_URL) {
  try {
    const dispatcher = new ProxyAgent(PROXY_URL);
    setGlobalDispatcher(dispatcher);
    console.log(`\x1b[36mUsing proxy: ${PROXY_URL}\x1b[0m`);
  } catch (error) {
    console.warn(`\x1b[33mFailed to set proxy: ${error.message}\x1b[0m`);
  }
}

// 简单的 Markdown 翻译处理
// 注意：这是一个简化的实现，对于复杂的 Markdown 结构可能不够完美
// 它会尝试保留代码块不翻译，但可能会破坏一些内联格式
async function translateMarkdown(content, targetLang) {
  const lines = content.split('\n');
  const translatedLines = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // 检查代码块标记
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      translatedLines.push(line);
      continue;
    }

    // 如果在代码块中，或者是空行，或者是图片/链接引用，直接保留
    if (inCodeBlock || !line.trim() || line.trim().match(/^!\[.*\]\(.*\)$/)) {
      translatedLines.push(line);
      continue;
    }

    // 翻译普通文本行
    // 简单的防速率限制
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const res = await translate(line, { from: 'zh-CN', to: targetLang, forceFrom: true });
      translatedLines.push(res.text);
    } catch (error) {
      console.error(`Error translating line: ${line.substring(0, 20)}...`, error.message);
      translatedLines.push(line); // 失败保留原文
    }
  }

  return translatedLines.join('\n');
}

async function main() {
  console.log(`\x1b[36mStarting Article translation...\x1b[0m`);

  const files = await fs.readdir(POSTS_DIR);
  const sourceFiles = files.filter(f => f.endsWith(`.${SOURCE_LANG}.md`));

  for (const file of sourceFiles) {
    const slug = file.replace(`.${SOURCE_LANG}.md`, '');
    console.log(`\nProcessing: ${slug}`);

    const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
    const { data: frontmatter, content: markdownBody } = matter(content);

    for (const lang of TARGET_LANGS) {
      const targetFile = `${slug}.${lang}.md`;
      const targetPath = path.join(POSTS_DIR, targetFile);

      // 检查文件是否存在，如果存在则跳过 (除非你需要强制覆盖，可以加参数逻辑)
      try {
        await fs.access(targetPath);
        console.log(`  [${lang}] File exists, skipping.`);
        continue;
      } catch (e) {
        // 文件不存在，继续翻译
      }

      console.log(`  [${lang}] Translating...`);

      try {
        // 1. 翻译 Frontmatter
        const newFrontmatter = { ...frontmatter };
        
        if (newFrontmatter.title) {
          const res = await translate(newFrontmatter.title, { from: 'zh-CN', to: lang, forceFrom: true });
          newFrontmatter.title = res.text;
        }
        
        if (newFrontmatter.summary) {
          const res = await translate(newFrontmatter.summary, { from: 'zh-CN', to: lang, forceFrom: true });
          newFrontmatter.summary = res.text;
        }

        // 2. 翻译正文
        const newBody = await translateMarkdown(markdownBody, lang);

        // 3. 重新组合
        const newContent = matter.stringify(newBody, newFrontmatter);
        
        await fs.writeFile(targetPath, newContent, 'utf-8');
        console.log(`  [${lang}] Created successfully.`);

      } catch (error) {
        console.error(`  [${lang}] Failed: ${error.message}`);
      }
    }
  }
  
  console.log('\n\x1b[36mAll articles processed!\x1b[0m');
}

main().catch(console.error);
