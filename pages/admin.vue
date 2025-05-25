
<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Admin: Manage Calculators</h1>

    <div class="mb-6 flex gap-4">
      <select v-model="selectedSlug" class="border px-2 py-1">
        <option disabled value="">Select a calculator</option>
        <option v-for="calc in calculators" :key="calc.slug" :value="calc.slug">{{ calc.title }}</option>
      </select>
      <button @click="newCalc" class="bg-green-600 text-white px-3 py-1 rounded">+ New</button>
      <button @click="saveAll" class="bg-blue-600 text-white px-3 py-1 rounded">💾 Save</button>
      <button @click="downloadJson" class="bg-gray-700 text-white px-3 py-1 rounded">⬇ Export</button>
    </div>

    <div v-if="current" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="font-semibold mb-2">Calculator Settings</h2>
        <label class="block text-sm">Title <input v-model="current.title" class="border p-1 w-full" /></label>
        <label class="block text-sm">Slug <input v-model="current.slug" class="border p-1 w-full" /></label>
        <label class="block text-sm">Category <input v-model="current.category" class="border p-1 w-full" /></label>
        <label class="block text-sm">Description <textarea v-model="current.description" class="border p-1 w-full"></textarea></label>
        <label class="block text-sm">Formula <input v-model="current.formula" class="border p-1 w-full" /></label>
        <label class="block text-sm">Author <input v-model="current.author" class="border p-1 w-full" /></label>
        <label class="block text-sm">Content <textarea v-model="current.content" class="border p-1 w-full" rows="3"></textarea></label>
        <label class="block text-sm">Feedback <input v-model="current.feedback" class="border p-1 w-full" /></label>

        <div class="mt-3">
          <h3 class="font-semibold mb-1">Inputs</h3>
          <div v-for="(input, idx) in current.inputs" :key="idx" class="flex gap-2 items-center mb-1">
            <input v-model="input.label" placeholder="Label" class="border px-2 py-1 w-1/2" />
            <input v-model="input.name" placeholder="Name" class="border px-2 py-1 w-1/2" />
            <button @click="current.inputs.splice(idx, 1)" class="text-red-600">✖</button>
          </div>
          <button @click="addInput" class="text-blue-600 mt-1">+ Add Input</button>
        </div>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Live Preview</h2>
        <div class="border rounded p-4 bg-white">
          <form @submit.prevent>
            <div v-for="input in current.inputs" :key="input.name" class="mb-2">
              <label>{{ input.label }}</label>
              <input v-model.number="form[input.name]" type="number" class="border ml-2 px-2 py-1" />
            </div>
          </form>
          <div class="mt-4 font-semibold">
            Result: <span>{{ liveResult }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import calculators from '~/content/calculators.json'
import { fallbackFormulas } from '~/content/fallbackFormulas'

const all = ref(JSON.parse(localStorage.getItem('calc-admin') || 'null') || calculators)
const selectedSlug = ref('')
const current = ref(null)
const form = ref({})

watch(selectedSlug, () => {
  current.value = JSON.parse(JSON.stringify(all.value.find(c => c.slug === selectedSlug.value)))
  if (current.value?.inputs) {
    current.value.inputs.forEach(i => form.value[i.name] = 0)
  }
})

function newCalc() {
  const slug = `calc-${Math.floor(Math.random() * 10000)}`
  const template = {
    slug,
    title: 'New Calculator',
    category: '',
    description: '',
    author: 'Admin',
    formula: '',
    created: new Date().toISOString().split('T')[0],
    modified: new Date().toISOString().split('T')[0],
    inputs: [{ label: 'A', name: 'a' }, { label: 'B', name: 'b' }],
    content: '',
    feedback: '',
    seeAlso: []
  }
  all.value.push(template)
  selectedSlug.value = slug
}

function saveAll() {
  if (current.value) {
    const i = all.value.findIndex(c => c.slug === current.value.slug)
    if (i !== -1) all.value[i] = current.value
    localStorage.setItem('calc-admin', JSON.stringify(all.value))
    alert('Saved to localStorage')
  }
}

function addInput() {
  current.value.inputs.push({ label: '', name: '' })
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(all.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'calculators-export.json'
  link.click()
}

const liveResult = computed(() => {
  try {
    const args = current.value.inputs.map(i => i.name)
    const values = args.map(n => Number(form.value[n]) || 0)
    const formula = current.value.formula || fallbackFormulas[current.value.slug]
    const fn = new Function(...args, `return ${formula}`)
    return fn(...values)
  } catch {
    return 'Invalid'
  }
})

</script>
