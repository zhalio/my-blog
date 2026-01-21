import { getPublishedPosts } from '@/lib/supabase/posts';
import { NextResponse } from 'next/server';

export const revalidate = 60;

// 静态导出模式下，我们需要生成所有可能的静态路径
// 但对于 API 路由，在 output: export 模式下，我们不能使用动态查询参数
// 我们可以生成一个包含所有语言数据的静态 JSON 文件

export async function GET() {
  // 获取所有语言的文章数据
  // We only have Chinese articles — return Chinese posts regardless of requested UI locale.
  const posts = await getPublishedPosts('zh');
  const allPosts = posts.map(p => ({ ...p, locale: 'zh' }));

  return NextResponse.json(allPosts);
}

export function generateStaticParams() {
  return [];
}
