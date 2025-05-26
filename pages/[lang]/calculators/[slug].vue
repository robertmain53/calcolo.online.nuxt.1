<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ calculator.title }}</h1>
    <!-- formula LaTeX-style -->
   <div class="mb-6">
     <!-- Qui puoi mostrare la formula raw o un’immagine -->
     <code>{{ calculator.formula }}</code>
   </div>    <!-- inputs & live calculation slot -->
    <CalculatorLayout :calculator="calculator" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'
// import Mathjax from '~/components/Mathjax.vue' // ← rimosso

const route = useRoute()
const slug  = route.params.slug
const allTools = [...calculators, ...rapidTools]
const calculator = allTools.find(c => c.slug === slug) || {}
</script>

