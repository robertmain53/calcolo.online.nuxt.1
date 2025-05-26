<template>
  <CalculatorLayout>
    <div class="p-4 bg-white rounded shadow">
      <h1 class="text-2xl font-bold mb-4">{{ calculator.title }}</h1>
      <p class="mb-4 text-gray-600">{{ calculator.description }}</p>

      <form @submit.prevent>
        <div
          v-for="input in calculator.inputs"
          :key="input.name"
          class="mb-3"
        >
          <label class="block font-semibold mb-1">
            {{ input.label }}
          </label>
          <input
            v-model.number="form[input.name]"
            type="number"
            step="any"
            class="border px-3 py-1 rounded w-full"
            :placeholder="input.label"
          />
        </div>
      </form>

      <div class="mt-4 text-lg">
        <strong>Result:</strong>
        <span v-if="result !== null">{{ result }}</span>
        <span v-else class="text-gray-500">
          Inserisci tutti i valori per calcolare
        </span>
      </div>
    </div>
  </CalculatorLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import { fallbackFormulas } from '~/content/fallbackFormulas'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// 1. Recupera lo slug e il calcolatore
const route = useRoute()
const slug = route.params.slug
const allCalcs = [...calculators, ...rapidTools]
const calculator = allCalcs.find(c => c.slug === slug)

// 2. Inizializza il form come oggetto reactive con valori null
const form = reactive({})
calculator.inputs.forEach(i => {
  form[i.name] = null
})

// 3. Computed che ritorna null finché un campo è mancante o NaN, altrimenti il calcolo
const result = computed(() => {
  // Prendi i valori raw
  const raw = calculator.inputs.map(i => form[i.name])
  // Se manca almeno uno, non calcolare
  if (raw.some(v => v === null || v === undefined)) {
    return null
  }
  // Cast a number e check NaN
  const values = raw.map(v => Number(v))
  if (values.some(v => isNaN(v))) {
    return null
  }
  // Scegli la formula (inline o fallback)
  const formula = calculator.formula?.trim() || fallbackFormulas[slug]
  if (!formula) {
    return null
  }
  try {
    const args = calculator.inputs.map(i => i.name)
    const fn = new Function(...args, `return ${formula}`)
    return fn(...values)
  } catch (err) {
    console.error('Calculation error:', err)
    return null
  }
})
</script>
