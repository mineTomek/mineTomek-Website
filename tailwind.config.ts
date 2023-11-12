import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        text: {
          50: '#f2f2f2',
          100: '#e5e5e6',
          200: '#cbcbcd',
          300: '#b2b2b3',
          400: '#98989a',
          500: '#7e7e81',
          600: '#656567',
          700: '#4c4c4d',
          800: '#323234',
          900: '#19191a',
          950: '#0d0d0d',
        },
        background: '#F4F9F3',
        primary: {
          50: '#eef6f2',
          100: '#ddeee6',
          200: '#bbddcd',
          300: '#99ccb3',
          400: '#77bb9a',
          500: '#55aa81',
          600: '#448867',
          700: '#33664d',
          800: '#224434',
          900: '#11221a',
          950: '#09110d',
        },
        secondary: {
          50: '#faeeeb',
          100: '#f4dcd7',
          200: '#e9baaf',
          300: '#de9787',
          400: '#d3745f',
          500: '#c85137',
          600: '#a0412c',
          700: '#783121',
          800: '#502116',
          900: '#28100b',
          950: '#140805',
        },
        accent: {
          50: '#edf2f7',
          100: '#dbe5f0',
          200: '#b7cbe1',
          300: '#93b1d2',
          400: '#6f98c3',
          500: '#4b7eb4',
          600: '#3c6590',
          700: '#2d4b6c',
          800: '#1e3248',
          900: '#0f1924',
          950: '#080d12',
        },
      },
    },
  },
  plugins: [],
}
export default config
