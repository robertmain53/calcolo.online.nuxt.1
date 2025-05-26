<template>
  <div>
    <div v-if="!loaded" class="text-center py-8 text-gray-500">
      {{ $t('loading') }}
    </div>

    <div v-else-if="!calculator" class="text-center py-8 text-red-600">
      {{ $t('calculatorNotFound') }}
    </div>

    <CalculatorLayout v-else :calculator="calculator">
      <!-- Titolo -->
      <h1 class="text-2xl font-bold mb-2">{{ calculator.title }}</h1>

      <!-- Descrizione -->
      <p v-if="calculator.description" class="mb-4">{{ calculator.description }}</p>

      <!-- Markdown extra -->
      <div
        v-if="calculator.content"
        class="prose mb-6"
        v-html="markdownToHtml(calculator.content)"
      ></div>

      <!-- Form dinamico -->
      <form v-if="calculator.inputs?.length" @submit.prevent class="space-y-4 mb-6">
        <div
          v-for="field in calculator.inputs"
          :key="field.name"
          class="flex items-center space-x-2"
        >
          <label :for="field.name" class="w-44">{{ field.label }}</label>
          <input
            :id="field.name"
            v-model.number="values[field.name]"
            :type="field.type"
            class="border rounded px-2 py-1 w-32"
          />
          <span>{{ field.unit }}</span>
        </div>
      </form>
      <p v-else class="text-gray-500">
        {{ $t('noInputsDefined') }}
      </p>

      <!-- Risultato -->
      <div v-if="calculator.formula" class="p-4 bg-gray-50 rounded">
        <h2 class="font-semibold mb-2">{{ $t('result') }}</h2>
        <p class="text-xl">
          {{ computedResult ?? '–' }}
          <span v-if="calculator.resultUnit">{{ calculator.resultUnit }}</span>
        </p>
      </div>
      <p v-else class="text-gray-500">
        {{ $t('noFormulaDefined') }}
      </p>
    </CalculatorLayout>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'

// Semplice parser markdown
function markdownToHtml(md = '') {
  return md
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

// Route params
const route = useRoute()
const slug = route.params.slug

// Stato di caricamento
const loaded = ref(false)
const calculator = ref(null)

// Carica i dati e trova il calcolatore
onMounted(() => {
  const all = [...calculators, ...rapidTools].filter(t => !t.draft)
  calculator.value = all.find(c => c.slug === slug) || null
  // Inizializza i valori degli input
  if (calculator.value?.inputs) {
    calculator.value.inputs.forEach(f => {
      values[f.name] = f.default ?? 0
    })
  }
  loaded.value = true
})

// Stato dei valori
const values = reactive({})

// Computed per il risultato
const computedResult = computed(() => {
  const calc = calculator.value
  if (!calc?.formula || !calc.inputs?.length) return null
  // Controlla che tutti gli input siano numerici
  for (const f of calc.inputs) {
    if (values[f.name] === '' || isNaN(values[f.name])) {
      return null
    }
  }
  // Valuta la formula
  try {
    // Es: "Vin * R2 / (R1 + R2)"
    const fn = new Function(
      ...calc.inputs.map(f => f.name),
      `return ${calc.formula}`
    )
    const res = fn(...calc.inputs.map(f => values[f.name]))
    return isNaN(res) ? res : res.toFixed(4)
  } catch {
    return null
  }
})
</script>
