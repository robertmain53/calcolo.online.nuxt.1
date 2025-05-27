<!-- app.vue -->
<template>
  <Header />
    <Breadcrumbs />

  <NuxtPage />
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

</script>
