/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#F0D98E',
          300: '#E8C766',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#9C7A17',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(2%, -3%) scale(1.04)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-3%, 2%) scale(1.06)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
        drift: 'drift 26s ease-in-out infinite',
        driftSlow: 'driftSlow 34s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

