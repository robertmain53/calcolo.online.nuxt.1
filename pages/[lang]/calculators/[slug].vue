<template>
  <div>
    
    <!-- Loading / Not found -->
    <div v-if="!loaded" class="text-center py-8 text-gray-500">
      {{ $t('loading') }}
    </div>
    <div v-else-if="!calculator" class="text-center py-8 text-red-600">
      {{ $t('calculatorNotFound') }}
    </div>

    <!-- Main calculator content -->
    <CalculatorLayout v-else :calculator="calculator" :tools="calculator.tools">
      <!-- SEO Head -->
      <Head>
        <title>{{ calculator.metatitle }}</title>
        <meta name="description" :content="calculator.metadescription" />
      </Head>

      <!-- Title & Description -->
      <h1 class="text-2xl font-bold mb-2">{{ calculator.title }}</h1>
      <p v-if="calculator.description" class="mb-4">{{ calculator.description }}</p>

      <!-- Intro markdown -->
       
  <!-- Se esiste il file .md -->
    <div v-if="hasMdIntro">
      <nuxt-content :document="introDoc" class="prose mb-6" />
    </div>

    <!-- Altrimenti, usa il campo JSON intro se non vuoto -->
    <div
      v-else-if="calculator.intro && calculator.intro.trim()"
      class="prose mb-6"
      v-html="markdownToHtml(calculator.intro)"
    ></div>
      

      <!-- Form + dropdown unità -->
      <form v-if="calculator.inputs?.length" @submit.prevent class="space-y-4 mb-6">
        <div
          v-for="field in calculator.inputs"
          :key="field.name"
          class="flex items-center space-x-2"
        >
          <label :for="field.name" class="flex items-center space-x-1 w-44">
            <span>{{ field.label }}</span>
            <Tooltip v-if="field.tooltip" :text="field.tooltip" />
          </label>

          <input
            :id="field.name"
            v-model.number="displayValues[field.name]"
            type="number"
            class="border rounded px-2 py-1 w-32"
          />

          <select
            v-model="selectedUnits[field.name]"
            class="border rounded px-2 py-1"
          >
            <option v-for="u in field.unitOptions" :key="u" :value="u">
              {{ u }}
            </option>
          </select>
        </div>
      </form>
      <p v-else class="text-gray-500">{{ $t('noInputsDefined') }}</p>

      <!-- Result -->
      <div v-if="calculator.formula" class="p-4 bg-gray-50 rounded">
        <h2 class="font-semibold mb-2">{{ $t('result') }}</h2>
        <p class="text-xl">
          {{ computedResult !== null ? computedResult : '–' }}
          <span v-if="calculator.resultUnit">{{ calculator.resultUnit }}</span>
        </p>
      </div>
      <p v-else class="text-gray-500">{{ $t('noFormulaDefined') }}</p>

      <!-- Outro markdown -->
      <div
        v-if="calculator.outro"
        class="prose mt-6"
        v-html="markdownToHtml(calculator.outro)"
      ></div>

      <!-- InfoSections accordion -->
      <section
        v-if="calculator.infoSections?.some(sec => sec.content?.trim())"
        class="mt-8"
      >
        <h2 class="text-xl font-bold mb-4">{{ $t('moreInfo') }}</h2>
        <Accordion :sections="calculator.infoSections" />
      </section>

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
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'
import customTools from '~/content/Calcolo.json'
import CalculatorLayout from '~/components/CalculatorLayout.vue'
import Tooltip from '~/components/Tooltip.vue'
import Accordion from '~/components/Accordion.vue'

// Simple markdown-to-HTML
function markdownToHtml(md = '') {
  return md
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}

// Route params
const route = useRoute()
const lang = route.params.lang || 'it'
const slug = route.params.slug

let introDoc = null
let hasMdIntro = false

try {
  const { data } = await useContent(`calculators/${slug}/info-intro.${lang}`).fetch()
  introDoc = data
  hasMdIntro = true
} catch {
  // file md non esiste → fallback al JSON
}


// Loading and data
const loaded = ref(false)
const calculator = ref(null)

// Reactive for input values and units
const displayValues = reactive({})
const selectedUnits = reactive({})

// Conversion factors
const unitFactors = {
  'Ω': 1, 'kΩ': 1e3, 'MΩ': 1e6,
  'V': 1, 'mV': 1e-3, 'kV': 1e3,
  'A': 1, 'mA': 1e-3
}

// Load calculator on mount
onMounted(() => {
  const all = [...calculators, ...rapidTools, ...customTools].filter(t => !t.draft)
  calculator.value = all.find(c => c.slug === slug) || null
  if (calculator.value?.inputs) {
    calculator.value.inputs.forEach(f => {
      displayValues[f.name] = f.default ?? 0
      selectedUnits[f.name] = f.unitOptions?.[0] || f.unit
    })
  }
  loaded.value = true
})

// Normalized values for formula
const normalized = computed(() => {
  const obj = {}
  if (!calculator.value?.inputs) return obj
  for (const f of calculator.value.inputs) {
    obj[f.name] = displayValues[f.name] * (unitFactors[selectedUnits[f.name]] || 1)
  }
  return obj
})

// Compute result
const computedResult = computed(() => {
  const calc = calculator.value
  if (!calc?.formula || !calc.inputs?.length) return null

  for (const f of calc.inputs) {
    if (isNaN(normalized.value[f.name])) return null
  }

  const expr = calc.formula.split('=').pop().trim().replace(/\^/g, '**')
  try {
    const fn = new Function(...calc.inputs.map(f => f.name), `return ${expr}`)
    const raw = fn(...calc.inputs.map(f => normalized.value[f.name]))
    const prec = Number.isInteger(calc.precision) ? calc.precision : 4
    return isNaN(raw) ? raw : raw.toFixed(prec)
  } catch {
    return null
  }
})

// Alternate title helper
function getAlternateTitle(s) {
  const all = [...calculators, ...rapidTools, ...customTools]
  const found = all.find(c => c.slug === s)
  return found ? (found.alternativetitle || found.title) : s
}
</script>
