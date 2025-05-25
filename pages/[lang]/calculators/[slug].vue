
<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ calculator.title }}</h1>
    <p class="mb-4 text-gray-700">{{ calculator.description }}</p>

    <div v-for="input in calculator.inputs" :key="input.name" class="mb-3">
      <label class="block font-semibold mb-1">{{ input.label }}</label>
      <input
        v-model.number="form[input.name]"
        type="number"
        step="any"
        class="border rounded px-3 py-1 w-full"
        placeholder="Enter {{ input.label }}"
      />
    </div>

    <div class="mt-4 text-lg">
      <strong>Result:</strong>
      <span v-if="!isNaN(result)">{{ result }}</span>
      <span v-else class="text-red-600">Invalid input</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import calculators from '~/content/calculators.json'
import { fallbackFormulas } from '~/content/fallbackFormulas'

const route = useRoute()
const slug = route.params.slug
const calculator = calculators.find(c => c.slug === slug)

const form = ref({})
calculator.inputs.forEach(i => {
  form.value[i.name] = 0
})

const result = computed(() => {
  try {
    const args = calculator.inputs.map(i => i.name)
    const values = args.map(n => Number(form.value[n]) || 0)
    const rawFormula = calculator.formula || fallbackFormulas[slug]
    const fn = new Function(...args, `return ${rawFormula}`)
    return fn(...values)
  } catch (err) {
    console.warn('Calculation failed for:', slug, err)
    return NaN
  }
})
</script>
