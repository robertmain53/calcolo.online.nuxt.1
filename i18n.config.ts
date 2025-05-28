
export default {
  legacy: false,
  locale: 'it',
  messages: {},
  strategy: 'prefix_except_default',
  detectBrowserLanguage: false,
  locales: ['en', 'it', 'es', 'fr'],
  vueI18n: {
    messages: {
      en: {
        brand: 'Calcolo.online',
        search: 'Search...',
        rights: 'All rights reserved',
        categories: [
          { slug: 'electrical', label: 'Electrical' },
          { slug: 'math', label: 'Math' },
          { slug: 'lighting', label: 'Lighting' },
          { slug: 'physics', label: 'Physics' },
          { slug: 'finance', label: 'Finance' }
        ]
      },
      it: {
        brand: 'Calcolo.online',
        search: 'Cerca...',
        rights: 'Tutti i diritti riservati',
        categories: [
          { slug: 'electrical', label: 'Elettricità' },
          { slug: 'math', label: 'Matematica' },
          { slug: 'lighting', label: 'Illuminazione' },
          { slug: 'physics', label: 'Fisica' },
          { slug: 'finance', label: 'Finanza' }
        ]
      },
      es: {
        brand: 'Calcolo.online',
        search: 'Buscar...',
        rights: 'Todos los derechos reservados',
        categories: [
          { slug: 'electrical', label: 'Eléctrico' },
          { slug: 'math', label: 'Matemáticas' },
          { slug: 'lighting', label: 'Iluminación' },
          { slug: 'physics', label: 'Física' },
          { slug: 'finance', label: 'Finanzas' }
        ]
      },
      fr: {
        brand: 'Calcolo.online',
        search: 'Rechercher...',
        rights: 'Tous droits réservés',
        categories: [
          { slug: 'electrical', label: 'Électrique' },
          { slug: 'math', label: 'Mathématiques' },
          { slug: 'lighting', label: 'Éclairage' },
          { slug: 'physics', label: 'Physique' },
          { slug: 'finance', label: 'Finance' }
        ]
      }
    }
  }
}
