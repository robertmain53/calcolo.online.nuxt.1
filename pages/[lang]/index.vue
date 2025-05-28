<template>
  <CalculatorLayout>
    <h1 class="text-3xl font-bold mb-4">{{ $t('siteTitle') }}</h1>
    <div class="prose mb-6" v-html="markdownToHtml($t('siteIntro'))"></div>

    <div v-for="cat in grouped" :key="cat.name" class="mb-8">
      <h2 class="text-2xl font-semibold mb-2">{{ cat.localized }}</h2>
      <p class="mb-4">{{ cat.contentIntro }}</p>
      <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li v-for="calc in cat.items.slice(0,5)" :key="calc.slug" class="border p-4 rounded">
          <NuxtLink :to="`/${locale}/calculators/${calc.slug}`" class="font-semibold">
            {{ calc.alternativetitle }}
          </NuxtLink>
        </li>
      </ul>
      <div class="mt-4 prose" v-html="markdownToHtml(cat.contentOutro)"></div>
    </div>

    <div class="prose" v-html="markdownToHtml($t('siteOutro'))"></div>
  </CalculatorLayout>
</template>

<script setup>
import { useCalculatorStore } from '~/composables/useCalculatorStore'
import { useI18n } from 'vue-i18n'
const { calculators } = useCalculatorStore()
const { locale, t } = useI18n()

function markdownToHtml(md = '') {
  return md.replace(/\n\n/g,'<br><br>').replace(/\n/g,'<br>')
}

// Group by category → subcategory
const grouped = computed(() => {
  const map = {}
  calculators.value.forEach(c => {
    const key = c.category
    if (!map[key]) {
      map[key] = { name: key, localized: t(`categories.${key}`), contentIntro: t(`categories.${key}Intro`), contentOutro: t(`categories.${key}Outro`), items: [] }
    }
    map[key].items.push(c)
  })
  return Object.values(map)
})
</script>
