import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B1E3C',
        darkMid: '#0F2A5F',
        darkEnd: '#1E3A8A',
        primary: '#3B82F6',
        accent: '#60A5FA',
        highlight: '#60A5FA',
        'highlight-green': '#22C55E',
        'highlight-amber': '#F59E0B',
        'bg-light': '#F8FAFC',
        'bg-alt': '#F1F5F9',
        surface: '#FFFFFF',
        'text-dark': '#0F172A',
        'text-muted': '#475569',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xl: '40px',
      },
      borderRadius: {
        '3xl': '24px',
      },
      boxShadow: {
        glow: '0 6px 14px rgba(59, 130, 246, 0.12)',
        'glow-lg': '0 10px 20px rgba(59, 130, 246, 0.15)',
        'glow-xl': '0 0 40px rgba(96, 165, 250, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config
