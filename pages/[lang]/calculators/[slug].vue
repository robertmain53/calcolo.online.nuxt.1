<template>
  <div class="grid md:grid-cols-4 gap-4">
    <aside>…</aside>
    <article class="md:col-span-3">
      <slot />  <!-- se manca o è dopo un v-if, niente viene renderizzato -->






<template>
  <CalculatorLayout :calculator="calculator">
    <!-- Titolo e descrizione -->
    <h1 class="text-2xl font-bold mb-2">{{ calculator.title }}</h1>
    <p class="mb-4">{{ calculator.description }}</p>

    <!-- Contenuto aggiuntivo in Markdown (se presente) -->
    <div v-if="calculator.content" class="prose mb-6" v-html="markdownToHtml(calculator.content)"></div>

    <!-- Se non ci sono inputs definiti -->
    <p v-if="!calculator.inputs?.length" class="text-gray-500">
      {{ $t('noInputsDefined') }}
    </p>

    <!-- Form dinamico -->
    <form
      v-else
      @submit.prevent
      class="space-y-4 bg-gray-50 p-4 rounded mb-6"
    >
      <div
        v-for="field in calculator.inputs"
        :key="field.name"
        class="flex items-center space-x-2"
      >
        <label :for="field.name" class="w-48">{{ field.label }}</label>
        <input
          :id="field.name"
          v-model.number="values[field.name]"
          :type="field.type"
          class="border rounded px-2 py-1 w-32"
        />
        <span>{{ field.unit }}</span>
      </div>
    </form>

    <!-- Risultato -->
    <div v-if="calculator.formula" class="p-4 bg-white dark:bg-gray-800 rounded">
      <h2 class="font-semibold mb-2">{{ $t('result') }}</h2>
      <p class="text-xl">{{ result }} <span v-if="calculator.resultUnit">{{ calculator.resultUnit }}</span></p>
    </div>
    <p v-else class="text-gray-500">
      {{ $t('noFormulaDefined') }}
    </p>
  </CalculatorLayout>
</template>






    </article>
  </div>
</template>


<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools   from '~/content/rapidTablesCalculators.json'

const route = useRoute()
const slug  = route.params.slug
const all   = [...calculators, ...rapidTools].filter(t => !t.draft)
const calculator = all.find(c => c.slug === slug) || {}

const values = reactive({})
if (calculator.inputs) {
  calculator.inputs.forEach(f => { values[f.name] = f.default ?? 0 })
}

const result = computed(() => {
  if (!calculator.formula) return '–'
  try {
    return new Function(...Object.keys(values), `return ${calculator.formula}`)(
      ...Object.values(values)
    ).toFixed(4)
  } catch {
    return '–'
  }
})
</script>
