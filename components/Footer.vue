
<template>
  <footer class="bg-gray-100 text-center text-sm py-6 border-t mt-6">
    <p class="mb-2">&copy; 2025 RapidTables Clone. All rights reserved.</p>
    <div class="flex flex-wrap justify-center gap-4 text-blue-600">
      <NuxtLink v-for="cat in categories" :key="cat" :to="`/en/${cat.toLowerCase()}`">{{ cat }}</NuxtLink>
    </div>
  </footer>
</template>

<script setup>
const categories = [
  "Electrical", "Math", "Lighting", "Physics", "Finance",
  "Time", "Health", "Grade", "Wire", "Online Tools", "Computer"
]
</script>
