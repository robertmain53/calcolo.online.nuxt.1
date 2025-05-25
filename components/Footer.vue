
<template>
  <footer class="bg-gray-100 text-center text-sm py-6 border-t mt-6">
    <p class="mb-2">&copy; 2025 {{ $t('brand') }}. {{ $t('rights') }}</p>
    <div class="flex flex-wrap justify-center gap-4 text-blue-600">
      <NuxtLink
        v-for="cat in $t('categories')"
        :key="cat.slug"
        :to="`/${$i18n.locale}/${cat.slug}`"
        class="hover:underline"
      >
        {{ cat.label }}
      </NuxtLink>
    </div>
  </footer>
</template>
