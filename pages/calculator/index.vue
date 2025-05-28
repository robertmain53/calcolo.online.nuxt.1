<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ $t('allCalculators') }}</h1>
    <ul class="space-y-2">
      <li v-for="item in pages" :key="item._path">
        <nuxt-link
          class="text-blue-600 hover:underline"
          :to="localePath('calculator-slug', { slug: item._raw.flattenedPath.split('/').pop() })"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { queryContent } from '#content'

const { locale } = useI18n()
// Recupera tutti i documenti nella cartella content/{locale}
const { data: pages } = await queryContent(locale.value).find()
</script>