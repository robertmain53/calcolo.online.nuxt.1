
export default {
  legacy: false,
  locale: 'en',
  strategy: 'prefix_except_default',
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'it', name: 'Italian', file: 'it.json', domain: '', paths: { prefix: 'app/run' } },
    { code: 'es', name: 'Spanish', file: 'es.json' },
    { code: 'fr', name: 'French', file: 'fr.json' }
  ],
  vueI18n: {
    messages: {
      en: { siteTitle: 'RapidTables Clone' },
      it: { siteTitle: 'Clona RapidTables' },
      es: { siteTitle: 'Clon RapidTables' },
      fr: { siteTitle: 'Clone RapidTables' }
    }
  }
}
