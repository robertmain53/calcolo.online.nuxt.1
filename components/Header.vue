<template>
  <header class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
    <NuxtLink to="/" class="text-xl font-bold">Calcolo.online</NuxtLink>
    <div class="flex items-center space-x-4">
      <input
        v-model="query"
        @keyup.enter="onSearch"
        placeholder="🔍 {{ $t('search') }}"
        class="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
      />
      <select v-model="locale" @change="switchLocale" class="border rounded px-2 py-1">
        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
          {{ loc.name }}
        </option>
      </select>
      <button @click="toggleDark" class="p-2">
        <span v-if="isDark">🌙</span><span v-else>☀️</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'
const { locale, locales, t } = useI18n()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const query = ref('')
function onSearch() {
  if (query.trim()) {
    navigateTo(`/${locale.value}/search?q=${encodeURIComponent(query)}`)
  }
}
function switchLocale() {
  locale.value = locale.value
}
</script>
