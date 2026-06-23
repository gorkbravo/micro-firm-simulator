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

Students work in teams representing Dominican company cases. They infer hidden Cobb-Douglas production functions from qualitative clues, choose labor `L` and capital `K` when the round requires it, and compare their decisions against the theoretical optimum.

Important caveat: the company cases and production functions are didactic simulations, not empirical estimates of the real companies.

## Repository Map

- `index.html`: primary simulator entrypoint. This is the file to open in a browser.
- `micro-firm-simulator.html`: same simulator kept under the original working filename.
- `docs/guion-operativo.md`: teaching script, timer instructions, round flow, debrief prompts, and pre-class checklist.
- `materials/`: source and reference teaching materials.
- `Orden de clases (2026).xlsx`: class schedule/order reference.
- `README.md`: short human-facing overview.

## Simulator Architecture

The simulator is intentionally a single static HTML file with inline CSS and JavaScript. There is no package manager, build system, framework, backend, CDN dependency, or network call.

Core data lives in the script section:

- `firms`: six Dominican company cases and hidden Cobb-Douglas parameters.
- `rounds`: round order, lecture unit, objective, debrief prompt, scenario values, and round-specific decision mechanics.
- `ROUND_SECONDS`: fixed 4-minute round duration.
- `market()`: reads scenario controls: wage `w`, capital rent `r`, target output `Q`, output price `p`, fixed/quasi-fixed cost `F`, and delivery penalty.
- `production(firm, L, K)`: Cobb-Douglas production.
- `optimalInputs(firm, mkt)`: theoretical cost-minimizing `L*`, `K*`, and `C*`.
- `evaluate(firm)`: team output, cost, average cost, profit, score, and gap from optimum.
- `expectedDecision()` and `decisionFeedback()`: round-specific qualitative feedback for technology, accept/reject, cost mix, price shock, and scale decisions.
- timer functions: `startTimer()`, `stopTimer()`, `resetTimer()`, and `updateTimerDisplay()`.
- `render*()` functions: update the team table, ranking, admin reveal, diagnostics, cards, timer, and logs.

If you change `index.html`, mirror the same change in `micro-firm-simulator.html` unless the user explicitly wants only one copy. The two files are expected to stay equivalent.

## Current Round Design

The active classroom flow is six timed rounds. Each competitive round is a 4-minute sprint with a visible timer and a distinct decision type:

1. `Mapa tecnologico de la empresa`: infer whether the firm is labor intensive, capital intensive, or balanced; choose a first `L`/`K` mix for `Q=120`.
2. `Beneficio: aceptar o rechazar la orden`: make a binary accept/reject decision using `pi = pQ - C`.
3. `Isocuanta contra isocoste`: choose whether the cost-minimizing mix should move toward more `L`, more `K`, or a balanced mix; then choose `L`/`K`.
4. `Shock de precios relativos`: predict whether `K/L` rises, falls, or stays similar when labor becomes expensive and capital becomes cheaper.
5. `Corto plazo, coste medio y escala`: accept or reject a large order by comparing `CMe` and `p` under high `F`.
6. `Reveal y formalizacion`: switch to Admin mode and reveal formulas, optima, and links to the formal theory.

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
4. Confirm the timer starts at `04:00`, can start/pause/reset, and resets when changing rounds.
5. Confirm each round shows the correct decision control: technology, accept/reject, cost mix, price-shock prediction, scale decision, and reveal.
6. Advance rounds and confirm the sequence is XI -> XII -> XIII -> XIII -> XIV -> Reveal.
7. Confirm Ronda 6 switches to Admin mode and shows six admin rows.
8. In Test mode, run diagnostics and confirm all checks pass.
9. If `index.html` changed, confirm `micro-firm-simulator.html` was kept in sync.

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
