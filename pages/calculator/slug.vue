<template>
  <div class="container mx-auto flex flex-col md:flex-row">
    <aside class="hidden md:block md:w-1/4 lg:w-1/5 p-4 sticky top-24">
      <Sidebar />
    </aside>

    <main class="flex-1 p-4">
      <nav aria-label="breadcrumb" class="text-sm mb-4">
        <ol class="flex flex-wrap">
          <li v-for="(cat, i) in page.category" :key="i" class="mr-2">
            <nuxt-link
              :to="localePath('category-page', { category: page.category.slice(0, i+1).join('/') })"
            >{{ cat }}</nuxt-link>
            <span v-if="i < page.category.length - 1">/</span>
          </li>
          <li class="text-gray-500">{{ page.title }}</li>
        </ol>
      </nav>

      <h1 class="text-2xl font-bold mb-4">{{ page.title }}</h1>
      <nuxt-content :document="page" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { queryContent } from '#content'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale } = useI18n()
const route = useRoute()
// Cerca il documento corrispondente allo slug
const { data: result } = await queryContent(locale.value, route.params.slug as string).find()
const page = result[0]
</script>