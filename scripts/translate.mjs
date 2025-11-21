import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from 'google-translate-api-x';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 尝试自动检测代理 (常见的本地代理端口)
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

// 获取命令行参数
const args = process.argv.slice(2);
const isForce = args.includes('--force');

// 配置
const SOURCE_LANG = 'zh';
const TARGET_LANGS = ['en', 'fr', 'ja'];
const MESSAGES_DIR = path.join(__dirname, '../messages');

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
        if (subMissing) {
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

// 递归遍历对象并翻译值
async function translateObject(obj, targetLang) {
  const result = {};
  
  for (const key in obj) {
    const value = obj[key];
    
    if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang);
    } else if (typeof value === 'string') {
      try {
        // Google Translate API 调用
        // 注意：google-translate-api-x 默认会自动检测源语言，但有时指定 'zh-CN' 比 'zh' 更准确
        const res = await translate(value, { from: 'zh-CN', to: targetLang, forceFrom: true });
        result[key] = res.text;
        // 简单的防速率限制延迟
        await new Promise(resolve => setTimeout(resolve, 100)); 
      } catch (error) {
        console.error(`Error translating "${value}":`, error.message);
        result[key] = value; // 翻译失败保留原文
      }
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

// 深度合并
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
  console.log(`\x1b[36mStarting Google translation...\x1b[0m`);

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
    let contentToTranslate;
    
    if (isForce) {
      contentToTranslate = sourceContent;
    } else {
      contentToTranslate = findMissingKeys(sourceContent, targetContent);
    }

    if (!contentToTranslate) {
      console.log(`\x1b[32m[${lang}]\x1b[0m is up to date.`);
      continue;
    }

    console.log(`\x1b[33m[${lang}]\x1b[0m ${isForce ? 'Force translating all keys...' : 'Translating missing keys...'}`);

    try {
      const translatedChunk = await translateObject(contentToTranslate, lang);
      
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
