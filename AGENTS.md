# Agent Guide

This repo contains a standalone classroom simulator and supporting materials for a Microeconomics I activity. Use this file as the first stop for orientation before editing.

## Project Purpose

The activity teaches firm theory in the chronological order used in class:

1. Unidad XI: tecnologia.
2. Unidad XII: maximizacion del beneficio.
3. Unidad XIII: minimizacion de costes.
4. Unidad XIII: precios relativos and conditional factor demands.
5. Unidad XIV: curvas de costes.
6. Reveal and final formalization.

Students work in teams representing Dominican company cases. They infer hidden Cobb-Douglas production functions from qualitative clues, choose labor `L` and capital `K`, and compare their decisions against the theoretical optimum.

Important caveat: the company cases and production functions are didactic simulations, not empirical estimates of the real companies.

## Repository Map

- `index.html`: primary simulator entrypoint. This is the file to open in a browser.
- `micro-firm-simulator.html`: same simulator kept under the original working filename.
- `docs/guion-operativo.md`: teaching script, round flow, debrief prompts, and pre-class checklist.
- `materials/`: source and reference teaching materials.
- `Orden de clases (2026).xlsx`: class schedule/order reference.
- `README.md`: short human-facing overview.

## Simulator Architecture

The simulator is intentionally a single static HTML file with inline CSS and JavaScript. There is no package manager, build system, framework, or backend.

Core data lives in the script section:

- `firms`: six Dominican company cases and hidden Cobb-Douglas parameters.
- `rounds`: round order, lecture unit, objective, debrief prompt, and scenario values.
- `market()`: reads scenario controls: wage `w`, capital rent `r`, target output `Q`, output price `p`, fixed/quasi-fixed cost `F`, and delivery penalty.
- `production(firm, L, K)`: Cobb-Douglas production.
- `optimalInputs(firm, mkt)`: theoretical cost-minimizing `L*`, `K*`, and `C*`.
- `evaluate(firm)`: team output, cost, average cost, profit, score, and gap from optimum.
- `render*()` functions: update the team table, ranking, admin reveal, diagnostics, and logs.

If you change `index.html`, mirror the same change in `micro-firm-simulator.html` unless the user explicitly wants only one copy. The two files are expected to stay equivalent.

## Current Round Design

The active classroom flow is:

1. `Mapa tecnologico de la empresa`: infer technology from the booklet.
2. `Beneficio: aceptar o rechazar la orden`: use `pi = pQ - C`.
3. `Isocuanta contra isocoste`: minimize cost for a target `Q`.
4. `Shock de precios relativos`: respond to higher `w` and lower `r`.
5. `Corto plazo, coste medio y escala`: use `F`, `CMe`, and cost curves.
6. `Reveal y formalizacion`: switch to Admin mode and reveal formulas.

Keep this order unless the user explicitly changes the class chronology.

## Editing Guidelines

- Prefer small, direct edits. This project is meant to be easy to open and project in class.
- Keep the simulator fully offline-capable. Do not add CDN dependencies or network calls unless the user asks.
- Preserve the Live/Test/Admin modes:
  - Live hides production functions.
  - Test runs diagnostics.
  - Admin reveals functions and optima.
- Keep all display text in Spanish unless the user asks otherwise.
- Use ASCII when adding or editing source text where practical. Existing filenames may contain accents; do not rename user-supplied materials without a reason.
- Do not treat the real companies as measured data. Keep the "didactic simulation" disclaimer.
- Avoid adding generated, cache, temporary, or Office lock files such as `~$*.docx`.

## Verification Checklist

For any simulator change:

1. Open `index.html` in a browser or serve the folder locally.
2. Confirm the app loads six firms and six team rows.
3. Confirm the first visible round is Ronda 1 with `Q=120`.
4. Advance rounds and confirm the sequence is XI -> XII -> XIII -> XIII -> XIV -> Reveal.
5. Confirm Ronda 6 switches to Admin mode and shows six admin rows.
6. In Test mode, run diagnostics and confirm all checks pass.
7. If `index.html` changed, confirm `micro-firm-simulator.html` was kept in sync.

Useful static check:

```powershell
@'
const fs = require('fs');
for (const file of ['index.html', 'micro-firm-simulator.html']) {
  const html = fs.readFileSync(file, 'utf8');
  const script = html.match(/<script>([\s\S]*)<\/script>/)?.[1];
  if (!script) throw new Error(`No script found in ${file}`);
  new Function(script);
  console.log(`${file}: ok`);
}
'@ | node -
```

## GitHub

Remote:

```text
https://github.com/gorkbravo/micro-firm-simulator.git
```

Default branch: `main`.

