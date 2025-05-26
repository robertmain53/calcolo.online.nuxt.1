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
        <li v-for="see in calculator.seeAlso || []" :key="see">
          <NuxtLink
            :to="`/${locale}/calculators/${see}`"
            class="text-blue-600 hover:underline"
          >
            {{ see }}
          </NuxtLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const locale = computed(() => route.params.lang || 'it')

// Ricevo il prop "calculator" dal genitore
defineProps({
  calculator: {
    type: Object,
    required: true
  }
})
</script>
