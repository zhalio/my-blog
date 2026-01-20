import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { getAuthTokenFromRequest, validateAdminRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = getAuthTokenFromRequest(request)
  const isValid = await validateAdminRequest(token)
  
  if (!isValid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Overview Counts
    const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true)
    const { count: draftsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', false)
    const { data: viewsData } = await supabase.from('posts').select('views');
    const totalViews = (viewsData as { views: number }[] | null)?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

    // 2. Drafts List
    const { data: drafts } = await supabase
      .from('posts')
      .select('id, title, updated_at')
      .eq('published', false)
      .order('updated_at', { ascending: false })
      .limit(5)

    // 3. Tag Distribution (Calculate from posts directly to ensure accuracy)
    const { data: postsWithTags } = await supabase
      .from('posts')
      .select('tags')
      .not('tags', 'is', null)

    const tagCounts: Record<string, number> = {};
    (postsWithTags as { tags: string[] }[] | null)?.forEach(post => {
      post.tags?.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    const tags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    // 4. Activity (Dates for heatmap/trend)
    // Get last 365 days of posts created_at
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const { data: activityData } = await supabase
      .from('posts')
      .select('created_at, published_at')
      .gte('created_at', oneYearAgo.toISOString())

    return NextResponse.json({
      stats: {
        totalPosts: postsCount || 0,
        draftsCount: draftsCount || 0,
        totalViews: totalViews
      },
      drafts,
      tags,
      activity: activityData
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
