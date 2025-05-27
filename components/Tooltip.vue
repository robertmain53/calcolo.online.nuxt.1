<template>
  <div class="relative inline-block">
    <span
      class="cursor-pointer text-gray-400 hover:text-gray-600"
      @mouseenter="visible = true"
      @mouseleave="visible = false"
      @focus="visible = true"
      @blur="visible = false"
      tabindex="0"
      aria-describedby="tooltip"
    >
      ❔
    </span>
    <div
      v-if="visible"
      class="absolute z-10 w-48 bg-gray-700 text-white text-xs rounded-md p-2 mt-1"
      role="tooltip"
    >
      {{ text }}
      <div class="absolute text-gray-700 text-lg leading-none w-full top-0 left-0 transform -translate-y-full flex justify-center">
      <!--  <span class="bg-gray-700 rotate-45 h-4 w-4"></span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  text: { type: String, required: true }
})
const visible = ref(false)
</script>

<style scoped>
/* la piccola freccia rossa è fatta con un div ruotato di 45° */
</style>
