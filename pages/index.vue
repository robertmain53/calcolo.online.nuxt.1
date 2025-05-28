<template>
  <main class="space-y-12 p-4 max-w-5xl mx-auto">
    <!-- SEO-friendly intro -->
    <header class="prose mx-auto mb-10 text-center">
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageDescription }}</p>
    </header>

    <!-- Categorie e sottocategorie -->
    <section v-for="(catData, cat) in taxonomy" :key="cat" class="mb-10">
      <h2 class="text-2xl font-bold mb-2">
        <NuxtLink :to="`/${locale}/${cat}`" class="hover:underline">
          {{ translateCategory(cat) }}
        </NuxtLink>
      </h2>
      <ul v-if="catData.subcategories" class="ml-4 list-disc mb-4 text-sm">
        <li v-for="sub in Object.keys(catData.subcategories)" :key="sub">
          <NuxtLink :to="`/${locale}/${cat}/${sub}`" class="text-blue-600 hover:underline">
            {{ translateCategory(sub) }}
          </NuxtLink>
        </li>
      </ul>
      <!-- Featured calculators -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="tool in featuredByCategory(cat)" :key="tool._path" class="p-4 border rounded hover:shadow">
          <NuxtLink :to="`/${locale}/calculators/${tool.slug}`" class="block font-semibold mb-1 hover:underline">
            {{ tool.title }}
          </NuxtLink>
          <p class="text-xs text-gray-600">{{ tool.description }}</p>
        </div>
      </div>
    </section>

    <!-- Outro -->
    <footer v-if="siteOutro" class="prose mx-auto mt-12 text-center">
      <p v-html="siteOutro" />
    </footer>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { useAsyncData } from '#app'

// Prendi lingua dalla route o da i18n
const route = useRoute()
const { locale: i18nLocale, t } = useI18n()
const locale = route.params.lang || i18nLocale.value || 'it'

// Prendi taxonomy
const { data: taxonomy } = await useAsyncData('taxonomy', () =>
  queryContent('/taxonomy').findOne()
)
const tax = taxonomy.value ? taxonomy.value : {}
 

// Unisci strumenti
const allTools = computed(() =>
  [...(calculators.value || []), ...(rapidTools.value || [])]
)

// Filtra i featured per categoria
function featuredByCategory(cat) {
  return allTools.value.filter(tl => tl.category === cat).slice(0, 5)
}

// Traduci categoria
function translateCategory(slug) {
  const key = `categories.${slug}`
  const translated = t(key)
  return translated !== key ? translated : slug.charAt(0).toUpperCase() + slug.slice(1)
}

// SEO texts
const pageTitle = t('siteTitle') || 'Calcolatori online - Tutte le categorie'
const pageDescription = t('siteIntro') || 'Scopri tutti i nostri calcolatori online suddivisi per categoria. Strumenti utili per ogni esigenza, gratis e senza registrazione.'
const siteOutro = t('siteOutro') || 'Vuoi suggerire un calcolatore? Contattaci!'

// SEO head
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `https://tuosito.it/${locale}` },
    { property: 'og:image', content: '/images/og-home.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: '/images/og-home.jpg' }
  ],
  link: [
    { rel: 'canonical', href: `https://tuosito.it/${locale}` }
  ]
})
</script>
