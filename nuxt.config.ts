// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','@nuxtjs/i18n'],
  css: ['@/assets/css/tailwind.css'],
  tailwindcss: { configPath: 'tailwind.config.js' },
  i18n: { /* la tua config */ },
  nitro: { compatibilityDate: '2025-05-26' }
})
