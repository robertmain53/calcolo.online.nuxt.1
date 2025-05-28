import { defineI18nConfig } from 'nuxt-i18n'

export default defineI18nConfig({
  defaultLocale: 'it',
  strategy: 'prefix_except_default',
  lazy: true,
  langDir: 'locales/',
  locales: [
    { code: 'it', iso: 'it-IT', file: 'it.json' },
    { code: 'en', iso: 'en-US', file: 'en.json' },
    { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
    { code: 'es', iso: 'es-ES', file: 'es.json' }
  ],
  customRoutes: 'config',
  pages: {
    'calculator/[slug]': {
      en: '/calculator/:slug',
      fr: '/calculateur/:slug',
      es: '/calculadora/:slug'
    }
  },
  vueI18n: {
    legacy: false,
    globalInjection: true,
    fallbackLocale: 'it'
  }
})