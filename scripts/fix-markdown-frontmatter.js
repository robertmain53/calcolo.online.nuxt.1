const fs = require('fs');
const path = require('path');

const calculatorsDir = './content/calculators';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, callback);
    } else if (file === 'index.md') {
      callback(filepath);
    }
  });
}

function fixYamlFrontmatter(content) {
  // Estrae frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return content; // nessun frontmatter, ritorna tutto

  let yaml = match[1];
  let fixedYaml = '';
  let inMultiline = false;
  let multilineKey = '';
  let multilineValue = '';

  yaml.split('\n').forEach(line => {
    // Se la riga inizia una nuova chiave YAML
    const keyMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(["']?)(.*)/);
    if (!inMultiline && keyMatch) {
      const key = keyMatch[1];
      let val = keyMatch[3];
      const quote = keyMatch[2];
      if (val && !val.endsWith('"') && quote === '"') {
        // Multilinea malformata: inizia con ", non chiude
        inMultiline = true;
        multilineKey = key;
        multilineValue = val;
      } else {
        fixedYaml += line + '\n';
      }
    } else if (inMultiline) {
      // Stiamo processando una stringa multilinea malformata
      multilineValue += ' ' + line.trim();
      if (line.trim().endsWith('"')) {
        // Finisce la stringa multilinea
        // Ricostruisci la chiave con valore su una riga
        fixedYaml += `${multilineKey}: "${multilineValue.replace(/"/g, '').trim()}"\n`;
        inMultiline = false;
        multilineKey = '';
        multilineValue = '';
      }
    } else {
      // Riga normale
      fixedYaml += line + '\n';
    }
  });

  // Se c'è una multilinea non chiusa, chiudi forzatamente
  if (inMultiline) {
    fixedYaml += `${multilineKey}: "${multilineValue.replace(/"/g, '').trim()}"\n`;
  }

  // Sostituisci il frontmatter nel contenuto originale
  const newContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${fixedYaml}---`);
  return newContent;
}

let fixedCount = 0;
walkDir(calculatorsDir, (filepath) => {
  let content = fs.readFileSync(filepath, 'utf-8');
  const fixed = fixYamlFrontmatter(content);

  if (fixed !== content) {
    fs.copyFileSync(filepath, filepath + '.bak');
    fs.writeFileSync(filepath, fixed, 'utf-8');
    fixedCount++;
    console.log('Corretto:', filepath);
  }
});

console.log(`Fatto. File corretti: ${fixedCount}`);
