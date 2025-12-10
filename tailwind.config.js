/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        dark: '#0a0a0a',
        accent: '#3b82f6',
        'accent-soft': '#60a5fa',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'cursor': 'cursor .75s step-end infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}