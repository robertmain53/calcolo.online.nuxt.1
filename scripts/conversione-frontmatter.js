const fs = require('fs');
const path = require('path');

const inputDir = './json_calcolatori'; // cartella con i tuoi .json (uno per lingua)
const outputDir = './content/calculators';

function buildMarkdown(calcolatore) {
  let frontmatter =
    '---\n' +
    `slug: ${calcolatore.slug}\n` +
    `title: "${calcolatore.title || ''}"\n` +
    `category: "${calcolatore.category || ''}"\n` +
    `subcategory: "${calcolatore.subcategory || ''}"\n` +
    `description: "${calcolatore.description || ''}"\n` +
    '---\n\n';

  let content = '';
  if (calcolatore.sections) {
    if (calcolatore.sections.introduzione)
      content += `## Introduzione\n${calcolatore.sections.introduzione}\n\n`;
    if (calcolatore.sections.come_usare)
      content += `## Come Utilizzare il Calcolatore\n${calcolatore.sections.come_usare}\n\n`;
    if (calcolatore.sections.interpretazione)
      content += `## Interpretazione dei Risultati\n${calcolatore.sections.interpretazione}\n\n`;
    if (calcolatore.sections.approfondimenti)
      content += `## Approfondimenti Teorici e Pratici\n${calcolatore.sections.approfondimenti}\n\n`;
    if (calcolatore.sections.consigli)
      content += `## Consigli Utili / Cose da Sapere\n${calcolatore.sections.consigli}\n\n`;
    if (calcolatore.sections.faq)
      content += `## F.A.Q.\n${calcolatore.sections.faq}\n\n`;
    if (calcolatore.sections.correlati)
      content += `## Calcolatori Correlati / Risorse Aggiuntive\n${calcolatore.sections.correlati}\n\n`;
  }
  return frontmatter + content.trim();
}

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.json')) {
    // Esempio nome file: calcolatori.it.json
    const match = file.match(/\.([a-z]{2})\.json$/i);
    if (!match) {
      console.warn(`Nome file non riconosciuto (deve finire con .[lingua].json): ${file}`);
      return;
    }
    const lingua = match[1];
    const data = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));

    // Supporto array o oggetto (tipo: {slug1:{...},slug2:{...}})
    let calcolatori = [];
    if (Array.isArray(data)) {
      calcolatori = data;
    } else if (typeof data === 'object') {
      calcolatori = Object.values(data);
    }

    calcolatori.forEach(calcolatore => {
      if (!calcolatore.slug) {
        console.warn('Calcolatore senza slug, saltato:', calcolatore.title);
        return;
      }
      const dirPath = path.join(outputDir, lingua, calcolatore.slug);
      fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(
        path.join(dirPath, 'index.md'),
        buildMarkdown(calcolatore)
      );
      console.log(`Creato: ${lingua}/${calcolatore.slug}`);
    });
  }
});
