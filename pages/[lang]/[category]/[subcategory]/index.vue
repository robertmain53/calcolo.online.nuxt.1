<template>
  <div class="p-4 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">{{ translateCategory(subcategory) }}</h1>
    <div v-html="subData.intro" class="prose mb-6"></div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <li
        v-for="tool in tools"
        :key="tool.slug"
        class="p-4 border rounded hover:shadow"
      >
        <NuxtLink
          :to="`/${locale}/calculators/${tool.slug}`"
          class="block font-semibold mb-1 hover:underline"
        >
          {{ tool.title }}
        </NuxtLink>
        <p class="text-xs text-gray-600">{{ tool.description }}</p>
      </li>
    </ul>
    <div v-html="subData.outro" class="prose"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import taxonomy from '~/content/taxonomy.json'

const route = useRoute()
const { t } = useI18n()
const locale = route.params.lang || 'it'
const category = route.params.category
const subcategory = route.params.subcategory

const allTools = [...calculators, ...rapidTools].filter(tl => !tl.draft)

 const tools = allTools.filter(tl =>
   tl.category?.trim().toLowerCase() === category.toLowerCase() &&
   tl.subcategory?.trim().toLowerCase() === subcategory.toLowerCase()
)

const subData = (taxonomy[category]?.subcategories || {})[subcategory] || {intro:'', outro:''}

function translateCategory(slug) {
  const key = `categories.${slug}`
  return t(key) !== key ? t(key) : slug.charAt(0).toUpperCase()+slug.slice(1)
}

</script>
