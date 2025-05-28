<script setup>

const route = useRoute()
const lang = route.params.lang
const slug = route.params.slug


const { data: calculator } = await useAsyncData('calculator', () =>
  queryContent(`/calculators/${lang}/${slug}`).findOne()
)
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