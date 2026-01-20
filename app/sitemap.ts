import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

/**
 * Safely parse a date string, returning a fallback if invalid
 */
function safeParseDate(dateString: string | undefined | null): Date {
  if (!dateString || dateString.trim() === '') {
    return new Date() // Fallback to today's date
  }

  const parsed = new Date(dateString)

  // Check if the date is valid
  if (isNaN(parsed.getTime())) {
    console.warn(`Invalid date "${dateString}", using current date as fallback`)
    return new Date()
  }

  return parsed
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swagwise-content-hub.vercel.app'
  const articles = getAllArticles()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Article pages - use safe date parsing to handle missing/invalid dates
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: safeParseDate(article.date),
    changeFrequency: 'weekly' as const,
    priority: article.isPillar ? 0.9 : 0.8,
  }))

  return [...staticPages, ...articlePages]
}
