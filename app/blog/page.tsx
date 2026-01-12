import { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles, getAllPillars, getAllCategories } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Style Blog | Swagwise',
  description: 'Data-driven fashion guides and style insights. 100+ articles on wardrobe optimization, color theory, capsule wardrobes, and more. Backed by Swagwise analysis of 50,000+ wardrobes.',
  openGraph: {
    title: 'Style Blog | Swagwise',
    description: 'Data-driven fashion guides and style insights backed by real wardrobe data.',
    url: 'https://swagwise.com/blog',
  },
}

export default function BlogPage() {
  const allArticles = getAllArticles()
  const pillars = getAllPillars()
  const categories = getAllCategories()
  const clusters = allArticles.filter(a => !a.isPillar)

  return (
    <div className="py-12">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-swagwise-dark mb-4">
            Style Intelligence Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            100+ data-driven guides to help you build a wardrobe that works. 
            Every insight backed by Swagwise analysis of over 50,000 wardrobes.
          </p>
        </div>

        {/* Pillar Guides */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swagwise-dark">
              📚 Comprehensive Guides
            </h2>
            <span className="badge-primary">{pillars.length} Pillar Guides</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <ArticleCard
                key={pillar.slug}
                title={pillar.title}
                description={pillar.description}
                slug={pillar.slug}
                category={pillar.category}
                readTime={pillar.readTime}
                date={pillar.date}
                isPillar={true}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swagwise-dark mb-6">
            Browse by Topic
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="badge-primary hover:bg-swagwise-primary hover:text-white transition-colors cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swagwise-dark">
              All Articles
            </h2>
            <span className="text-gray-600">{allArticles.length} total articles</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clusters.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                description={article.description}
                slug={article.slug}
                category={article.category}
                readTime={article.readTime}
                date={article.date}
                isPillar={article.isPillar}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <div className="cta-box text-center">
            <h3>Get Personalized Style Recommendations</h3>
            <p>
              Reading about style is great. Having AI analyze YOUR wardrobe is better. 
              Join the Swagwise waitlist for personalized fashion intelligence.
            </p>
            <a href="#waitlist" className="btn inline-block">
              Join the Waitlist →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
