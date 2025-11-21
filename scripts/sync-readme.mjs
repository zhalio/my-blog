import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const README_PATH = path.join(__dirname, '../README.md');
const ABOUT_PATH = path.join(__dirname, '../content/pages/about.zh.md');

async function main() {
  console.log('\x1b[36mSyncing README.md to About page...\x1b[0m');

  try {
    // 1. 读取 README.md
    let readmeContent = await fs.readFile(README_PATH, 'utf-8');

    // 2. 去掉第一个 H1 标题 (因为 About 页面有自己的 Title)
    // 匹配以 # 开头的第一行，并去掉它以及随后的空行
    readmeContent = readmeContent.replace(/^#\s+.+\n+/, '');

    // 3. 读取 about.zh.md 获取 Frontmatter
    const aboutFile = await fs.readFile(ABOUT_PATH, 'utf-8');
    const { data: frontmatter } = matter(aboutFile);

    // 4. 组合新内容
    // 强制更新 Frontmatter 中的 summary 为 README 的第一段文字（可选，这里暂不修改 summary）
    const newContent = matter.stringify(readmeContent, frontmatter);

    // 5. 写入 about.zh.md
    await fs.writeFile(ABOUT_PATH, newContent, 'utf-8');

    console.log('\x1b[32mSuccessfully synced README.md to content/pages/about.zh.md\x1b[0m');
    console.log('Tip: Run \x1b[33mnpm run translate:post\x1b[0m to update other languages.');

  } catch (error) {
    console.error('\x1b[31mSync failed:\x1b[0m', error.message);
    process.exit(1);
  }
}

main();
