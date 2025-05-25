
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ calculator.title }}</h1>
    <p class="mb-4">{{ calculator.description }}</p>
    <form @submit.prevent="calculate">
      <div v-for="input in calculator.inputs" :key="input.name" class="mb-2">
        <label>{{ input.label }}</label>
        <input v-model.number="form[input.name]" type="number" class="border p-1 ml-2" />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-3 py-1 mt-2">Calculate</button>
    </form>
    <div v-if="result !== null" class="mt-4">
      <strong>Result:</strong> {{ result }}
    </div>
  </div>
</template>

<script setup>
import calculators from '~/content/calculators.json'
import { ref } from 'vue'

const route = useRoute()
const calculator = calculators.find(c => c.slug === route.params.slug)
const form = ref({})
const result = ref(null)

function calculate() {
  try {
    const fn = new Function(...calculator.inputs.map(i => i.name), 'return ' + calculator.formula.split('=')[1])
    result.value = fn(...calculator.inputs.map(i => parseFloat(form.value[i.name])))
  } catch (e) {
    result.value = 'Error in calculation'
  }
}
</script>
