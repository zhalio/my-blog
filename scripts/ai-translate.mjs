import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const OLLAMA_API_URL = 'http://localhost:11434/api/chat';
const MODEL_NAME = process.env.OLLAMA_MODEL || 'qwen3:8b'; // 推荐使用 8b 版本，平衡速度与质量
const SOURCE_LANG = 'zh';
const TARGET_LANGS = ['en', 'fr', 'ja'];
const MESSAGES_DIR = path.join(__dirname, '../messages');

// 语言名称映射，用于 Prompt
const LANG_NAMES = {
  'en': 'English',
  'fr': 'French',
  'ja': 'Japanese',
  'zh': 'Chinese'
};

async function translate(text, targetLang) {
  const prompt = `You are a professional translator. Translate the following JSON content from Chinese to ${LANG_NAMES[targetLang]}.
  
  Rules:
  1. Keep the JSON structure and keys exactly the same.
  2. Only translate the values.
  3. Output ONLY the valid JSON string, no markdown code blocks, no explanations.
  4. For technical terms, use standard terminology.
  
  Content to translate:
  ${JSON.stringify(text, null, 2)}`;

  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [{ role: 'user', content: prompt }],
        format: 'json', // 强制输出 JSON
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.message.content);
  } catch (error) {
    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      console.error('\x1b[31m%s\x1b[0m', 'Error: Could not connect to Ollama. Make sure Ollama is running (http://localhost:11434).');
      process.exit(1);
    }
    throw error;
  }
}

// 递归比较两个对象，找出 source 中有但 target 中没有（或类型不匹配）的字段
function findMissingKeys(source, target) {
  const missing = {};
  let hasMissing = false;

  for (const key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      // 如果是对象，递归检查
      if (!target[key] || typeof target[key] !== 'object') {
        // 如果 target 中不存在该对象，或者类型不对，则整个对象都算缺失
        missing[key] = source[key];
        hasMissing = true;
      } else {
        const subMissing = findMissingKeys(source[key], target[key]);
        if (Object.keys(subMissing).length > 0) {
          missing[key] = subMissing;
          hasMissing = true;
        }
      }
    } else {
      // 如果是基本类型
      if (target[key] === undefined) {
        missing[key] = source[key];
        hasMissing = true;
      }
    }
  }

  return hasMissing ? missing : null;
}

// 深度合并对象
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

async function main() {
  console.log(`\x1b[36mStarting AI translation using model: ${MODEL_NAME}...\x1b[0m`);

  // 读取源文件 (zh.json)
  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LANG}.json`);
  const sourceContent = JSON.parse(await fs.readFile(sourcePath, 'utf-8'));

  for (const lang of TARGET_LANGS) {
    const targetPath = path.join(MESSAGES_DIR, `${lang}.json`);
    let targetContent = {};

    try {
      targetContent = JSON.parse(await fs.readFile(targetPath, 'utf-8'));
    } catch (e) {
      console.log(`Creating new file for ${lang}...`);
    }

    // 找出缺失的翻译
    const missingContent = findMissingKeys(sourceContent, targetContent);

    if (!missingContent) {
      console.log(`\x1b[32m[${lang}]\x1b[0m is up to date.`);
      continue;
    }

    console.log(`\x1b[33m[${lang}]\x1b[0m Translating missing keys...`);
    // console.log(JSON.stringify(missingContent, null, 2)); // Debug

    try {
      const translatedChunk = await translate(missingContent, lang);
      
      // 合并翻译结果
      // 注意：这里我们需要把 translatedChunk 合并回 targetContent
      // 简单的 Object.assign 不行，需要深度合并，或者直接重新读取源文件结构并填充
      // 这里为了简单，我们使用一个简单的深度合并策略：
      // 将翻译后的部分合并到现有的 targetContent 中
      
      // 实际上，findMissingKeys 返回的结构和 source 一样，只是只包含缺失的键
      // translate 返回的结构也应该一样
      // 所以我们可以直接把 translatedChunk merge 到 targetContent
      
      // 简单的深度合并实现
      const merge = (target, source) => {
        for (const key in source) {
          if (source[key] instanceof Object && !Array.isArray(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            merge(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      };
      
      merge(targetContent, translatedChunk);

      // 写入文件
      await fs.writeFile(targetPath, JSON.stringify(targetContent, null, 2), 'utf-8');
      console.log(`\x1b[32m[${lang}]\x1b[0m Updated successfully.`);
      
    } catch (error) {
      console.error(`\x1b[31m[${lang}]\x1b[0m Translation failed:`, error.message);
    }
  }
  
  console.log('\x1b[36mAll done!\x1b[0m');
}

main().catch(console.error);
