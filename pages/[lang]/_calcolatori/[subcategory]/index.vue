<template>
  <div class="max-w-6xl mx-auto p-4">
    <div v-if="subcategoryData?.intro" class="prose mb-4" v-html="subcategoryData.intro" />
    <h1 class="text-2xl font-bold mb-4 capitalize">{{ subcategory }}</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="tool in calcolatori"
        :key="tool._path"
        :to="`/${lang}/calcolatori/${tool.slug}`"
        class="block bg-white rounded-xl shadow p-4 hover:bg-gray-50 transition"
      >
        <h2 class="font-semibold text-lg mb-1">{{ tool.title }}</h2>
        <p class="text-sm text-gray-500">{{ tool.description }}</p>
      </NuxtLink>
    </div>
    <div v-if="subcategoryData?.outro" class="prose mt-8" v-html="subcategoryData.outro" />
  </div>
</template>

<script setup>
const route = useRoute()
const { locale } = useI18n()
const lang = route.params.lang || locale.value || 'it'
const category = route.params.category
const subcategory = route.params.subcategory

// Carica taxonomy
const { data: taxonomy } = await useAsyncData('taxonomy', () => queryContent('/taxonomy').findOne())
const categoryData = computed(() => taxonomy.value?.[category] ?? {})
const subcategoryData = computed(() => categoryData.value?.subcategories?.[subcategory] ?? {})

// Prendi i calcolatori per category+subcategory
const { data: calculators } = await useAsyncData(
  `${category}-${subcategory}-tools`,
  () => queryContent('/calculators').where({ category, subcategory }).find()
)
</script>
