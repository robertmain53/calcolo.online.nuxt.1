// composables/useCalculatorStore.js
import calculatorsRaw from '~/content/calculators.json'
import rapidToolsRaw from '~/content/rapidTablesCalculators.json'
import customToolsRaw from '~/content/Calcolo.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useCalculatorStore() {
  const route = useRoute()
  const locale = computed(() => route.params.lang)

  const allRaw = [...calculatorsRaw, ...rapidToolsRaw, ...customToolsRaw]

  const calculators = computed(() =>
    allRaw
      .filter(c => !c.draft?.[locale.value])
      .map(c => ({
        // estraggo ciascun campo multilanguage o fisso
        slug:          c.slug[locale.value] || c.slug.it,
        title:         c.title[locale.value] || c.title.it,
        alternativetitle: c.alternativetitle?.[locale.value] || c.alternativetitle?.it || '',
        description:   c.description[locale.value] || c.description.it,
        intro:         c.intro[locale.value] || c.intro.it || '',
        outro:         c.outro?.[locale.value] || c.outro?.it || '',
        infoSections:  c.infoSections.map(sec => ({
                         title:   sec.title[locale.value] || sec.title.it,
                         content: sec.content[locale.value] || sec.content.it || ''
                       })),
        metatitle:     c.metatitle[locale.value] || c.metatitle.it || '',
        metadescription: c.metadescription[locale.value] || c.metadescription.it || '',
        inputs:        c.inputs || [],
        formula:       c.formula || '',
        precision:     c.precision ?? 4,
        resultUnit:    typeof c.resultUnit === 'object'
                         ? (c.resultUnit[locale.value] || c.resultUnit.it)
                         : c.resultUnit || '',
        seeAlso:       c.seeAlso[locale.value] || c.seeAlso.it || [],
        tools:         c.tools[locale.value] || c.tools.it || []
      }))
  )

  function findBySlug(slug) {
    return calculators.value.find(c => c.slug === slug)
  }

  return { calculators, findBySlug, locale }
}
