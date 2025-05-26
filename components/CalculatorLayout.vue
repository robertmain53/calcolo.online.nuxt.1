<template>
  <!-- Breadcrumbs -->
  <nav class="text-xs text-gray-600 mb-4">
    <template v-for="(crumb, i) in breadcrumbs" :key="i">
      <NuxtLink
        v-if="crumb.to"
        :to="crumb.to"
        class="underline hover:text-gray-800"
      >
        {{ crumb.title }}
      </NuxtLink>
      <span v-else class="font-semibold">{{ crumb.title }}</span>
      <span v-if="i < breadcrumbs.length - 1"> / </span>
    </template>
  </nav>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <aside class="md:col-span-1 bg-gray-50 p-4 border rounded">
      <h3 class="font-bold mb-2">{{ $t('tools') /* o testo statico */ }}</h3>
      <ul class="text-sm space-y-1">
        <li v-for="link in related" :key="link">
          <NuxtLink
            :to="`/${locale}/calculators/${link}`"
            class="text-blue-600 hover:underline"
          >
            {{ link }}
          </NuxtLink>
        </li>
      </ul>
    </aside>

    <article class="md:col-span-3">
      <slot />

      <section v-if="calculator.content" class="mt-6">
        <h2 class="font-semibold text-lg">Content</h2>
        <div
          class="prose"
          v-html="markdownToHtml(calculator.content)"
        ></div>
      </section>

      <section v-if="calculator.seeAlso?.length" class="mt-6">
        <h2 class="font-semibold text-lg">See Also</h2>
        <ul class="list-disc list-inside">
          <li
            v-for="see in calculator.seeAlso"
            :key="see"
          >
            <NuxtLink
              :to="`/${locale}/calculators/${see}`"
              class="text-blue-600 hover:underline"
            >
              {{ see }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section v-if="calculator.feedback" class="mt-6">
        <h2 class="font-semibold text-lg">Feedback</h2>
        <p>{{ calculator.feedback }}</p>
      </section>

      <div class="mt-4 text-xs text-gray-500">
        <span v-if="calculator.created">
          Created: {{ calculator.created }}
        </span>
        <span v-if="calculator.modified">
          | Modified: {{ calculator.modified }}
        </span>
        <span v-if="calculator.author">
          | Author: {{ calculator.author }}
        </span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import useBreadcrumbs from '~/composables/useBreadcrumbs'

function markdownToHtml(md) {
  return md
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/\n/g, '<br>')
}

const route = useRoute()

// 1. Locale dinamico
const locale = route.params.lang || 'en'

// 2. Slug del calcolatore
const slug = route.params.slug

// 3. Unisco custom + RapidTables
const allCalcs = [...calculators, ...rapidTools]

// 4. Trovo il calcolatore (o oggetto vuoto)
const calculator = allCalcs.find(c => c.slug === slug) || {}

// 5. Voci correlate
const related = calculator.seeAlso || []

// 6. Breadcrumbs
const breadcrumbs = useBreadcrumbs()
</script>
