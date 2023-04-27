/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'day': "url('/src/assets/img/bg_morning.png')",
        'night': "url('/src/assets/img/bg_night.png')",
      }
    },
  },
  plugins: [],
}