/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D2C54',
        secondary: '#145DA0',
        accent: '#0E86D4',
        background: '#F4F6F8',
        text: '#1C1C1C',
        highlight: '#89CFF0',
      },
    },
  },
  plugins: [],
}
