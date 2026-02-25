import Link from 'next/link'

interface OutfitItem {
  name: string
  category: string
  color: string
  colorName: string
  icon: string
}

const outfitItems: OutfitItem[] = [
  {
    name: 'Relaxed-Fit Linen Blazer',
    category: 'Outerwear',
    color: '#d4c5a9',
    colorName: 'Sand',
    icon: '🧥',
  },
  {
    name: 'Fitted Crew-Neck Tee',
    category: 'Top',
    color: '#f5f5f5',
    colorName: 'White',
    icon: '👕',
  },
  {
    name: 'High-Rise Straight Jeans',
    category: 'Bottom',
    color: '#3b5998',
    colorName: 'Medium Wash',
    icon: '👖',
  },
  {
    name: 'Leather Chelsea Boots',
    category: 'Shoes',
    color: '#5c4033',
    colorName: 'Cognac',
    icon: '👢',
  },
  {
    name: 'Minimalist Watch',
    category: 'Accessory',
    color: '#c0c0c0',
    colorName: 'Silver',
    icon: '⌚',
  },
]

const outfitTags = ['Smart Casual', 'Spring', 'Versatile', 'Day-to-Night']

export default function TodaysOutfit() {
  return (
    <section className="py-20 bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge-primary text-sm font-semibold uppercase tracking-wider mb-4 inline-block">
            Daily Pick
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-swagwise-dark mb-4">
            Today&apos;s Outfit
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A curated outfit suggestion based on weather, trends, and versatility—powered by Swagwise AI.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card p-8">
            {/* Outfit Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold text-swagwise-dark">
                  Effortless Smart Casual
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  5 pieces · Perfect for work, coffee dates, or weekend errands
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {outfitTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-swagwise-light text-swagwise-primary text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Outfit Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {outfitItems.map((item) => (
                <div
                  key={item.name}
                  className="group flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-swagwise-primary/30 hover:shadow-sm transition-all duration-200"
                >
                  {/* Icon & Color Swatch */}
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                  </div>

                  {/* Item Details */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-swagwise-primary mb-1">
                    {item.category}
                  </span>
                  <span className="text-sm font-medium text-swagwise-dark leading-tight">
                    {item.name}
                  </span>

                  {/* Color Indicator */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className="w-3 h-3 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-gray-400">{item.colorName}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Style Tip */}
            <div className="bg-gradient-to-r from-swagwise-light to-indigo-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-swagwise-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-swagwise-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-swagwise-dark text-sm mb-1">Style Tip</h4>
                  <p className="text-gray-600 text-sm">
                    Roll the blazer sleeves once for a relaxed vibe. Swap the boots for white sneakers
                    to dress it down, or add a pocket square to dress it up for dinner.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm mb-4">
              Want daily personalized outfits from your own wardrobe?
            </p>
            <Link href="#waitlist" className="btn-primary">
              Join the Waitlist for Daily Outfits
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
