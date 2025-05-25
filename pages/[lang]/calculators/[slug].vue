
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

const route = useRoute()
const calculator = calculators.find(c => c.slug === route.params.slug)

// Hardcode keys to prevent reactivity issues
const form = ref({
  vin: 0,
  r1: 0,
  r2: 0
})

const result = computed(() => {
  try {
    const vin = Number(form.value.vin) || 0
    const r1 = Number(form.value.r1) || 0
    const r2 = Number(form.value.r2) || 0
    const fn = new Function('vin', 'r1', 'r2', 'return vin * r2 / (r1 + r2)')
    const res = fn(vin, r1, r2)
    return isFinite(res) ? res : NaN
  } catch {
    return NaN
  }
})
</script>
