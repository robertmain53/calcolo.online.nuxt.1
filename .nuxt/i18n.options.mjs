
// @ts-nocheck


export const localeCodes =  [
  "it",
  "en",
  "es",
  "fr"
]

export const localeLoaders = {
  it: [
    {
      key: "locale_it_46json_c0677488",
      load: () => import("#nuxt-i18n/c0677488" /* webpackChunkName: "locale_it_46json_c0677488" */),
      cache: true
    }
  ],
  en: [
    {
      key: "locale_en_46json_b18c4f03",
      load: () => import("#nuxt-i18n/b18c4f03" /* webpackChunkName: "locale_en_46json_b18c4f03" */),
      cache: true
    }
  ],
  es: [
    {
      key: "locale_es_46json_01e0d25b",
      load: () => import("#nuxt-i18n/01e0d25b" /* webpackChunkName: "locale_es_46json_01e0d25b" */),
      cache: true
    }
  ],
  fr: [
    {
      key: "locale_fr_46json_82d110c3",
      load: () => import("#nuxt-i18n/82d110c3" /* webpackChunkName: "locale_fr_46json_82d110c3" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: true
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "it",
      iso: "it-IT",
      name: "Italiano",
      files: [
        {
          path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/it.json",
          cache: undefined
        }
      ]
    },
    {
      code: "en",
      iso: "en-US",
      name: "English",
      files: [
        {
          path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "es",
      iso: "es-ES",
      name: "Español",
      files: [
        {
          path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/es.json",
          cache: undefined
        }
      ]
    },
    {
      code: "fr",
      iso: "fr-FR",
      name: "Français",
      files: [
        {
          path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/fr.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "it",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: true,
  langDir: "locales/",
  rootRedirect: undefined,
  detectBrowserLanguage: false,
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {
    "/calculators": {
      it: "/it/calcolatori",
      en: "/en/calculators",
      es: "/es/calculadoras",
      fr: "/fr/calculatrices"
    },
    "/calculators/[slug]": {
      it: "/it/calcolatori/:slug",
      en: "/en/calculators/:slug",
      es: "/es/calculadoras/:slug",
      fr: "/fr/calculatrices/:slug"
    }
  },
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "it",
    iso: "it-IT",
    name: "Italiano",
    files: [
      {
        path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/it.json",
        cache: undefined
      }
    ]
  },
  {
    code: "en",
    iso: "en-US",
    name: "English",
    files: [
      {
        path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "es",
    iso: "es-ES",
    name: "Español",
    files: [
      {
        path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/es.json",
        cache: undefined
      }
    ]
  },
  {
    code: "fr",
    iso: "fr-FR",
    name: "Français",
    files: [
      {
        path: "/workspaces/calcolo.online.nuxt.1/i18n/locales/fr.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../i18n/locales/it.json", async mod => {
    localeLoaders["it"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("it")
  })

  import.meta.hot.accept("../i18n/locales/en.json", async mod => {
    localeLoaders["en"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en")
  })

  import.meta.hot.accept("../i18n/locales/es.json", async mod => {
    localeLoaders["es"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("es")
  })

  import.meta.hot.accept("../i18n/locales/fr.json", async mod => {
    localeLoaders["fr"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("fr")
  })



}
/** client-end **/