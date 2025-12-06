/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,hooks}/**/*.{js,ts,jsx,tsx}", // For files inside components and hooks folders
    "./*.{js,ts,jsx,tsx}", // For files like App.tsx, index.tsx, types.ts in the root
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
