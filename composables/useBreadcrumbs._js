// composables/useBreadcrumbs.js
import { useRoute } from 'vue-router'
import calculators from '~/content/calculators.json'
import rapidTools from '~/content/rapidTablesCalculators.json'

export default function useBreadcrumbs() {
  const route = useRoute()
  const locale = route.params.lang || 'en'
  const { category, subcategory, slug } = route.params

  const crumbs = [
    { title: 'Home', to: `/${locale}` }
  ]

  // se siamo in una category page (es. /en/electrical)
  if (category && category !== 'calculators') {
    crumbs.push({
      title: capitalize(category),
      to: `/${locale}/${category}`
    })
  }

  // se siamo in una subcategory page (es. /en/electrical/voltage)
  if (subcategory) {
    crumbs.push({
      title: capitalize(subcategory),
      to: `/${locale}/${category}/${subcategory}`
    })
  }

  // se siamo nella pagina di un calculator (slug presente)
  if (slug) {
    // cerco il calcolatore nei due JSON
    const allTools = [...calculators, ...rapidTools]
    const calc = allTools.find(c => c.slug === slug)
    if (calc) {
      // aggiungo category/subcategory in base ai dati del calc
      if (calc.category && calc.category !== category) {
        crumbs.push({
          title: capitalize(calc.category),
          to: `/${locale}/${calc.category}`
        })
      }
      if (calc.subcategory && calc.subcategory !== subcategory) {
        crumbs.push({
          title: capitalize(calc.subcategory),
          to: `/${locale}/${calc.category}/${calc.subcategory}`
        })
      }
      // infine il titolo
      crumbs.push({ title: calc.title, to: '' })
    } else {
      // fallback generico
      crumbs.push({ title: slug, to: '' })
    }
  }

  return crumbs
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
