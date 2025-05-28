<template>
  <div class="max-w-5xl mx-auto px-2 py-8">
    <h1 class="text-3xl font-bold mb-4">
      {{ categoryTitle }}
    </h1>
    <div v-if="categoryIntro" class="mb-6 prose" v-html="categoryIntro"></div>

    <!-- Sottocategorie -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="(subcat, subSlug) in subcategories"
        :key="subSlug"
        :to="`/${lang}/${category}/${subSlug}`"
        class="border rounded-xl p-4 hover:shadow transition bg-white flex flex-col"
      >
        <div class="font-semibold text-lg mb-2">
          {{ capitalize(subSlug) }}
        </div>
        <div v-if="subcat.intro" class="text-sm text-gray-500" v-html="subcat.intro"></div>
      </NuxtLink>
    </div>

    <div v-if="categoryOutro" class="prose mt-10" v-html="categoryOutro"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import taxonomy from '~/content/taxonomy.json'

const route = useRoute()
const { locale } = useI18n()

const lang = computed(() => route.params?.lang || locale.value || 'it')
const category = computed(() => route.params?.category || '')

const categoryData = computed(() => taxonomy?.[category.value] || {})
const categoryIntro = computed(() => categoryData.value?.intro || '')
const categoryOutro = computed(() => categoryData.value?.outro || '')
const subcategories = computed(() => categoryData.value?.subcategories || {})

const categoryTitle = computed(() =>
  category.value.charAt(0).toUpperCase() + category.value.slice(1)
)

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>
