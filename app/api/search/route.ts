import { getSanitySortedPostsData } from '@/lib/sanity-posts';
import { NextResponse } from 'next/server';

// 静态导出模式下，我们需要生成所有可能的静态路径
// 但对于 API 路由，在 output: export 模式下，我们不能使用动态查询参数
// 我们可以生成一个包含所有语言数据的静态 JSON 文件

export async function GET() {
  // 获取所有语言的文章数据
  const locales = ['zh', 'en', 'fr', 'ja'];
  const postsByLocale = await Promise.all(locales.map((l) => getSanitySortedPostsData(l)));
  const allPosts = postsByLocale.flatMap((posts, idx) => posts.map(p => ({ ...p, locale: locales[idx] })));

  return NextResponse.json(allPosts);
}

export function generateStaticParams() {
  return [];
}
