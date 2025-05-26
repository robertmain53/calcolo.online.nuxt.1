<template>
  <Header />
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen">
    <aside class="md:col-span-1 bg-gray-50 p-4 border">Sidebar</aside>
    <main class="md:col-span-3 p-4">
      <NuxtPage />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
