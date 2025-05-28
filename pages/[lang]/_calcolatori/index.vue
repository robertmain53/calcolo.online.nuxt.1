<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-2">{{ categoryTitle }}</h1>
    <p class="text-gray-500 mb-6">{{ categoryDescription }}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="sub in subcategories"
        :key="sub.slug"
        :to="`/${lang}/${category}/${sub.slug}`"
        class="block bg-white rounded-xl shadow p-4 hover:bg-gray-50 transition"
      >
        <h2 class="font-semibold text-lg mb-1">{{ sub.title }}</h2>
        <p class="text-sm text-gray-500">{{ sub.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { t, locale } = useI18n()
const lang = route.params.lang || locale.value || 'en'
const category = route.params.category

// Carica il taxonomy.json per struttura categorie
const { data: taxonomy } = await useAsyncData('taxonomy', () => queryContent('/taxonomy').findOne())

const categoryData = computed(() => taxonomy.value?.[category] || {})
const categoryTitle = computed(() => categoryData.value?.title || category)
const categoryDescription = computed(() => categoryData.value?.description || '')
const subcategories = computed(() =>
  Object.entries(categoryData.value?.subcategories || {}).map(([slug, obj]) => ({
    slug,
    title: obj.title,
    description: obj.description
  }))
)
</script>

<!-- Mobile-first: 1 colonna, 2 su sm, 3 su lg -->
<style scoped>
/* puoi personalizzare qui se vuoi colori diversi */
</style>
