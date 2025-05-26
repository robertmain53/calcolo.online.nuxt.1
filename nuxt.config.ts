export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  css: ['@/assets/css/tailwind.css'],
  tailwindcss: { configPath: 'tailwind.config.js' },
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', name: 'Italiano' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    defaultLocale: 'it',
    detectBrowserLanguage: false
  },
  nitro: { compatibilityDate: '2025-05-26' }
})
