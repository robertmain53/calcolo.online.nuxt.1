/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',          // anche se non useremo il toggle, lo lasci
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './app.vue'
  ],
  theme: { extend: {} },
  plugins: []
}
