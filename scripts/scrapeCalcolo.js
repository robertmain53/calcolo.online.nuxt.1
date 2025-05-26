// npm install node-fetch fast-xml-parser
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';

const SITEMAP_URL = 'https://calcolo.online/post-sitemap.xml';

async function fetchSitemap(url) {
  console.log(`Scarico sitemap da ${url}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} per ${url}`);
  return res.text();
}

function parseLocs(xmlText) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const json = parser.parse(xmlText);
  // Se la sitemap fosse un <sitemapindex> useresti json.sitemapindex.sitemap,
  // ma qui è un <urlset>:
  const urls = json.urlset.url.map(entry => entry.loc);
  return urls;
}

async function main() {
  try {
    const xml = await fetchSitemap(SITEMAP_URL);
    const allUrls = parseLocs(xml);

  // Prendi tutte le URL
const toolUrls = allUrls;

    console.log(`Trovati ${toolUrls.length} tool.`);

    // Salva in JSON
    const outDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const outPath = path.join(outDir, 'Calcololist.json');
    fs.writeFileSync(outPath, JSON.stringify(toolUrls, null, 2), 'utf-8');
    console.log(`Elenco salvato in ${outPath}`);
  } catch (err) {
    console.error('Errore nello script:', err);
    process.exit(1);
  }
}

main();
