
<template>
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      <NuxtLink to="/" class="text-xl font-bold">{{ $t('brand') }}</NuxtLink>
      <input v-model="query" @keyup.enter="search" :placeholder="$t('search')" class="text-black px-2 py-1 rounded" />
      <nav class="space-x-4 ml-4">
        <NuxtLink v-for="lang in ['en', 'it', 'es', 'fr']" :key="lang" :to="`/${lang}`" class="hover:underline">
          {{ lang.toUpperCase() }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>



<script setup>
import { ref } from 'vue'
const query = ref('')
function search() {
  if (query.value) {
    navigateTo(`/en/search?q=${encodeURIComponent(query.value)}`)
  }
}
</script>
