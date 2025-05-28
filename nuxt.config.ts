import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Import CSS globali
  css: ['@/assets/css/tailwind.css'],

  // Moduli
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],

  // Config Content (v2)
  content: {
    // Cartella con i file Markdown
    dir: 'content',
    // Abilita document-driven mode
    documentDriven: true
  }
  // Nota: la config i18n è in i18n.config.ts
})