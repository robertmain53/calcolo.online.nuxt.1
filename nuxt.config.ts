// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
     '@vueuse/nuxt'    
  ],

  // CSS globali
  css: ['~/assets/css/tailwind.css'],

  // Configurazione Tailwind
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
    configPath: 'tailwind.config.js'
  },

  // Configurazione i18n
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', file: 'it.json', name: 'Italiano' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' }
    ],
    defaultLocale: 'it',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    pages: {
      '/calculators': {
        it: '/it/calcolatori',
        en: '/en/calculators',
        es: '/es/calculadoras',
        fr: '/fr/calculatrices'
      },
      '/calculators/[slug]': {
        it: '/it/calcolatori/:slug',
        en: '/en/calculators/:slug',
        es: '/es/calculadoras/:slug',
        fr: '/fr/calculatrices/:slug'
      }
    }
  },

  // Meta head globale
  app: {
    head: {
      titleTemplate: '%s — Calcolo.online'
    }
  }
})
