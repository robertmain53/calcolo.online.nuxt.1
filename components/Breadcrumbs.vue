<script setup>
import { useRoute } from '#imports'
import { computed } from 'vue'

const props = defineProps({
  category: { type: String, required: true },
  subcategory: { type: String, required: false },
  title: { type: String, required: true },
  lang: { type: String, required: true }
})

// Link base per ciascuna lingua
const routeMap = {
  it: { root: '', calculators: 'calcolatori' },
  en: { root: '', calculators: 'calculators' },
  fr: { root: '', calculators: 'calculatrices' },
  es: { root: '', calculators: 'calculadoras' }
}

const basePath = computed(() => `/${props.lang}/${routeMap[props.lang].calculators}`)

const breadcrumbs = computed(() => {
  if (!props.category || !props.title) return []
  let arr = [
    { name: 'Home', to: `/${props.lang}` },
    { name: props.category, to: `${basePath.value}?category=${encodeURIComponent(props.category)}` }
  ]
  if (props.subcategory) {
    arr.push({ name: props.subcategory, to: `${basePath.value}?category=${encodeURIComponent(props.category)}&subcategory=${encodeURIComponent(props.subcategory)}` })
  }
  arr.push({ name: props.title, to: null })
  return arr
})


// Per structured data
const breadcrumbItems = computed(() =>
  breadcrumbs.value.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.to ? (typeof item.to === 'string' ? (new URL(item.to, 'https://calcolo.online')).href : '') : undefined
  }))
)
</script>

<template>
  <nav v-if="breadcrumbs.length" aria-label="breadcrumbs" class="text-sm mb-4">
    <ol class="flex flex-wrap items-center gap-2">
      <li v-for="(bc, idx) in breadcrumbs" :key="idx" class="flex items-center">
        <template v-if="bc.to">
          <NuxtLink :to="bc.to" class="hover:underline text-gray-700">{{ bc.name }}</NuxtLink>
        </template>
        <template v-else>
          <span class="text-gray-500">{{ bc.name }}</span>
        </template>
        <span v-if="idx < breadcrumbs.length - 1" class="mx-2 text-gray-400">/</span>
      </li>
    </ol>
 
  </nav>
</template>
