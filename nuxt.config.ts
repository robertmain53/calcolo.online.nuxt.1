
import sitemap from '@nuxtjs/sitemap'
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

sitemap: {
  siteUrl: 'https://example.com',
  gzip: true,
  routes: async () => {
    const calculators = await import('./content/calculators.json').then(m => m.default)
    return calculators.map(c => `/en/calculators/${c.slug}`)
  }
}
