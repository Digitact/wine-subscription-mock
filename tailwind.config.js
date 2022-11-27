/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ['Garamond', 'Baskerville', 'Caslon', 'serif'],
    },
    extend: {
      colors: {
        primary: '#212529',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
    },
  },
  plugins: [],
}
