<template>
  <header class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between">
    <NuxtLink :to="`/${locale}`" class="text-xl font-bold">
      {{ $t('brand') }}
    </NuxtLink>
    <div class="flex items-center space-x-4">
      <button @click="toggleDark" class="p-2">
        <span v-if="isDark">☀️</span><span v-else>🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const locale = route.params.lang || 'it'

const isDark = ref(false)
function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('darkMode', isDark.value)
}
onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved==='true' || (saved===null && prefers)
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
