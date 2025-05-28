// scripts/generate-calculators.js
import fs from 'fs/promises';
import path from 'path';

const calculators = [
  { slug: 'voltage-divider', title: 'Calcolatore Divisore di Tensione' },
  { slug: 'bmi',             title: 'Calcolatore BMI (Indice di Massa Corporea)' },
  // … altri slug …
];

const locales = [
  { code: 'it', filename: 'index.md' },
  { code: 'en', filename: 'en.md' },
  { code: 'es', filename: 'es.md' },
  { code: 'fr', filename: 'fr.md' },
];

async function scaffold() {
  const base = path.resolve(process.cwd(), 'content', 'calculators');
  await fs.mkdir(base, { recursive: true });

  for (const { slug, title } of calculators) {
    const dir = path.join(base, slug);
    await fs.mkdir(dir, { recursive: true });

    for (const { code, filename } of locales) {
      const filePath = path.join(dir, filename);
      try {
        await fs.access(filePath);
        console.log(`❗ Saltato (esiste già): ${filePath}`);
        continue;
      } catch {}

      const fm = [
        '---',
        `title: "${ title }"`,
        `description: "${ code === 'it' ? 'Descrizione in italiano…' : 'Description in ' + code + '…'}"`,
        'intro:',
        '  - "◻ Punto 1"',
        '  - "◻ Punto 2"',
        'fields:',
        '  - key: foo',
        '    label: "Campo Foo"',
        'results:',
        '  key: bar',
        '  label: "Risultato Bar"',
        'formula: "bar = foo * 2"',
        'steps:',
        '  - "◻ Step 1"',
        '  - "◻ Step 2"',
        'interpretation:',
        '  - "◻ Cosa significa il risultato"',
        'theory:',
        '  title: "Approfondimenti"',
        '  conte
