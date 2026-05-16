/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08080a',
        'bg-raised': '#0f0f12',
        text: '#f5f5f7',
        'text-dim': '#9b9ba0',
        accent: '#dc2626',
        'accent-gold': '#d4af37',
      },
      fontFamily: {
        display: ['"General Sans"', '"Inter Tight"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
