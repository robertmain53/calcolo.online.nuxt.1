// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content' 
  ],
  content: {
    dir: 'content'
  },

  css: ['@/assets/css/tailwind.css'],
  tailwindcss: { configPath: 'tailwind.config.js' },
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'en', iso: 'en-US', name: 'English',  file: 'en.json' },
      { code: 'es', iso: 'es-ES', name: 'Español',  file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'it',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: false
  },
  nitro: { compatibilityDate: '2025-05-26' }
})
