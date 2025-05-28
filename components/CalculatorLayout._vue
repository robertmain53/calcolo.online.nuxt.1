<template>
  <div class="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Main content -->
    <main class="md:col-span-3">
      <slot />
    </main>
    <!-- Sidebar -->
    <aside class="md:col-span-1 bg-gray-50 p-4 rounded">
      <h2 class="font-semibold mb-3">{{ $t('tools') }}</h2>
      <ul class="space-y-1 text-sm">
        <li v-for="slug in tools" :key="slug">
          <NuxtLink :to="`/${locale}/calculators/${slug}`" class="text-blue-600 hover:underline">
            {{ getAlternateTitle(slug) }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import calcolo from '~/content/Calcolo.json'

const props = defineProps({
  calculator: { type: Object, required: true },
  tools:      { type: Array,  default: () => [] }
})

const route = useRoute()
const locale = computed(() => route.params.lang || 'it')


// Helper per alternativetitle
function getAlternateTitle(slug) {
  const item =
  calculators.concat(rapidTools, calcolo).find(c => c.slug === slug)
  return item?.alternativetitle || item?.title || slug
}


</script>
