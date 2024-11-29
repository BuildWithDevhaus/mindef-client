/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'user-bg': "url('/src/assets/images/User Background.png')",
        'sidebar-bg': "url('/src/assets/images/Sidebar navigation Light.png')",
      },
    },
  },
  plugins: [],
}