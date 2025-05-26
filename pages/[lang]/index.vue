<template>
  <CalculatorLayout>
    <div class="p-4 space-y-12">
      <!-- Loop sulle categorie definite in taxonomy.json -->
      <section
        v-for="(catData, catName) in taxonomy"
        :key="catName"
      >
        <!-- Titolo categoria -->
        <NuxtLink
          :to="`/${locale}/${catName}`"
          class="text-2xl font-bold hover:underline"
        >
          {{ capitalize(catName) }}
        </NuxtLink>

        <!-- Sottocategorie -->
        <ul class="ml-4 list-disc mb-4 text-sm">
          <li
            v-for="sub in Object.keys(catData.subcategories)"
            :key="sub"
          >
            <NuxtLink
              :to="`/${locale}/${catName}/${sub}`"
              class="text-blue-600 hover:underline"
            >
              {{ capitalize(sub) }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Featured calculators per categoria -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="tool in featuredByCategory(catName)"
            :key="tool.slug"
            class="p-4 border rounded hover:shadow"
          >
            <NuxtLink
              :to="`/${locale}/calculators/${tool.slug}`"
              class="block font-medium mb-1 hover:underline"
            >
              {{ tool.title }}
            </NuxtLink>
            <p class="text-xs text-gray-500">{{ tool.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import taxonomy from '~/content/taxonomy.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// 1) Prendo la lingua da URL
const route = useRoute()
const locale = route.params.lang || 'en'

// 2) Unisco tutti i tool e filtro i draft
const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)

// 3) Funzione per ottenere i featured per categoria
function featuredByCategory(cat) {
  return allTools
    .filter(t => 
      typeof t.category === 'string' &&
      t.category.toLowerCase() === cat.toLowerCase()
    )
    .slice(0, 5)
}

// 4) Helper per capitalizzare
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
