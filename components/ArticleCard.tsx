import Link from 'next/link'

interface ArticleCardProps {
  title: string
  description: string
  slug: string
  category: string
  readTime: string
  date: string
  isPillar?: boolean
}

export default function ArticleCard({
  title,
  description,
  slug,
  category,
  readTime,
  date,
  isPillar = false,
}: ArticleCardProps) {
  return (
    <article className={`card overflow-hidden ${isPillar ? 'border-swagwise-primary border-2' : ''}`}>
      <Link href={`/blog/${slug}`} className="block p-6 h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${isPillar ? 'bg-swagwise-primary text-white' : 'badge-primary'}`}>
            {isPillar ? '📚 Pillar Guide' : category}
          </span>
          <span className="text-sm text-gray-500">{readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold text-swagwise-dark mb-2 group-hover:text-swagwise-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{date}</span>
          <span className="text-swagwise-primary font-medium flex items-center gap-1">
            Read more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
