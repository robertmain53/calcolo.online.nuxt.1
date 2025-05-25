
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ $t('siteTitle') }}</h1>
    <div>
      <h2 class="text-xl font-semibold mb-2">Categories</h2>
      <ul>
        <li v-for="cat in categories" :key="cat">
          <NuxtLink :to="`/${$route.params.lang}/${cat.toLowerCase()}`">{{ cat }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import categories from '~/content/categories.json'
</script>
