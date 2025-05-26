
// File: pages/[lang]/calculators/index.vue
<template>
  <CalculatorLayout>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">All Calculators</h1>
      <ul class="grid md:grid-cols-2 gap-4">
        <li
          v-for="tool in allTools"
          :key="tool.slug"
          class="p-4 border rounded hover:shadow"
        >
          <NuxtLink
            :to="`/${locale}/calculators/${tool.slug}`"
            class="block text-lg font-semibold mb-1"
          >
            {{ tool.title }}
          </NuxtLink>
          <p class="text-sm text-gray-600">{{ tool.description }}</p>
        </li>
      </ul>
    </div>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// locale
const route = useRoute()
const locale = route.params.lang || 'en'

// merge & filter draft
const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)
</script>
