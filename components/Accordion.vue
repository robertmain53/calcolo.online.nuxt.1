<template>
  <div class="divide-y border rounded overflow-hidden">
    <div
      v-for="(sec, i) in filtered"
      :key="i"
      class="group"
    >
      <!-- Heading del pannello -->
      <button
        @click="toggle(i)"
        class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center focus:outline-none"
      >
        <span>{{ sec.title }}</span>
        <span
          class="transform transition-transform"
          :class="opened[i] ? 'rotate-180' : ''"
        >▾</span>
      </button>

      <!-- Contenuto solo se opened e content non vuoto -->
      <div
        v-show="opened[i]"
        class="px-4 py-2 prose"
        v-html="markdownToHtml(sec.content)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

// Filtra solo le sezioni con content non vuoto o non solo spazi
const filtered = computed(() =>
  props.sections.filter(
    sec => typeof sec.content === 'string' && sec.content.trim().length > 0
  )
)

// Stato di apertura per ciascuna sezione filtrata
const opened = reactive(filtered.value.map(() => false))

// Riinizializza opened se cambia il numero di sezioni
watch(filtered, (newArr) => {
  opened.splice(0, opened.length, ...newArr.map(() => false))
})

// Toggle apertura
function toggle(idx) {
  opened[idx] = !opened[idx]
}

// Semplice parser markdown→HTML
function markdownToHtml(md = '') {
  return md
    .replace(/### (.+)/g, '<h3>$1</h3>')
    .replace(/## (.+)/g, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}
</script>
