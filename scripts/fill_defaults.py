# scripts/fill_defaults.py

import json
from pathlib import Path

# I nomi dei file da processare
base_files = ['calculators.json', 'Calcolo.json', 'rapidTablesCalculators.json']

output_dir = Path('content/i18n_content')   # ← cambia questo con il tuo path


# Modello con tutti i campi
default_fields = {
    "slug": {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "title": {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "alternativetitle":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "metatitle":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "metadescription":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "intro":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "description":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "category":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "subcategory":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "inputs":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "formula":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "precision":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "resultUnit":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "author":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "created":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "outro":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "seealso":  {
         "it": [],
         "en": [],
         "es": [],
         "fr": []
        },
    "tools":  {
         "it": [],
         "en": [],
         "es": [],
         "fr": []
        },
    "modified":  {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "draft":  {
         "it": FALSE,
         "en": FALSE,
         "es": FALSE,
         "fr": FALSE
        },
    "featured":  {
         "it": FALSE,
         "en": FALSE,
         "es": FALSE,
         "fr": FALSE
        },
    "content": {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "feedback": {
         "it": "",
         "en": "",
         "es": "",
         "fr": ""
        },
    "infoSections": [
        {"title": "Introduzione al Calcolatore", "content": ""},
        {"title": "Come Utilizzare il Calcolatore", "content": ""},
        {"title": "Interpretazione dei Risultati", "content": ""},
        {"title": "Approfondimenti Teorici e Pratici", "content": ""},
        {"title": "Consigli Utili / Cose da Sapere", "content": ""},
        {"title": "Domande Frequenti (FAQ)", "content": ""},
        {"title": "Fonti / Risorse Aggiuntive", "content": ""},
        {"title": "Note interne", "content": ""}
    ]
}

for fname in base_files:
    path = Path(f'content/{fname}')
    if not path.exists():
        print(f"⚠️ File non trovato: {path}")
        continue
    arr = json.loads(path.read_text())
    new_arr = []
    for item in arr:
        # Inizializzo con default, poi sovrascrivo coi campi esistenti
        merged = default_fields.copy()
        merged.update(item)
        # Assicuro draft = false
        merged['draft'] = False
        new_arr.append(merged)
    # Scrivo il file aggiornato
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"✅ Processato e riscritto: {path}")
