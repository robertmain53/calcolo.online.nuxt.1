// npm install node-fetch fast-xml-parser
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const ROOT_SITEMAP = 'https://calcolo.online/sitemap.xml';
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

// Scarica e restituisce il testo XML
async function fetchXml(url) {
  console.log(`Scarico: ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} per ${url}`);
  return res.text();
}

// Analizza un XML e ritorna:
// - se è <sitemapindex>: array di URL di altre sitemap
// - se è <urlset>: array di URL di pagine
function parseSitemap(xmlText) {
  const json = parser.parse(xmlText);

  if (json.sitemapindex && json.sitemapindex.sitemap) {
    // sitemapindex.sitemap può essere oggetto o array
    const items = Array.isArray(json.sitemapindex.sitemap)
      ? json.sitemapindex.sitemap
      : [json.sitemapindex.sitemap];
    return items.map(s => s.loc);
  }

  if (json.urlset && json.urlset.url) {
    const items = Array.isArray(json.urlset.url)
      ? json.urlset.url
      : [json.urlset.url];
    return items.map(u => u.loc);
  }

  throw new Error('XML non riconosciuto come sitemapindex o urlset');
}

async function main() {
  try {
    // 1) scarica sitemap index
    const textIndex = await fetchXml(ROOT_SITEMAP);
    const sitemapUrls = parseSitemap(textIndex);

    // 2) per ciascuna sitemap, raccogli tutte le URL di pagine
    let allPageUrls = [];
    for (const smUrl of sitemapUrls) {
      const xml = await fetchXml(smUrl);
      const urls = parseSitemap(xml);
      allPageUrls = allPageUrls.concat(urls);
    }

    // 3) (opzionale) filtra su prefissi specifici, es. solo strumenti
    // allPageUrls = allPageUrls.filter(u => u.includes('/calcolatore/'));

    console.log(`Totale URL raccolte: ${allPageUrls.length}`);

    // 4) salva JSON di base
    const outDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const outPath = path.join(outDir, 'Calcololist.json');
    fs.writeFileSync(outPath, JSON.stringify(allPageUrls, null, 2), 'utf-8');
    console.log(`Elenco salvato in ${outPath}`);

  } catch (err) {
    console.error('Errore:', err);
    process.exit(1);
  }
}

main();
