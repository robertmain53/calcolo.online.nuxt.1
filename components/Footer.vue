<template>
  <footer class="bg-gray-100 dark:bg-gray-800 py-4">
    <div class="container mx-auto px-4">
      <ul class="flex flex-wrap space-x-4">
        <li v-for="category in categories" :key="category.slug">
          <NuxtLink
            :to="localizedLink(category.slug)"
            class="text-gray-700 dark:text-gray-200 hover:underline"
          >
            {{ t(`categories.${category.slug}`) }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import useCategories from '@/composables/useCategories';

const { t, locale } = useI18n();
const { categories } = useCategories();

function localizedLink(slug) {
  return `/${locale.value}/${slug}`;
}
</script>

<style scoped>
/* eventuali stili extra */
</style>
