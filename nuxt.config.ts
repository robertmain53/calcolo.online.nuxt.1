export default {
  // …
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    // …
  ],
  i18n: {
    locales: [
      { code: 'it', iso: 'it-IT', file: 'it.json' },
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json' },
    ],
    defaultLocale: 'it',
    strategy: 'prefix',
    lazy: true,
    langDir: 'locales/',
    pages: {
      'calculators/_slug': {
        it: '/it/calculators/:slug',
        en: '/en/calculators/:slug',
        es: '/es/calculators/:slug',
        fr: '/fr/calculators/:slug',
      }
    }
  },
  content: {
    // opzioni @nuxt/content se serve
  }
}
