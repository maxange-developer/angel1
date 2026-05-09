/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        surface: '#0a0a0a',
        'surface-2': '#111113',
        accent: {
          DEFAULT: '#1F8BFF',
          hover: '#3FA0FF',
          soft: 'rgba(31,139,255,0.12)',
          line: 'rgba(31,139,255,0.32)',
        },
        hairline: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          strong: 'rgba(255,255,255,0.18)',
          soft: 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        text: ['Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
        article: '720px',
      },
    },
  },
  plugins: [],
};
