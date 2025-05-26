<template>
  <CalculatorLayout>
    <h1 class="text-2xl font-bold">{{ subcategory }}</h1>
    <div v-html="subData.intro" class="prose mb-4"></div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

    <div v-html="subData.outro" class="prose mt-4"></div>
  </CalculatorLayout>
</template>

<script setup>
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import taxonomy from '~/content/taxonomy.json'
import { useRoute } from 'vue-router'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

const publishedTools = allTools.filter(t => !t.draft)

const route = useRoute()
const locale = route.params.lang || 'en'
const category = route.params.category
const subcategory = route.params.subcategory

const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)
const tools = allTools.filter(
  t => t.category === category && t.subcategory === subcategory
)

const subData =
  (taxonomy[category]?.subcategories || {})[subcategory] || {
    intro: '',
    outro: ''
  }
</script>
