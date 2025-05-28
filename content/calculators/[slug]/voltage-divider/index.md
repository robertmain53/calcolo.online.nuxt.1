---
title: "Calcolatore Divisore di Tensione"
description: "Calcola la tensione in uscita di un divisore di tensione."
intro:
  - "Il Calcolatore Divisore di Tensione ti aiuta a determinare..."
  - "Strumento utile per ingegneri, studenti e hobbisti."
fields:
  - key: vin
    label: "Tensione di ingresso (V)"
  - key: r1
    label: "Resistenza R₁ (Ω)"
  - key: r2
    label: "Resistenza R₂ (Ω)"
results:
  key: vout
  label: "Tensione di uscita (V)"
formula: "vout = vin * R₂ / (R₁ + R₂)"
steps:
  - "Inserisci la tensione di ingresso nel campo 'Tensione di ingresso'."
  - "Inserisci i valori delle resistenze R₁ e R₂."
  - "Clicca sul pulsante 'Calcola' per ottenere il risultato."
interpretation:
  - "Un valore di vout compreso tra X e Y indica..."
theory:
  title: "Approfondimenti"
  content: |
    Il divisore di tensione è una rete passiva costituita da due resistenze in serie...
examples:
  - inputs: { vin: 12, r1: 1000, r2: 2000 }
    output: 8
faqs:
  - question: "Come si sceglie il valore di R₂ per un output specifico?"
    answer: "Puoi ricalcolare la formula: R₂ = (vout / (vin - vout)) * R₁."
related:
  - slug: watt-lumen
  - slug: ohms-law
cta:
  - text: "Leggi l'articolo sul divisore di tensione"
    link: "/blog/divisore-tensione"
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Introduzione

{{ $frontmatter.intro.join('\n\n') }}

<!-- …segue il resto del template… -->
