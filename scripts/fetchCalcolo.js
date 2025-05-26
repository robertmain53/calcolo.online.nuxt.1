// npm install node-fetch cheerio p-map
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { load } from 'cheerio';
import pMap from 'p-map';

const tools = JSON.parse(fs.readFileSync('data/Calcolo.json', 'utf-8'));

async function scrapeTool(url) {
  try {
    console.log(`Scraping ${url}…`);
    const res  = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; scraper/1.0)' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $    = load(html);

    // Titolo e descrizione
    const title       = $('h1').first().text().trim();
    const description = $('h1').first().next('p').text().trim();

    // Campi del form
    const inputs = [];
    $('form').find('input, select, textarea').each((_, el) => {
      const $el   = $(el);
      const tag   = el.tagName.toLowerCase();
      const name  = $el.attr('name') || '';
      const id    = $el.attr('id');
      const label = id
        ? $(`label[for="${id}"]`).text().trim() || name
        : $el.attr('placeholder')   || name;
      const step = tag === 'input' ? $el.attr('step') || 'any' : undefined;
      inputs.push({ tag, name, label, ...(step ? { step } : {}) });
    });

    // Estrai formula
    let formula = null;
    $('script').each((_, s) => {
      const code = $(s).html() || '';
      const m = code.match(/return\s+([^;]+);/) || code.match(/=>\s*([^;]+);/);
      if (m) formula = m[1].trim();
    });

    const slug = path.basename(url, '.html');
    return { slug, title, description, inputs, formula };
  } catch (e) {
    console.warn(`❌ Errore su ${url}: ${e.message}`);
    return null;
  }
}

async function main() {
  const out = await pMap(tools, scrapeTool, { concurrency: 5 });
  const filtered = out.filter(r => r !== null);

  const outPath = path.resolve('content', 'Calcolo.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(filtered, null, 2), 'utf-8');
  console.log(`✅ Salvati ${filtered.length} tool in ${outPath}`);
}

main();
