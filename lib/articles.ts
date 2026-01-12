import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')
const pillarsDirectory = path.join(contentDirectory, 'pillars')
const clustersDirectory = path.join(contentDirectory, 'clusters')

export interface ArticleMeta {
  title: string
  description: string
  slug: string
  date: string
  author: string
  category: string
  pillar?: string
  keywords: string[]
  readTime: string
  isPillar: boolean
}

export interface Article extends ArticleMeta {
  content: string
  contentHtml: string
}

// Get all markdown files recursively
function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return []
  }
  
  const files: string[] = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath))
    } else if (item.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  
  return files
}

// Get all articles (pillars and clusters)
export function getAllArticles(): ArticleMeta[] {
  const pillarFiles = getMarkdownFiles(pillarsDirectory)
  const clusterFiles = getMarkdownFiles(clustersDirectory)
  
  const articles: ArticleMeta[] = []
  
  // Process pillars
  for (const filePath of pillarFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    articles.push({
      title: data.title || '',
      description: data.description || '',
      slug: data.slug || path.basename(filePath, '.md'),
      date: data.date || '',
      author: data.author || 'Swagwise Team',
      category: data.category || 'Style Guide',
      pillar: data.pillar,
      keywords: data.keywords || [],
      readTime: data.readTime || '10 min read',
      isPillar: true,
    })
  }
  
  // Process clusters
  for (const filePath of clusterFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    articles.push({
      title: data.title || '',
      description: data.description || '',
      slug: data.slug || path.basename(filePath, '.md'),
      date: data.date || '',
      author: data.author || 'Swagwise Team',
      category: data.category || 'Style Tips',
      pillar: data.pillar,
      keywords: data.keywords || [],
      readTime: data.readTime || '6 min read',
      isPillar: false,
    })
  }
  
  // Sort by date (newest first) and pillars first
  return articles.sort((a, b) => {
    if (a.isPillar && !b.isPillar) return -1
    if (!a.isPillar && b.isPillar) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// Get all pillars
export function getAllPillars(): ArticleMeta[] {
  return getAllArticles().filter(article => article.isPillar)
}

// Get clusters by pillar
export function getClustersByPillar(pillarSlug: string): ArticleMeta[] {
  return getAllArticles().filter(
    article => !article.isPillar && article.pillar === pillarSlug
  )
}

// Get all unique categories
export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map(a => a.category))
  return Array.from(categories)
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Check pillars first
  const pillarPath = path.join(pillarsDirectory, `${slug}.md`)
  if (fs.existsSync(pillarPath)) {
    return processArticle(pillarPath, true)
  }
  
  // Check clusters
  const clusterFiles = getMarkdownFiles(clustersDirectory)
  for (const filePath of clusterFiles) {
    const fileName = path.basename(filePath, '.md')
    if (fileName === slug) {
      return processArticle(filePath, false)
    }
  }
  
  // Check if slug matches frontmatter slug
  const allFiles = [...getMarkdownFiles(pillarsDirectory), ...getMarkdownFiles(clustersDirectory)]
  for (const filePath of allFiles) {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    if (data.slug === slug) {
      const isPillar = filePath.includes('/pillars/')
      return processArticle(filePath, isPillar)
    }
  }
  
  return null
}

async function processArticle(filePath: string, isPillar: boolean): Promise<Article> {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(content)
  const contentHtml = processedContent.toString()
  
  return {
    title: data.title || '',
    description: data.description || '',
    slug: data.slug || path.basename(filePath, '.md'),
    date: data.date || '',
    author: data.author || 'Swagwise Team',
    category: data.category || 'Style Guide',
    pillar: data.pillar,
    keywords: data.keywords || [],
    readTime: data.readTime || (isPillar ? '10 min read' : '6 min read'),
    isPillar,
    content,
    contentHtml,
  }
}

// Get all slugs for static generation
export function getAllSlugs(): string[] {
  return getAllArticles().map(article => article.slug)
}

// Get related articles
export function getRelatedArticles(currentSlug: string, limit: number = 4): ArticleMeta[] {
  const articles = getAllArticles()
  const currentArticle = articles.find(a => a.slug === currentSlug)
  
  if (!currentArticle) return articles.slice(0, limit)
  
  // Find articles in same category or pillar
  const related = articles.filter(a => {
    if (a.slug === currentSlug) return false
    if (a.category === currentArticle.category) return true
    if (a.pillar === currentArticle.pillar) return true
    if (currentArticle.isPillar && a.pillar === currentArticle.slug) return true
    return false
  })
  
  // If not enough related, add other articles
  if (related.length < limit) {
    const others = articles.filter(a => 
      a.slug !== currentSlug && !related.includes(a)
    )
    related.push(...others)
  }
  
  return related.slice(0, limit)
}
