import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://swagwise.com'),
  title: {
    default: 'Swagwise | AI-Powered Fashion Intelligence',
    template: '%s | Swagwise'
  },
  description: 'Swagwise provides data-driven fashion intelligence, helping you build a wardrobe that works. Discover your style DNA, optimize your closet, and dress with confidence.',
  keywords: ['fashion', 'style', 'wardrobe', 'AI fashion', 'personal style', 'capsule wardrobe', 'color analysis'],
  authors: [{ name: 'Swagwise Team' }],
  creator: 'Swagwise',
  publisher: 'Swagwise',
  verification: { google: 'rGkfmmG9Acmdc7HcLt1kRgjhbq3LCV-F0tUzfoXSge0' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swagwise.com',
    siteName: 'Swagwise',
    title: 'Swagwise | AI-Powered Fashion Intelligence',
    description: 'Data-driven fashion intelligence for your wardrobe.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Swagwise - AI Fashion Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swagwise | AI-Powered Fashion Intelligence',
    description: 'Data-driven fashion intelligence for your wardrobe.',
    images: ['/og-image.png'],
    creator: '@swagwise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
