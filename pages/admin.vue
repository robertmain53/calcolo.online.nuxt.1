
<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
    <table class="w-full border-collapse border text-sm">
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="border p-2">#</th>
          <th class="border p-2">Title</th>
          <th class="border p-2">Slug</th>
          <th class="border p-2">Category</th>
          <th class="border p-2">Inputs</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(calc, i) in calculators" :key="calc.slug" class="odd:bg-white even:bg-gray-50">
          <td class="border p-2">{{ i + 1 }}</td>
          <td class="border p-2">{{ calc.title }}</td>
          <td class="border p-2">{{ calc.slug }}</td>
          <td class="border p-2">{{ calc.category }}</td>
          <td class="border p-2">{{ calc.inputs.map(i => i.name).join(', ') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import calculators from '~/content/calculators.json'
</script>
