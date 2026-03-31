import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
        },
        subject: {
          korean: '#EF4444',
          math: '#3B82F6',
          english: '#10B981',
          social: '#F59E0B',
          science: '#8B5CF6',
          pe: '#EC4899',
          music: '#14B8A6',
          art: '#F97316',
          tech: '#6366F1',
          other: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
