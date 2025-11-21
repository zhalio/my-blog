import { MetadataRoute } from 'next'
import { getSortedPostsData } from '@/lib/posts'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emmmxx.xyz'
const locales = ['zh', 'en', 'fr', 'ja']

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData('zh') // Get all posts (slugs are same across locales)
  
  const routes = [
    '',
    '/posts',
    '/guestbook',
    '/about',
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add static routes for each locale
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
      })
    }
  }

  // Add post routes for each locale
  for (const post of posts) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/posts/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return sitemapEntries
}
