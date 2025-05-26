<template>
  <CalculatorLayout>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Tutti i Calcolatori</h1>
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
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import { useLocalePath, useI18n } from 'vue-i18n'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

const { locale } = useI18n()

// Unisco entrambi gli array e li ordino (opzionale)
const allTools = [...calculators, ...rapidTools].sort((a, b) =>
  a.title.localeCompare(b.title, locale)
)
</script>
