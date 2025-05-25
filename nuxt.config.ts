
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  i18n: {
    locales: ['en', 'it', 'es', 'fr'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
  tailwindcss: {
    viewer: false
  }
})
