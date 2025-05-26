<template>
  <CalculatorLayout>
    <!-- Titolo sottocategoria -->
    <h1 class="text-2xl font-bold mb-2">{{ capitalize(subcategory) }}</h1>
    <!-- Intro sottocategoria -->
    <div v-html="subData.intro" class="prose mb-6"></div>

    <!-- Griglia dei tool in questa sottocategoria -->
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <li
        v-for="tool in tools"
        :key="tool.slug"
        class="p-4 border rounded hover:shadow"
      >
        <NuxtLink
          :to="`/${locale}/calculators/${tool.slug}`"
          class="block font-medium mb-1"
        >
          {{ tool.title }}
        </NuxtLink>
        <p class="text-sm text-gray-600">{{ tool.description }}</p>
      </li>
    </ul>

    <!-- Outro sottocategoria -->
    <div v-html="subData.outro" class="prose"></div>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import taxonomy from '~/content/taxonomy.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// Parametri di route
const route = useRoute()
const locale = route.params.lang || 'en'
const category = route.params.category
const subcategory = route.params.subcategory

// Unisco e filtro i tool (tolgo i draft)
const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)

// Seleziono solo quelli di questa categoria/sottocategoria
const tools = allTools.filter(
  t =>
    t.category?.toString().toLowerCase() === category.toLowerCase() &&
    t.subcategory?.toString().toLowerCase() === subcategory.toLowerCase()
)

// Estraggo intro/outro dalla taxonomy
const subData =
  (taxonomy[category]?.subcategories || {})[subcategory] || {
    intro: '',
    outro: ''
  }

// Helper per capitalizzare
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>
