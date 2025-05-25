
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Search Results for "{{ q }}"</h1>
    <ul class="space-y-3">
      <li v-for="calc in results" :key="calc.slug">
        <NuxtLink :to="`/${$route.params.lang}/calculators/${calc.slug}`" class="text-blue-600 hover:underline">
          {{ calc.title }}
        </NuxtLink>
        <p class="text-sm text-gray-500">{{ calc.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'

const route = useRoute()
const q = route.query.q?.toLowerCase() || ''
const results = calculators.filter(c =>
  c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
)
</script>
