<template>
  <div>
    <h1>{{ $t('siteTitle') }}</h1>
    <ul>
      <li v-for="calc in calculators" :key="calc.slug">{{ calc.title }}</li>
    </ul>
  </div>
</template>


<script setup>
import calculators from '~/content/calculators.json'
</script>