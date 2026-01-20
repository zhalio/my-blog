import { supabase } from './supabase/client'
import type { Post } from './supabase/types'
import type { PostData as PostListItem } from './types'

export interface PostData {
  id: string
  title: string
  slug: string
  description: string
  content: any
  coverImage: string | null
  author: string
  locale: string
  tags: string[]
  published: boolean
  featured: boolean
  views: number
  readingTime: number | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
  seo_title?: string
  seo_description?: string
}

export async function getPublishedPosts(locale: string = 'zh'): Promise<PostListItem[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('locale', locale)
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  const rows = (data || []) as Post[]

  return rows.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.published_at || post.created_at,
    summary: post.description || '',
    excerpt: post.description || '',
    tags: post.tags || [],
    readingTime: post.reading_time ? `${post.reading_time} 分钟` : undefined,
    coverImage: post.cover_image,
    locale: post.locale,
  }))
}

export async function getPostBySlug(slug: string, locale: string = 'zh'): Promise<PostData | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('locale', locale)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  if (!data) return null

  const post = data as Post;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: post.description || '',
    content: post.content,
    coverImage: post.cover_image,
    author: post.author,
    locale: post.locale,
    tags: post.tags || [],
    published: post.published,
    featured: post.featured,
    views: post.views,
    readingTime: post.reading_time,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    publishedAt: post.published_at,
    seo_title: post.metadata?.seo_title,
    seo_description: post.metadata?.seo_description,
  }
}

export async function getAllTags(locale: string = 'zh'): Promise<Array<{ name: string; count: number }>> {
  const { data, error } = await supabase
    .from('tags')
    .select('name, count')
    .order('count', { ascending: false })

  if (error) {
    console.error('Error fetching tags:', error)
    return []
  }

  return data || []
}

export async function getPostsByTag(tag: string, locale: string = 'zh'): Promise<PostListItem[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('locale', locale)
    .eq('published', true)
    .contains('tags', [tag])
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts by tag:', error)
    return []
  }

  const rows = (data || []) as Post[]

  return rows.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.published_at || post.created_at,
    summary: post.description || '',
    excerpt: post.description || '',
    tags: post.tags || [],
    readingTime: post.reading_time ? `${post.reading_time} 分钟` : undefined,
    coverImage: post.cover_image,
    locale: post.locale,
  }))
}

export async function incrementPostViews(slug: string, locale: string = 'zh'): Promise<void> {
  const { error } = await supabase.rpc('increment_post_views', {
    post_slug: slug,
    post_locale: locale,
  } as any)

  if (error) {
    console.error('Error incrementing views:', error)
  }
}
