/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        luxury: { black: '#0a0a0a', charcoal: '#1a1a1a', dark: '#121212', surface: '#1c1c1c', muted: '#2a2a2a', border: '#333333', text: '#ffffff', textMuted: '#a0a0a0', gold: '#c9a962', goldLight: '#d4b978', goldDark: '#a88b4a', success: '#4ade80', error: '#f87171' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['Playfair Display', 'Georgia', 'serif'] },
      animation: { 'fade-in': 'fadeIn 0.6s ease-out', 'slide-up': 'slideUp 0.6s ease-out' },
      keyframes: { fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } }, slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } } },
    },
  },
  plugins: [],
}