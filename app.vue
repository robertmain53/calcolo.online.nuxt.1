<!-- app.vue -->
<template>
  <Header />
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen">
    <!-- Sidebar fissa su tutte le pagine -->
    <aside class="md:col-span-1 bg-gray-50 p-4 border">
      <!-- Qui metti gli eventuali link della sidebar -->
      <NuxtLink to="/" class="block mb-2">Home</NuxtLink>
      <NuxtLink to="/it" class="block mb-2">IT Home</NuxtLink>
      <NuxtLink to="/en" class="block mb-2">EN Home</NuxtLink>
      <!-- …altre voci… -->
    </aside>

    <!-- Main content -->
    <main class="md:col-span-3 p-4">
      <Header />   <!-- rimuovi questa riga se vuoi un solo Header -->
      <NuxtPage />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>
