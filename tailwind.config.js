/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        neon: {
          emerald: '#00f59b',
          teal: '#00f5d4',
          cyan: '#00c8e0',
          blue: '#0A84FF',
          rose: '#FF4A6B',
          amber: '#FF9500',
        }
      }
    },
  },
  plugins: [],
}