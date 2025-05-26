<template>
  <CalculatorLayout>
     <div v-html="siteIntro" class="prose mb-8"></div>

    <div v-for="(catData, catName) in taxonomy" :key="catName" class="mb-12">
      <h2 class="text-2xl font-bold mb-2">{{ catName }}</h2>
      <div v-html="catData.intro" class="prose mb-4"></div>

      <!-- Lista di sottocategorie -->
      <div class="grid gap-8">
        <div
          v-for="(subData, subName) in catData.subcategories"
          :key="subName"
        >
          <h3 class="text-xl font-semibold mb-1">{{ subName }}</h3>
          <div class="prose mb-2" v-html="subData.intro"></div>

          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li
              v-for="tool in featured(catName, subName)"
              :key="tool.slug"
              class="p-4 border rounded hover:shadow"
            >
              <NuxtLink
                :to="`/${locale}/calculators/${tool.slug}`"
                class="font-medium"
              >
                {{ tool.title }}
              </NuxtLink>
            </li>
          </ul>

          <div class="prose mt-2" v-html="subData.outro"></div>
        </div>
      </div>

      <div v-html="catData.outro" class="prose mt-4"></div>
    </div>

    <!-- Contenuto “outro” globale, se serve -->
    <div v-html="siteOutro" class="prose mt-8"></div>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import taxonomy from '~/content/taxonomy.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// 1) Prendo il locale dal route param
const route = useRoute()
const locale = route.params.lang || 'en'

// 2) Unisco e filtro prima di qualsiasi uso
const allTools = [...calculators, ...rapidTools].filter(t => !t.draft)

// 3) Ora posso definire featured senza problemi
function featured(cat, sub) {
  return allTools
    .filter(t => t.category === cat && t.subcategory === sub)
    .slice(0, 5)
}

// 4) (Opzionale) Contenuti globali in intro/outro
const siteIntro = '<h1>Benvenuto su Calcolo.online</h1>'
const siteOutro = '<p>Grazie per la visita!</p>'
</script>

<style>

</style>
