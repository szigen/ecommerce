/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-200': 'repeat(auto-fill, minmax(230px, 1fr))',
      }
    },
  },
  plugins: [],
}