import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles, getAllPillars } from '@/lib/articles'

export default function Home() {
  const pillars = getAllPillars().slice(0, 6)
  const recentArticles = getAllArticles().slice(0, 6)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-swagwise-dark via-indigo-900 to-swagwise-dark text-white py-20 lg:py-32">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Fashion Intelligence for Your Wardrobe
            </h1>
            <p className="text-xl text-indigo-200 mb-8">
              Swagwise helps you build a wardrobe that works. Data-driven style recommendations, 
              personalized color analysis, and smart outfit suggestions—all powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#waitlist" className="btn-primary text-lg px-8 py-4">
                Join the Waitlist
              </Link>
              <Link href="/blog" className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white/10">
                Explore Style Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-swagwise-light">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-swagwise-primary mb-2">100+</div>
              <div className="text-gray-600">Style Guides</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-swagwise-primary mb-2">50K+</div>
              <div className="text-gray-600">Wardrobes Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-swagwise-primary mb-2">47%</div>
              <div className="text-gray-600">Higher Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-swagwise-primary mb-2">$2.50</div>
              <div className="text-gray-600">Avg Cost Per Wear</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Guides Section */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swagwise-dark mb-4">
              Comprehensive Style Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deep-dive guides backed by Swagwise data analysis of over 50,000 wardrobes.
            </p>
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

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-secondary">
              View All Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* What is Swagwise Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-swagwise-dark mb-6">
                What is Swagwise?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Swagwise is an AI-powered fashion app that transforms how you think about your wardrobe. 
                We analyze your clothes, understand your style DNA, and help you make smarter decisions 
                about what to wear and what to buy.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-swagwise-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Digital Wardrobe</strong> — Catalog every piece you own with AI-powered tagging</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-swagwise-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Style DNA Analysis</strong> — Understand your color palette, preferred silhouettes, and style patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-swagwise-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Smart Outfit Suggestions</strong> — Get daily outfit recommendations from your own closet</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-swagwise-primary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>Cost Per Wear Tracking</strong> — See which pieces deliver real value</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-swagwise-primary to-swagwise-secondary rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-indigo-100 mb-6">
                Swagwise is currently in development. Join the waitlist to be notified when we launch 
                and get early access to AI-powered wardrobe intelligence.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-indigo-200 focus:outline-none focus:border-white"
                />
                <button className="bg-white text-swagwise-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-swagwise-dark mb-4">
              Latest Style Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Evidence-based fashion advice powered by real wardrobe data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
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

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-primary">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-swagwise-primary to-swagwise-secondary text-white">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-forward people waiting for Swagwise. 
            Be the first to experience AI-powered wardrobe intelligence.
          </p>
          <Link href="#waitlist" className="inline-flex items-center justify-center px-8 py-4 bg-white text-swagwise-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  )
}
