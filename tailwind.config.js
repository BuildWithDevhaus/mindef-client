/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'user-bg': "url('/src/assets/images/User Background.png')",
      },
    },
  },
  plugins: [],
}