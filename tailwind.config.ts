import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        swagwise: {
          primary: '#6366f1',    // Indigo
          secondary: '#8b5cf6',  // Purple
          accent: '#f59e0b',     // Amber
          dark: '#1e1b4b',       // Deep indigo
          light: '#f5f3ff',      // Light purple
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: '#374151',
            h1: {
              color: '#1e1b4b',
            },
            h2: {
              color: '#1e1b4b',
            },
            h3: {
              color: '#1e1b4b',
            },
            strong: {
              color: '#1e1b4b',
            },
            a: {
              color: '#6366f1',
              '&:hover': {
                color: '#4f46e5',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
