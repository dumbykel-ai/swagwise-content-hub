# Swagwise Content Hub

AI-powered fashion intelligence blog with 100+ data-driven style guides.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
/swagwise-content-hub
├── /app                    # Next.js app router
│   ├── /blog
│   │   ├── page.tsx        # Blog index
│   │   └── /[slug]
│   │       └── page.tsx    # Individual articles
│   ├── /about
│   │   └── page.tsx        # About page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt with AI crawler access
├── /content
│   ├── /pillars            # 11 comprehensive guide articles
│   └── /clusters           # 89 focused topic articles
├── /components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ArticleCard.tsx
├── /lib
│   └── articles.ts         # Markdown processing utilities
└── /public                 # Static assets
```

## Content Organization

### Pillars (11 articles)
Comprehensive guides covering major topic areas:
- Style DNA Architecture
- Psychology of Getting Dressed
- Digital Wardrobe Revolution
- AI Fashion Technology
- Capsule Wardrobe Mastery
- Fashion Confidence Framework
- Sustainable Fashion Practices
- Wardrobe Economics
- Body Type and Fit
- Professional and Occasion Dressing
- Color Theory for Your Wardrobe

### Clusters (89 articles)
Focused articles that link back to pillar guides, targeting specific search queries.

## Article Format

All articles use frontmatter for metadata:

```markdown
---
title: "Article Title"
description: "Meta description for SEO (150-160 chars)"
slug: "url-friendly-slug"
date: "2025-01-12"
author: "Swagwise Team"
category: "Category Name"
pillar: "pillar-slug"
keywords: ["keyword1", "keyword2"]
readTime: "8 min read"
---

# Article Title

Article content in markdown...
```

## GEO Optimization

This site is optimized for Generative Engine Optimization (GEO):

- **Quotable definitions** in first 100 words
- **Specific Swagwise data** throughout articles
- **Structured data** (JSON-LD) on every article
- **AI crawler access** via robots.txt
- **Internal linking** between pillars and clusters

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Configure domain
4. Auto-deploy on push

### Manual Build

```bash
npm run build
npm start
```

## Adding New Articles

1. Create markdown file in appropriate directory:
   - Pillars: `/content/pillars/[slug].md`
   - Clusters: `/content/clusters/[slug].md`

2. Add frontmatter with required fields

3. Commit and push (auto-deploys on Vercel)

## License

Copyright © 2025 Swagwise. All rights reserved.
