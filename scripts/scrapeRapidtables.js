// Script per scaricare e parsificare le pagine di indice di RapidTables
// Estrae tutti gli URL di singoli calcolatori (/calc/*.html) e convertitori (/convert/*.html)

import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { load } from 'cheerio'

const BASE_URL = 'https://www.rapidtables.com'
const INDEX_PAGES = ['/calc/index.html', '/convert/index.html']

// Recupera HTML della pagina e ritorna html + URL base per la risoluzione dei link
async function fetchPage(relativePath) {
  const pageUrl = `${BASE_URL}${relativePath}`
  console.log(`Scarico ${pageUrl}...`)
  const res = await fetch(pageUrl)
  if (!res.ok) throw new Error(`Errore nel fetch ${pageUrl}: ${res.status}`)
  const html = await res.text()
  return { html, pageUrl }
}

// Estrae tutti i link risolti e unici presenti nella pagina
function extractLinks(html, baseUrl) {
  const $ = load(html)
  const urls = new Set()
  $('a').each((_, el) => {
    const href = $(el).attr('href')
    if (!href) return
    try {
      const absolute = new URL(href, baseUrl).href
      urls.add(absolute)
    } catch (e) {
      // href non valido, skip
    }
  })
  return Array.from(urls)
}

// Main: cicla le pagine indice, estrae e filtra
async function main() {
  const allUrls = new Set()
  for (const page of INDEX_PAGES) {
    const { html, pageUrl } = await fetchPage(page)
    const links = extractLinks(html, pageUrl)
    for (const url of links) {
      // Considera solo tool (/calc/*.html o /convert/*.html), escludi index.html
      if ((url.startsWith(`${BASE_URL}/calc/`) || url.startsWith(`${BASE_URL}/convert/`))
          && !url.endsWith('/index.html')) {
        allUrls.add(url)
      }
    }
  }

  const toolUrls = Array.from(allUrls)
  console.log(`Trovati ${toolUrls.length} tool (calcolatori e convertitori).`)

  // Salva in JSON
  const outDir = path.resolve(process.cwd(), 'data')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)
  const outPath = path.join(outDir, 'rapidtablesTools.json')
  fs.writeFileSync(outPath, JSON.stringify(toolUrls, null, 2), 'utf-8')
  console.log(`Elenco salvato in ${outPath}`)
}

main().catch(err => {
  console.error('Errore nello script:', err)
  process.exit(1)
})
