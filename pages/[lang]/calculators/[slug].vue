<template>
  <div v-if="!calculator" class="text-center py-8">{{ $t('calculatorNotFound') }}</div>
  <CalculatorLayout v-else :calculator="calculator" :tools="calculator.tools">
    <Head>
      <title>{{ calculator.metatitle }}</title>
      <meta name="description" :content="calculator.metadescription" />
    </Head>

    <h1 class="text-2xl font-bold mb-2">{{ calculator.title }}</h1>
    <p v-if="calculator.description" class="mb-4">{{ calculator.description }}</p>
    <div v-if="calculator.intro" class="prose mb-6" v-html="calculator.intro"></div>

    <!-- form e risultato ... (come in precedenza) -->

    <div v-if="calculator.outro" class="prose mt-6" v-html="calculator.outro"></div>

    <section v-if="calculator.infoSections.length" class="mt-8">
      <h2 class="text-xl font-bold mb-4">{{ $t('moreInfo') }}</h2>
      <Accordion :sections="calculator.infoSections" />
    </section>

    <section v-if="calculator.seeAlso.length" class="mt-8">
      <h2>{{ $t('seeAlso') }}</h2>
      <ul class="list-disc ml-5">
        <li v-for="s in calculator.seeAlso" :key="s">
          <NuxtLink :to="`/${locale}/calculators/${s}`">{{ s }}</NuxtLink>
        </li>
      </ul>
    </section>
  </CalculatorLayout>
</template>

<script setup>
import { useRoute, useError } from 'vue-router'
import { useCalculatorStore } from '~/composables/useCalculatorStore'
const { findBySlug, locale } = useCalculatorStore()
const route = useRoute()
const calculator = findBySlug(route.params.slug)
if (!calculator) useError({ statusCode: 404, statusMessage: 'Not Found' })
</script>
