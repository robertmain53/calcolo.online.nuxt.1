<template>
  <nav aria-label="Breadcrumb" class="text-sm text-gray-600 mb-4 p-10">
    <ol class="list-reset flex space-x-1">
      <li v-for="(crumb, i) in crumbs" :key="i" class="flex items-center">
        <NuxtLink
          v-if="crumb.to"
          :to="crumb.to"
          class="hover:underline"
        >
          {{ crumb.text }}
        </NuxtLink>
        <span v-else>
          {{ crumb.text }}
        </span>
        <span v-if="i < crumbs.length - 1" class="px-1">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
const locale = computed(() => route.params.lang || 'it')

// Helper per capitalizzare
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const crumbs = computed(() => {
  const c = []
  // 1) Home
  c.push({ text: t('home'), to: `/${locale.value}` })

  const { category, subcategory, slug } = route.params

  // 2) Se siamo in /[lang]/calculators or its children, aggiungiamo “Calculators”
  if (route.path.startsWith(`/${locale.value}/calculators`)) {
    c.push({
      text: t('allCalculators'),
      to: `/${locale.value}/calculators`
    })
  }

  // 3) Categoria
  if (category && !route.path.includes('/calculators/')) {
    // pagina categoria o sottocategoria
    c.push({
      text: t(`categories.${category}`) !== `categories.${category}`
        ? t(`categories.${category}`)
        : capitalize(category),
      to: `/${locale.value}/${category}`
    })
  }

  // 4) Sottocategoria
  if (subcategory) {
    c.push({
      text: t(`categories.${subcategory}`) !== `categories.${subcategory}`
        ? t(`categories.${subcategory}`)
        : capitalize(subcategory),
      to: `/${locale.value}/${category}/${subcategory}`
    })
  }

  // 5) Calcolatore
 // if (slug) {
    // se siamo nella pagina slug
 //    const title = route.meta.title || route.params.slug
 //    c.push({ text: title, to: null })
 //  }

  return c
})
</script>
