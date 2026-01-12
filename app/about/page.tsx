import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Swagwise | AI-Powered Fashion Intelligence',
  description: 'Learn about Swagwise methodology. Our fashion recommendations are backed by analysis of 50,000+ wardrobes and real user data, not opinions.',
  openGraph: {
    title: 'About Swagwise',
    description: 'Data-driven fashion intelligence backed by real wardrobe analysis.',
    url: 'https://swagwise.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container-blog">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-swagwise-dark mb-6">
            About Swagwise
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fashion intelligence backed by data, not opinions. Here's how we're changing 
            the way people think about their wardrobes.
          </p>
        </header>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-swagwise-dark mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Swagwise exists to solve a universal problem: <strong>most people have closets full of clothes 
            but nothing to wear.</strong>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The average person wears only 20% of their wardrobe regularly. They buy pieces that don't 
            coordinate, follow trends that don't suit them, and make decisions based on how clothes 
            look on models rather than on themselves.
          </p>
          <p className="text-lg text-gray-700">
            We're building AI-powered tools to change that—helping people understand their personal 
            style DNA, make smarter purchasing decisions, and get more value from every piece they own.
          </p>
        </section>

        {/* Data Methodology */}
        <section className="mb-16 bg-swagwise-light rounded-xl p-8">
          <h2 className="text-2xl font-bold text-swagwise-dark mb-6">Our Data Methodology</h2>
          <p className="text-lg text-gray-700 mb-6">
            Every claim we make is backed by real data. Here's what powers our insights:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-swagwise-dark mb-2">📊 Wardrobe Analysis</h3>
              <p className="text-gray-700">
                Analysis of 50,000+ digitized wardrobes, tracking what people own, what they wear, 
                and what sits untouched.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-swagwise-dark mb-2">👥 User Surveys</h3>
              <p className="text-gray-700">
                Ongoing surveys capturing satisfaction, confidence, and behavior data from 
                real users making real wardrobe decisions.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-swagwise-dark mb-2">💰 Cost Tracking</h3>
              <p className="text-gray-700">
                Cost-per-wear calculations across thousands of items, revealing which purchases 
                deliver real value.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-swagwise-dark mb-2">🔬 Behavioral Patterns</h3>
              <p className="text-gray-700">
                Machine learning analysis of style patterns, color preferences, and 
                successful outfit combinations.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-swagwise-dark mb-6">What Makes Us Different</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-swagwise-primary pl-6">
              <h3 className="font-bold text-swagwise-dark mb-2">Data Over Opinions</h3>
              <p className="text-gray-700">
                Most fashion advice is subjective opinion dressed up as rules. We analyze what 
                actually works—tracked through real usage, satisfaction scores, and outfit success rates.
              </p>
            </div>
            
            <div className="border-l-4 border-swagwise-primary pl-6">
              <h3 className="font-bold text-swagwise-dark mb-2">Personalization Over Trends</h3>
              <p className="text-gray-700">
                Trends change. Your coloring, body proportions, and lifestyle don't. We focus on 
                helping you understand what works for YOU, not what's popular this season.
              </p>
            </div>
            
            <div className="border-l-4 border-swagwise-primary pl-6">
              <h3 className="font-bold text-swagwise-dark mb-2">Practical Over Aspirational</h3>
              <p className="text-gray-700">
                We're not here to sell you fantasy wardrobes. We help you build functional closets 
                that work for your actual life—your job, your budget, your body.
              </p>
            </div>
            
            <div className="border-l-4 border-swagwise-primary pl-6">
              <h3 className="font-bold text-swagwise-dark mb-2">Inclusive By Design</h3>
              <p className="text-gray-700">
                Our recommendations work across all body types, budgets, and style preferences. 
                Fashion intelligence shouldn't be exclusive.
              </p>
            </div>
          </div>
        </section>

        {/* The Content */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-swagwise-dark mb-6">Our Content</h2>
          <p className="text-lg text-gray-700 mb-4">
            The Swagwise blog contains 100+ comprehensive guides covering every aspect of building 
            a wardrobe that works:
          </p>
          <ul className="text-lg text-gray-700 space-y-2 mb-6">
            <li>• <strong>Style DNA</strong> — Understanding your personal style patterns</li>
            <li>• <strong>Color Theory</strong> — Finding colors that flatter your unique coloring</li>
            <li>• <strong>Capsule Wardrobes</strong> — Building minimal, functional closets</li>
            <li>• <strong>Wardrobe Economics</strong> — Making financially smart clothing decisions</li>
            <li>• <strong>Body Type & Fit</strong> — Evidence-based fit guidance for all bodies</li>
            <li>• <strong>Professional Dressing</strong> — Context-appropriate style for work and occasions</li>
            <li>• <strong>Sustainable Fashion</strong> — Reducing waste while building better wardrobes</li>
          </ul>
          <p className="text-lg text-gray-700">
            Every article includes specific Swagwise data points, actionable recommendations, and 
            links to related content for deeper exploration.
          </p>
        </section>

        {/* CTA */}
        <section className="cta-box text-center">
          <h3>Join the Swagwise Community</h3>
          <p>
            Be the first to access AI-powered wardrobe intelligence when we launch. 
            Plus, get exclusive early content and updates.
          </p>
          <a href="#waitlist" className="btn inline-block">
            Join the Waitlist →
          </a>
        </section>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link href="/blog" className="btn-secondary">
            ← Explore Our Guides
          </Link>
        </div>
      </div>
    </div>
  )
}
