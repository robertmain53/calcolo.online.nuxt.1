<template>
  <CalculatorLayout>
    <h1 class="text-2xl font-bold">{{ category }}</h1>
    <div v-html="taxData.intro" class="prose mb-4"></div>

    <!-- Griglia di tutte le sottocategorie -->
    <ul class="list-disc ml-5 mb-4">
      <li v-for="sub in subs" :key="sub">
        <NuxtLink
          :to="`/${locale}/${category}/${sub}`"
          class="underline text-blue-600"
        >
          {{ sub }}
        </NuxtLink>
      </li>
    </ul>

    <div v-html="taxData.outro" class="prose"></div>
  </CalculatorLayout>
</template>

<script setup>
import taxonomy from '~/content/taxonomy.json'
import { useRoute } from 'vue-router'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

const publishedTools = allTools.filter(t => !t.draft)
const route = useRoute()
const locale = route.params.lang || 'en'
const category = route.params.category || 'calculators'

const taxData = taxonomy[category] || { intro: '', outro: '', subcategories: {} }
const subs = Object.keys(taxData.subcategories)
</script>
