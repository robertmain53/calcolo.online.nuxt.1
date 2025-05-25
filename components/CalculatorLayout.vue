
<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <aside class="md:col-span-1 bg-gray-50 p-4 border rounded">
      <h3 class="font-bold mb-2">Tools</h3>
      <ul class="text-sm space-y-1">
        <li v-for="link in related" :key="link">
          <NuxtLink :to="`/en/calculators/${link}`" class="text-blue-600 hover:underline">
            {{ link }}
          </NuxtLink>
        </li>
      </ul>
    </aside>

    <article class="md:col-span-3">
      <nav class="text-xs text-gray-600 mb-2">
        <NuxtLink to="/en" class="underline">Home</NuxtLink> / 
        <NuxtLink :to="`/en/${calculator.category.toLowerCase()}`" class="underline">{{ calculator.category }}</NuxtLink> /
        {{ calculator.title }}
      </nav>

      <slot />

      <section class="mt-6">
        <h2 class="font-semibold text-lg">Content</h2>
        <div class="prose" v-html="markdownToHtml(calculator.content || '')"></div>
      </section>

      <section class="mt-6">
        <h2 class="font-semibold text-lg">See Also</h2>
        <ul class="list-disc list-inside">
          <li v-for="see in calculator.seeAlso || []" :key="see">
            <NuxtLink :to="`/en/calculators/${see}`" class="text-blue-600 hover:underline">{{ see }}</NuxtLink>
          </li>
        </ul>
      </section>

      <section class="mt-6">
        <h2 class="font-semibold text-lg">Feedback</h2>
        <p>{{ calculator.feedback }}</p>
      </section>

      <div class="mt-4 text-xs text-gray-500">
        Created: {{ calculator.created }} | Modified: {{ calculator.modified }} | Author: {{ calculator.author }}
      </div>
    </article>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'

function markdownToHtml(md) {
  return md.replace(/## (.+)/g, '<h2>$1</h2>').replace(/\n/g, '<br>')
}

const route = useRoute()
const slug = route.params.slug
const calculator = calculators.find(c => c.slug === slug) || {}
const related = calculator.seeAlso || []
</script>
