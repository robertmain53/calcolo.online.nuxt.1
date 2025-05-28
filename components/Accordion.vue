<template>
  <div class="divide-y border rounded overflow-hidden">
    <div v-for="(sec, i) in sections" :key="i" class="group">
      <button
        @click="toggle(i)"
        class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
      >
        <span>{{ sec.title }}</span>
        <span :class="opened[i] ? 'rotate-180' : ''" class="transform transition-transform">▾</span>
      </button>
      <div v-show="opened[i]" class="px-4 py-2">
        <div v-if="sec.content.trim()">
          <div v-html="markdownToHtml(sec.content)"></div>
        </div>
        <p v-else class="text-gray-500 italic">{{ $t('comingSoon') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({ sections: Array })
const opened = reactive(props.sections.map(() => false))
function toggle(i) { opened[i] = !opened[i] }
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
</script>
