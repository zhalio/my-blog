import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const QUESTIONS = [
  { key: 'title', question: '文章标题 (Title): ' },
  { key: 'slug', question: 'URL Slug (e.g. my-new-post): ' },
  { key: 'locale', question: '语言 (zh/en) [默认 zh]: ', default: 'zh' },
  { key: 'category', question: '分类 (Category) [默认 Tech]: ', default: 'Tech' },
  { key: 'summary', question: '摘要 (Summary): ' }
];

const answers = {};

const ask = (index) => {
  if (index === QUESTIONS.length) {
    createPost();
    rl.close();
    return;
  }

  const q = QUESTIONS[index];
  rl.question(q.question, (ans) => {
    answers[q.key] = ans.trim() || q.default;
    if (!answers[q.key] && !q.default) {
      console.log('❌ 必填项不能为空');
      ask(index);
    } else {
      ask(index + 1);
    }
  });
};

const createPost = () => {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const fileName = `${answers.slug}.${answers.locale}.md`;
  const filePath = path.join(process.cwd(), 'content/posts', fileName);

  const content = `---
title: "${answers.title}"
date: "${date}"
category: "${answers.category}"
summary: "${answers.summary}"
---

这里开始写你的文章内容...

![示例图片](/images/your-image.png)
`;

  if (fs.existsSync(filePath)) {
    console.error(`❌ 文件已存在: ${filePath}`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, content);
  console.log(`\n✅ 文章创建成功!`);
  console.log(`📂 路径: ${filePath}`);
};

console.log('📝 创建新文章 (Create New Post)\n');
ask(0);
