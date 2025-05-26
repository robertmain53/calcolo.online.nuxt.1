// scripts/fetchRapidTools.js
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { load } from 'cheerio'

const tools = JSON.parse(fs.readFileSync('data/rapidtablesTools.json','utf-8'))

async function scrapeTool(url) {
  const res = await fetch(url)
  const html = await res.text()
  const $ = load(html)

  const title = $('h1').first().text().trim()
  const description = $('h1').first().next('p').text().trim()

  // Estrai inputs
  const inputs = []
  $('form input').each((_,el) => {
    const name = $(el).attr('name') || ''
    const labelEl = $(`label[for="${$(el).attr('id')}"]`)
    const label = labelEl.text().trim() || $(el).attr('placeholder') || name
    const step = $(el).attr('step') || 'any'
    inputs.push({ name, label, step })
  })

  // Estrai formula: prova a cercare nello script inline
  let formula = null
  $('script').each((_,s) => {
    const code = $(s).html() || ''
    const m = code.match(/return\\s+([^;]+);/)
    if (m) formula = m[1].trim()
  })

  // Deriva slug da URL
  const slug = path.basename(url, '.html')

  return { slug, title, description, inputs, formula }
}

async function main() {
  const out = []
  for (const url of tools) {
    console.log(`Scraping ${url}…`)
    try {
      const data = await scrapeTool(url)
      out.push(data)
    } catch (e) {
      console.warn(`❌ Errore su ${url}:`, e.message)
    }
  }
  fs.writeFileSync('content/rapidTablesCalculators.json',
    JSON.stringify(out, null, 2), 'utf-8')
  console.log(`✅ Salvati ${out.length} tool in content/rapidTablesCalculators.json`)
}

main()
