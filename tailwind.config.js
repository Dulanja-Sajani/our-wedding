/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9960C',
          light: '#D4AF37',
          metallic: '#E6C547',
        },
        ivory: {
          DEFAULT: '#FDF6ED',
          cream: '#FFFDF8',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          light: '#FAF0E6',
          dark: '#E6D5B8',
        },
        beige: {
          DEFAULT: '#D4B896',
          light: '#E8D5C4',
          dark: '#C4A878',
        },
        brown: {
          DEFAULT: '#3D1F0D',
          light: '#4A2C0A',
        },
        accent: {
          red: '#8B1A1A',
        },
      },
      fontFamily: {
        sinhala: ['Noto Serif Sinhala', 'serif'],
        garamond: ['Cormorant Garamond', 'serif'],
        fell: ['"IM Fell English"', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 2px rgba(201,150,12,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 8px rgba(201,150,12,0.7))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'marble': "linear-gradient(135deg, rgba(255,253,248,0.7) 0%, rgba(247,231,206,0.5) 50%, rgba(232,213,196,0.4) 100%)",
        'gold-gradient': 'linear-gradient(135deg, #C9960C 0%, #D4AF37 50%, #C9960C 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #FAF0E6 0%, #E8D5C4 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201,150,12,0.3)',
        'gold-lg': '0 8px 40px rgba(201,150,12,0.4)',
        'champagne': '0 4px 20px rgba(212,175,150,0.25)',
        'card': '0 4px 30px rgba(61,31,13,0.12)',
      },
    },
  },
  plugins: [],
}
