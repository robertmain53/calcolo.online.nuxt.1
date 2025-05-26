// scripts/runCalcTests.js
// Script Node.js per eseguire test di calcolo sui tuoi tool

import fs from 'fs';
import path from 'path';
import vm from 'vm';

// Carica dati
const records    = JSON.parse(fs.readFileSync('content/Calcolo.json', 'utf-8'));
const urls       = JSON.parse(fs.readFileSync('data/Calcololist.json', 'utf-8'));
const testCases  = JSON.parse(fs.readFileSync('data/testCases.json', 'utf-8'));

// Helper per slug
function slugFromUrl(url) {
  const parts = new URL(url).pathname.split('/');
  return parts[parts.length - 1];
}

// Crea funzione di calcolo da formula JS
function makeCalculator(formulaBody, paramNames) {
  // formulaBody es: "(numero * percentuale) / 100"
  const fnCode = `(function(${paramNames.join(',')}) { return ${formulaBody}; })`;
  return vm.runInThisContext(fnCode);
}

(async () => {
  const results = [];

  for (const url of urls) {
    const slug = slugFromUrl(url);
    const record = records.find(r => r.slug === slug);
    if (!record) {
      results.push({ slug, error: 'record non trovato' });
      continue;
    }

    const cases = testCases[slug];
    if (!cases) {
      results.push({ slug, message: 'nessun test definito' });
      continue;
    }

    // Deduce parametri dall'ordine degli inputs (esclude i campi 's' e 'post_type')
    const params = record.inputs
      .filter(i => i.name && i.name !== 's' && i.name !== 'post_type')
      .map(i => i.name);

    let calcFn;
    try {
      calcFn = makeCalculator(record.formula, params);
    } catch (e) {
      results.push({ slug, error: 'errore creazione funzione: ' + e.message });
      continue;
    }

    for (const tc of cases) {
      const args = params.map(p => tc.inputs[p]);
      let actual;
      try {
        actual = calcFn(...args);
      } catch (e) {
        results.push({ slug, case: tc, error: 'errore esecuzione: ' + e.message });
        continue;
      }
      const pass = Object.is(actual, tc.expected);
      results.push({ slug, case: tc, actual, expected: tc.expected, pass });
    }
  }

  // Salva report
  const outPath = path.resolve('report', 'calcoloonlineTestReport.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Report salvato in ${outPath}`);
})();
