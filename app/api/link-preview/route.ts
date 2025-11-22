import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch');
    }

    const html = await res.text();

    // Simple regex to extract OG tags
    const getMetaTag = (name: string) => {
      const match = html.match(
        new RegExp(`<meta property="${name}" content="([^"]*)"`, 'i')
      ) || html.match(
        new RegExp(`<meta name="${name}" content="([^"]*)"`, 'i')
      );
      return match ? match[1] : null;
    };
    
    const getTitle = () => {
        const match = html.match(/<title>([^<]*)<\/title>/i);
        return match ? match[1] : null;
    }

    const title = getMetaTag('og:title') || getTitle();
    const description = getMetaTag('og:description') || getMetaTag('description');
    const image = getMetaTag('og:image');

    return NextResponse.json({ title, description, image, url });
  } catch (error) {
    console.error('Link preview error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
