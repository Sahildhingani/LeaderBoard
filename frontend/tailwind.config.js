/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',  // Larger than 160
        '256': '64rem',  // Even larger spacing
        '320': '80rem',  // Much larger
        // Add more as needed
      },
    },
  },
  plugins: [],
}

