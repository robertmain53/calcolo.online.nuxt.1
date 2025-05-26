<template>
  <div class="space-y-12 p-4 max-w-5xl mx-auto">
    <!-- Site intro (opzionale) -->
    <div v-if="siteIntro" v-html="siteIntro" class="prose mx-auto"></div>

    <!-- Loop categorie -->
    <section v-for="(catData, cat) in taxonomy" :key="cat">
      <h2 class="text-2xl font-bold mb-2">
        <NuxtLink :to="`/${locale}/${cat}`" class="hover:underline">
          {{ translateCategory(cat) }}
        </NuxtLink>
      </h2>

      <!-- Sottocategorie -->
      <ul class="ml-4 list-disc mb-4 text-sm">
        <li v-for="sub in Object.keys(catData.subcategories)" :key="sub">
          <NuxtLink :to="`/${locale}/${cat}/${sub}`" class="text-blue-600 hover:underline">
            {{ translateCategory(sub) }}
          </NuxtLink>
        </li>
      </ul>

      <!-- Featured calculators -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="tool in featuredByCategory(cat)"
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
        </div>
      </div>
    </section>

    <!-- Site outro (opzionale) -->
    <div v-if="siteOutro" v-html="siteOutro" class="prose mx-auto mt-12"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import taxonomy from '~/content/taxonomy.json'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'

// locale
const route = useRoute()
const { locale: i18nLocale, t } = useI18n()
const locale = route.params.lang || i18nLocale.value || 'it'

// testo opzionale intro/outro (puoi tenerlo in un JSON a parte)
const siteIntro = `<h1>${t('siteTitle')}</h1><p>${t('siteIntro')}</p>`
const siteOutro = `<p>${t('siteOutro')}</p>`

// unisco tutti i tool, escludo draft
const allTools = [...calculators, ...rapidTools].filter(tl => !tl.draft)

// funzione per featured
function featuredByCategory(cat) {
  return allTools.filter(tl => tl.category === cat).slice(0, 5)
}

// come in Footer
function translateCategory(slug) {
  const key = `categories.${slug}`
  const translated = t(key)
  return translated !== key ? translated : slug.charAt(0).toUpperCase() + slug.slice(1)
}
</script>
