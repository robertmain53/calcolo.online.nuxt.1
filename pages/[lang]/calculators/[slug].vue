<script setup>
import { useRoute } from 'vue-router';
import { useContent } from '@nuxt/content';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const slug = route.params.slug;
const { locale } = useI18n();

// carica il Markdown corrispondente
const { data: doc } = await useContent(`calculators/${slug}/${locale.value}`).fetch();
</script>

<template>
  <article v-html="doc.bodyHtml" class="prose mx-auto py-8" />
</template>
