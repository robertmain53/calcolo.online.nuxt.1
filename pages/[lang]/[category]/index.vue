<template>
  <div class="p-4 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-2">{{ translateCategory(category) }}</h1>
    <div v-html="catData.intro" class="prose mb-6"></div>
    <ul class="list-disc ml-5 mb-6">
      <li v-for="sub in subcats" :key="sub">
        <NuxtLink :to="`/${locale}/${category}/${sub}`" class="hover:underline">
          {{ translateCategory(sub) }}
        </NuxtLink>
      </li>
    </ul>
    <div v-html="catData.outro" class="prose"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import taxonomy from '~/content/taxonomy.json'

const route = useRoute()
const { t } = useI18n()
const locale = route.params.lang || 'it'
const category = route.params.category

const catData = taxonomy[category] || { intro:'', outro:'', subcategories:{} }
const subcats = Object.keys(catData.subcategories)

function translateCategory(slug) {
  const key = `categories.${slug}`
  return t(key) !== key ? t(key) : slug.charAt(0).toUpperCase()+slug.slice(1)
}

 
</script>
