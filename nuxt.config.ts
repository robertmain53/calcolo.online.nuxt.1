import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    'nuxt-sitemap' // ✅ this is the correct reference
  ], 
i18n: {
    locales: ['en', 'it', 'es', 'fr'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
  sitemap: {
    siteUrl: 'https://example.com',
    xsl: false
  },
  tailwindcss: {
    viewer: false
  }
})