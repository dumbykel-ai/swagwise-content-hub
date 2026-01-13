import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getClustersByPillar } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: 'Article Not Found | Swagwise',
    }
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://swagwise.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      tags: article.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  
  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug, 4)
  const clusterArticles = article.isPillar ? getClustersByPillar(article.slug) : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'Swagwise',
      url: 'https://swagwise.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Swagwise',
      logo: {
        '@type': 'ImageObject',
        url: 'https://swagwise.com/logo.png',
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://swagwise.com/blog/${article.slug}`,
    },
    keywords: article.keywords.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-12">
        <div className="container-blog">
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <Link href="/" className="hover:text-swagwise-primary">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/blog" className="hover:text-swagwise-primary">Blog</Link>
              </li>
              <li>/</li>
              <li className="text-swagwise-primary truncate max-w-[200px]">
                {article.title}
              </li>
            </ol>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${article.isPillar ? 'bg-swagwise-primary text-white' : 'badge-primary'}`}>
                {article.isPillar ? '📚 Pillar Guide' : article.category}
              </span>
              <span className="text-gray-500">{article.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-swagwise-dark mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {article.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 border-b border-gray-200 pb-6">
              <span>By {article.author}</span>
              <span>•</span>
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {article.isPillar && clusterArticles.length > 0 && (
            <div className="bg-swagwise-light rounded-xl p-6 mb-12">
              <h2 className="text-lg font-bold text-swagwise-dark mb-4">
                📖 In This Guide Series
              </h2>
              <ul className="space-y-2">
                {clusterArticles.slice(0, 10).map((cluster) => (
                  <li key={cluster.slug}>
                    <Link 
                      href={`/blog/${cluster.slug}`}
                      className="text-swagwise-primary hover:underline"
                    >
                      → {cluster.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <div className="cta-box my-12">
            <h3>Ready to Transform Your Wardrobe?</h3>
            <p>
              Swagwise provides personalized style recommendations based on AI analysis of your wardrobe. 
              Join the waitlist for early access.
            </p>
            <a href="#waitlist" className="btn inline-block">
              Join the Waitlist →
            </a>
          </div>

          {relatedArticles.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-swagwise-dark mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <ArticleCard
                    key={related.slug}
                    title={related.title}
                    description={related.description}
                    slug={related.slug}
                    category={related.category}
                    readTime={related.readTime}
                    date={related.date}
                    isPillar={related.isPillar}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog" className="btn-secondary">
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
