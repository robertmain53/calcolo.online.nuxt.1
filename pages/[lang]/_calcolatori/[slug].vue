<script setup>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { useRoute, useHead } from '#imports'

const route = useRoute()
const lang = route.params.lang
const slug = route.params.slug

const { data: calculator } = await useAsyncData('calculator', () =>
  queryContent(`/calculators/${lang}/${slug}`).findOne()
)


// Per i breadcrumbs visuali
const breadcrumbs = [
  { name: 'Home', to: `/${lang}` },
  { name: calculator.value.category, to: `/${lang}/calculators?category=${encodeURIComponent(calculator.value.category)}` },
  calculator.value.subcategory
    ? { name: calculator.value.subcategory, to: `/${lang}/calculators?category=${encodeURIComponent(calculator.value.category)}&subcategory=${encodeURIComponent(calculator.value.subcategory)}` }
    : null,
  { name: calculator.value.title, to: null }
].filter(Boolean)

// Structured data breadcrumbs per SEO
const breadcrumbItems = breadcrumbs.map((item, idx) => ({
  '@type': 'ListItem',
  position: idx + 1,
  name: item.name,
  item: item.to ? `https://www.tuosito.com${item.to}` : undefined
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      id: 'ld-breadcrumbs',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      })
    }
  ],
  __dangerouslyDisableSanitizersByTagID: { 'ld-breadcrumbs': ['innerHTML'] }
})
</script>

<template>
    <div v-if="calculator">

  <Breadcrumbs
    :category="calculator.category"
    :subcategory="calculator.subcategory"
    :title="calculator.title"
    :lang="lang"
  />
  <h1>{{ calculator.title }}</h1>
  <ContentRenderer :value="calculator" />

  </div>
  <div v-else>
    <p>Calcolatore non trovato o dati in caricamento.</p>
  </div>
</template>
