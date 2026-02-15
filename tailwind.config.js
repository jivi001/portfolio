/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#020617', 
          900: '#0f172a',
          800: '#1e293b',
        },
        primary: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        display: ['Open Sans', 'sans-serif'],
        mono: ['Open Sans', 'monospace'],
      },
    },
  },
  plugins: [],
}
