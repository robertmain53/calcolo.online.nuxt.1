
<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Admin: All Calculators</h1>
    <table class="table-auto w-full text-sm border">
      <thead class="bg-gray-200">
        <tr>
          <th class="border px-2 py-1">Title</th>
          <th class="border px-2 py-1">Slug</th>
          <th class="border px-2 py-1">Category</th>
          <th class="border px-2 py-1">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="calc in calculators" :key="calc.slug" class="odd:bg-white even:bg-gray-50">
          <td class="border px-2 py-1">{{ calc.title }}</td>
          <td class="border px-2 py-1">{{ calc.slug }}</td>
          <td class="border px-2 py-1">{{ calc.category }}</td>
          <td class="border px-2 py-1">{{ calc.author }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import calculators from '~/content/calculators.json'
</script>
