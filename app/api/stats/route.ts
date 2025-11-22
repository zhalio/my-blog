import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.STORAGE_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.STORAGE_TOKEN || '',
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  try {
    // Use mget to fetch both keys in one round trip
    const [views, likes] = await redis.mget<[number, number]>(`views:${slug}`, `likes:${slug}`);

    return NextResponse.json({ 
      views: views || 0, 
      likes: likes || 0 
    });
  } catch (error) {
    console.error('KV Error:', error);
    // Return 0 if KV fails (e.g. not configured)
    return NextResponse.json({ views: 0, likes: 0 });
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const type = searchParams.get('type'); // 'view' or 'like'

  if (!slug || !type) {
    return NextResponse.json({ error: 'Slug and type are required' }, { status: 400 });
  }

  try {
    let count = 0;
    if (type === 'view') {
      // Increment views
      count = await redis.incr(`views:${slug}`);
    } else if (type === 'like') {
      count = await redis.incr(`likes:${slug}`);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('KV Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
