
<template>
  <header class="bg-gray-800 text-white py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      <NuxtLink to="/" class="text-xl font-bold">RapidTables Clone</NuxtLink>
      <nav class="space-x-4">
        <NuxtLink v-for="lang in ['en', 'it', 'es', 'fr']" :key="lang" :to="`/${lang}`" class="hover:underline">
          {{ lang.toUpperCase() }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
