<template>
  <header class="bg-white dark:bg-gray-800 shadow p-4 flex items-center justify-between">
    <!-- Brand -->
    <NuxtLink :to="`/${locale}`" class="text-xl font-bold">
      {{ $t('brand') }}
    </NuxtLink>

    <!-- Search form -->
      <form @submit.prevent="onSearch" class="flex flex-1 md:flex-none p-10">
        <input
          v-model="searchTerm"
          type="text"
          :placeholder="$t('searchPlaceholder')"
          class="flex-1 border rounded-l px-3 py-1 focus:outline-none"
        />
        <button
          type="submit"
          class="bg-blue-600 text-white px-3 py-1 rounded-r hover:bg-blue-700"
          aria-label="Search"
        >
          🔍
        </button>
      </form>

    <div class="flex items-center space-x-4">
      <!-- Language switcher -->
      <div class="space-x-2">
        <button
          v-for="loc in localeCodes"
          :key="loc"
          @click="changeLocale(loc)"
          :class="[
            'text-sm px-2 py-1 rounded focus:outline-none',
            loc === locale ? 'font-bold underline' : ''
          ]"
        >
          {{ loc.toUpperCase() }}
        </button>
      </div>
  
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()

// Prendo il locale corrente da i18n
const { locale: localeRef } = useI18n()
const locale = computed(() => route.params.lang || localeRef.value || 'it')

// Array hard-coded dei codici lingua
const localeCodes = ['it','en','es','fr']

// Search term
const searchTerm = ref(route.query.q || '')

function onSearch() {
  if (searchTerm.value.trim()) {
    router.push({ path: `/${locale.value}/search`, query: { q: searchTerm.value.trim() }})
  }
}

// Cambio lingua sostituendo il primo segmento dell'URL
function changeLocale(code) {
  const segments = route.path.split('/')
  segments[1] = code
  const newPath = segments.join('/') || `/${code}`
  router.push(newPath)
}

 

</script>
