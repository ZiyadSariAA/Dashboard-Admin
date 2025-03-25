/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ enable class-based dark mode
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
