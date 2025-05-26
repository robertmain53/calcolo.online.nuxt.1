import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { load } from 'cheerio';

// Carica JSON iniziali
const records = JSON.parse(fs.readFileSync('content/Calcolo.json', 'utf-8'));
const urls    = JSON.parse(fs.readFileSync('data/Calcololist.json', 'utf-8'));

// Helper per derivare slug dall'URL
function slugFromUrl(url) {
  const parts = new URL(url).pathname.split('/');
  return parts[parts.length - 1];
}

// Scraping di un singolo tool live
async function scrapeTool(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = load(html);

  // Estrai campi form
  const inputs = [];
  $('form').find('input, select, textarea').each((_, el) => {
    const $el  = $(el);
    const tag  = el.tagName.toLowerCase();
    const id   = $el.attr('id') || '';
    const name = $el.attr('name') || '';
    let label = '';
    if (id) label = $(`label[for="${id}"]`).text().trim();
    if (!label) label = $el.attr('placeholder') || '';
    inputs.push({ tag, name, label: label.trim() });
  });

  // Estrai formula dal JS inline
  let formula = null;
  $('script').each((_, s) => {
    const code = $(s).html() || '';
    // match return or arrow
    const m = code.match(/return\s+([^;]+);/) || code.match(/=>\s*([^;]+);/);
    if (m) formula = m[1].trim();
  });

  return { inputs, formula };
}

(async () => {
  const report = [];

  for (const url of urls) {
    const slug = slugFromUrl(url);
    const record = records.find(r => r.slug === slug);
    if (!record) {
      report.push({ slug, url, error: 'Record non trovato' });
      continue;
    }

    try {
      console.log(`Validating ${slug}...`);
      const live = await scrapeTool(url);

      // Confronto inputs
      const mismatchedInputs = [];
      const maxLen = Math.max(record.inputs.length, live.inputs.length);
      for (let i = 0; i < maxLen; i++) {
        const rec = record.inputs[i] || {};
        const liv = live.inputs[i]   || {};
        if (rec.tag !== liv.tag || rec.name !== liv.name || rec.label !== liv.label) {
          mismatchedInputs.push({ index: i, expected: rec, actual: liv });
        }
      }

      // Confronto formula
      const formulaMismatch = record.formula !== live.formula;

      report.push({
        slug,
        url,
        inputDifferences: mismatchedInputs,
        formulaDifference: formulaMismatch
          ? { expected: record.formula, actual: live.formula }
          : null
      });
    } catch (e) {
      report.push({ slug, url, error: e.message });
    }
  }

  // Salva report
  const outPath = path.resolve('report', 'validationReport.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`Report salvato in ${outPath}`);
})();
