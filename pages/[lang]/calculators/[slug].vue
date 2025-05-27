<template>
  <div>
    <div v-if="!loaded" class="text-center py-8 text-gray-500">
      {{ $t('loading') }}
    </div>

    <div v-else-if="!calculator" class="text-center py-8 text-red-600">
      {{ $t('calculatorNotFound') }}
    </div>

    <CalculatorLayout v-else :calculator="calculator" :tools="calculator.tools">

       <!-- Head SEO -->
      <Head>
        <title>{{ calculator.metatitle }}</title>
        <meta name="description" :content="calculator.metadescription" />
      </Head>

      <!-- Titolo -->
      <h1 class="text-2xl font-bold mb-2">{{ calculator.title }}</h1>

      <!-- Descrizione -->
      <p v-if="calculator.description" class="mb-4">{{ calculator.description }}</p>

       <!-- Intro markdown -->
      <div
        v-if="calculator.intro"
        class="prose mb-6"
        v-html="markdownToHtml(calculator.intro)"
      ></div>

     

<!-- Form con dropdown di unità -->
    <form v-if="calculator.inputs?.length" @submit.prevent class="space-y-4 mb-6">
      <div
        v-for="field in calculator.inputs"
        :key="field.name"
        class="flex items-center space-x-2"
      >
          <!-- Label e tooltip-->

          <label :for="field.name" class="flex items-center space-x-1 w-44">
          <span>{{ field.label }}</span>
          <Tooltip v-if="field.tooltip" :text="field.tooltip" />
          </label>
          <input
            :id="field.name"
            v-model.number="values[field.name]"
            :type="field.type"
            class="border rounded px-2 py-1 w-32"
          />
               <!-- Dropdown unità -->
        <select
          v-model="selectedUnits[field.name]"
          class="border rounded px-2 py-1"
        >
          <option
            v-for="u in field.unitOptions"
            :key="u"
            :value="u"
          >
            {{ u }}
          </option>
        </select>
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

       <!-- Markdown extra -->
      <div
        v-if="calculator.content"
        class="prose mb-6"
        v-html="markdownToHtml(calculator.content)"
      ></div>

      <!-- Outro markdown -->
      <div
        v-if="calculator.outro"
        class="prose mt-6"
        v-html="markdownToHtml(calculator.outro)"
      ></div>


        <!-- See Also -->
      <section v-if="calculator.seeAlso?.length" class="mt-8">
        <h2 class="font-semibold mb-2">{{ $t('seeAlso') }}</h2>
        <ul class="list-disc ml-5">
          <li v-for="s in calculator.seeAlso" :key="s">
            <NuxtLink
              :to="`/${lang}/calculators/${s}`"
              class="text-blue-600 hover:underline"
            >
              {{ getAlternateTitle(s) }}
            </NuxtLink>
          </li>
        </ul>
      </section>


    </CalculatorLayout>
  </div>
</template>

<script setup>
import Tooltip from '~/components/Tooltip.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import calcolo from '~/content/Calcolo.json'
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
const lang = route.params.lang || 'it'
const slug = route.params.slug

// Stato di caricamento
const loaded = ref(false)
const calculator = ref(null)

// Oggetti reattivi per valori mostrati e unità selezionate
const displayValues = reactive({})
const selectedUnits = reactive({})


// in script setup, prima di onMounted…
const unitFactors = {
  'Ω': 1,
  'kΩ': 1e3,
  'MΩ': 1e6,
  'V': 1,
  'mV': 1e-3,
  'kV': 1e3,
  'A': 1,
  'mA': 1e-3,
  // aggiungi altre unità necessarie…
}



// Carica i dati e trova il calcolatore
onMounted(() => {
  const all = [...calculators, ...rapidTools,...calcolo].filter(t => !t.draft)
  calculator.value = all.find(c => c.slug === slug) || null
  // Inizializza i valori degli input
  if (calculator.value?.inputs) {
    calculator.value.inputs.forEach(f => {
      // valore di default e unità iniziale
      displayValues[f.name] = f.default ?? 0
      selectedUnits[f.name] = f.unitOptions?.[0] || f.unit
    })
  }
  loaded.value = true
})


// Computed: valori normalizzati (in unità base) da passare alla formula
const normalized = computed(() => {
  const obj = {}
  if (!calculator.value?.inputs) return obj
  for (const f of calculator.value.inputs) {
    const disp = displayValues[f.name]
    const factor = unitFactors[selectedUnits[f.name]] || 1
    obj[f.name] = disp * factor
  }
  return obj
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
// valuta la formula: i nomi delle variabili in formula devono corrispondere alle chiavi
try {
    const fn = new Function(
      ...calc.inputs.map(f => f.name),
      `return ${calc.formula.replace(/^.*?=/,'')}`
    )
    const raw = fn(...calc.inputs.map(f => normalized.value[f.name]))
    if (isNaN(raw)) return raw

    // arrotondamento
    const prec = Number.isInteger(calc.precision) ? calc.precision : 4
    return raw.toFixed(prec)
  } catch {
    return null
  }
})

// Helper per alternativetitle
function getAlternateTitle(slug) {
  const all = [...calculators, ...rapidTools, ...calcolo]
  const item = all.find(c => c.slug === slug)
  return item
    ? item.alternativetitle || item.title
    : slug
}


</script>
