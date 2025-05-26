<template>
  <footer class="bg-gray-100 dark:bg-gray-900 p-6">
    <div class="max-w-5xl mx-auto">
      <h2 class="font-bold mb-2">{{ $t('categoriesLabel') }}</h2>
      <ul class="flex flex-wrap gap-4">
        <li v-for="cat in categoryKeys" :key="cat">
          <NuxtLink
            :to="`/${locale}/${cat}`"
            class="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {{ translateCategory(cat) }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import taxonomy from '~/content/taxonomy.json'

const route = useRoute()
const { locale: i18nLocale, t } = useI18n()
const locale = route.params.lang || i18nLocale.value || 'it'

// le chiavi delle categorie (slug)
const categoryKeys = Object.keys(taxonomy)

// se hai traduzioni in locales/*.json sotto "categories"
// altrimenti capitalizza
function translateCategory(slug) {
  const key = `categories.${slug}`
  const translated = t(key)
  return translated !== key ? translated : slug.charAt(0).toUpperCase() + slug.slice(1)
}
</script>
