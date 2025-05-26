<template>
  <CalculatorLayout>
    <h1 class="text-2xl font-bold mb-4">
      {{ $t('searchResultsFor', { term }) }}
    </h1>

    <div v-if="results.length">
      <ul class="space-y-4">
        <li v-for="tool in results" :key="tool.slug">
          <NuxtLink
            :to="`/${locale}/calculators/${tool.slug}`"
            class="text-lg font-semibold text-blue-600 hover:underline"
          >
            {{ tool.title }}
          </NuxtLink>
          <p class="text-sm text-gray-600">{{ tool.description }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="text-gray-500">
      {{ $t('noResults') }}
    </div>
  </CalculatorLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

const route = useRoute()
const locale = route.params.lang || 'en'
const term = route.query.q || ''

// Unisco e filtro i draft
const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)

const results = computed(() => {
  const q = term.toString().toLowerCase()
  return allTools.filter(t =>
    (t.title || '').toLowerCase().includes(q) ||
    (t.description || '').toLowerCase().includes(q)
  )
})
</script>
