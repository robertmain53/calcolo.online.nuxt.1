<template>
  <div class="max-w-5xl mx-auto px-2 py-8">
    <h1 class="text-2xl font-bold mb-2">
      {{ subcategoryTitle }}
    </h1>
    <p v-if="subcategoryIntro" class="mb-6 text-gray-600" v-html="subcategoryIntro"></p>

    <!-- Calcolatori della sottocategoria -->
    <div v-if="calculators?.length" class="mb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="tool in calculators"
          :key="tool._path"
          class="rounded-xl border p-4 hover:shadow transition bg-white"
        >
          <NuxtLink
            :to="`/${lang}/${calcsPath}/${tool.slug}`"
            class="block font-semibold mb-1 hover:underline"
          >
            {{ tool.title }}
          </NuxtLink>
          <p class="text-sm text-gray-500">
            {{ tool.description }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-10">
      Nessun calcolatore in questa sottocategoria.
    </div>

    <div v-if="subcategoryOutro" class="prose mt-8 mx-auto" v-html="subcategoryOutro"></div>
  </div>
</template>

<script setup>



const route = useRoute()
const { lang, category, subcategory } = route.params

const folder =
  lang === 'it' ? 'calcolatori'
  : lang === 'en' ? 'calculators'
  : lang === 'fr' ? 'calculatrices'
  : lang === 'es' ? 'calculadoras'
  : 'calcolatori'

console.log('DEBUG:', { folder, category, subcategory })

const { data: calculators } = await useAsyncData('calculators', () =>
  queryContent(folder)
    .where({ category, subcategory })
    .find()
)

watchEffect(() => {
  console.log('Fetched calculators:', calculators.value)
})



</script>
