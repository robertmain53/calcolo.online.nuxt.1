<template>
  <div class="p-4 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">{{ $t('allCalculators') }}</h1>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <li
        v-for="tool in allTools"
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
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'

const route = useRoute()
const locale = route.params.lang || 'it'

// tutti i tool pubblicati
const allTools = [...calculators, ...rapidTools].filter(tl => !tl.draft)
</script>
