<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Admin: Calculators</h2>
    <ul>
      <li v-for="(calc, i) in calculators" :key="i">
        <strong>{{ calc.title }}</strong> — {{ calc.category }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import calculators from '~/content/calculators.json'
</script>