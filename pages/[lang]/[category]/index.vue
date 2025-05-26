<template>
  <CalculatorLayout>
    <!-- Titolo categoria -->
    <h1 class="text-2xl font-bold mb-2">{{ capitalize(category) }}</h1>
    <!-- Intro della categoria -->
    <div v-html="taxData.intro" class="prose mb-6"></div>

    <!-- Elenco sottocategorie -->
    <ul class="list-disc ml-5 mb-6">
      <li v-for="sub in subs" :key="sub">
        <NuxtLink
          :to="`/${locale}/${category}/${sub}`"
          class="underline text-blue-600"
        >
          {{ capitalize(sub) }}
        </NuxtLink>
      </li>
    </ul>

    <!-- Outro della categoria -->
    <div v-html="taxData.outro" class="prose"></div>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import taxonomy from '~/content/taxonomy.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// 1. Prendo i parametri di route
const route = useRoute()
const locale = route.params.lang || 'en'
const category = route.params.category

// 2. Carico i dati da taxonomy.json (che deve avere chiavi lowercase)
const taxData = taxonomy[category] || {
  intro: '<p>Questa categoria non esiste.</p>',
  outro: '',
  subcategories: {}
}

// 3. Lista delle sottocategorie
const subs = Object.keys(taxData.subcategories)

// 4. Capitalize helper
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>
