
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
     '@nuxtjs/tailwindcss'  
  ],
  css: [
     '~/assets/css/tailwind.css'
  ],
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', name: 'Italiano' },
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'es', iso: 'es-ES', name: 'Español' }
    ],
    defaultLocale: 'it',
    strategy: 'prefix_except_default', // oppure 'prefix' se vuoi sempre /it
    vueI18n: './i18n.config.js'
  }
})
