
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Calculators: {{ $route.params.category }}</h1>
    <ul>
      <li v-for="calc in filtered" :key="calc.slug">
        <NuxtLink :to="`/${$route.params.lang}/calculators/${calc.slug}`">{{ calc.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import calculators from '~/content/calculators.json'
const route = useRoute()
const filtered = calculators.filter(c => c.category.toLowerCase() === route.params.category.toLowerCase())
</script>
