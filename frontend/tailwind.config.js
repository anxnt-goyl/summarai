/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#13131a',
        primary: '#8b5cf6', // purple-500
        secondary: '#3b82f6', // blue-500
        accent: '#ec4899', // pink-500
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow': 'linear-gradient(to right, #8b5cf6, #3b82f6)',
      }
    },
  },
  plugins: [],
}
