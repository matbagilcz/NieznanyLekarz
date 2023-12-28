/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'very-light-purple': '#f9fafe',
        'secondary': '#3540ff',
        'bluey-grey': '#a2a8c1',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};