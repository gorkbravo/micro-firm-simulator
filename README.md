# Micro Firm Simulator

Interactive teaching activity for Microeconomics I, built around Varian-style firm theory topics and Dominican company cases.

## Contents

- `index.html`: primary standalone simulator. Open it in a browser to run the classroom activity.
- `micro-firm-simulator.html`: same simulator with the original working filename.
- `docs/guion-operativo.md`: classroom flow, timing, round mechanics, debrief prompts, and pre-class checklist.
- `materials/`: source lecture presentations used to align the rounds.
- `AGENTS.md`: orientation and editing guide for future coding agents.

## Classroom Flow

The simulator rounds follow the chronological order of the course. Each round is designed as a 4-minute team decision sprint with a visible countdown timer. Moving to another round resets the timer to `04:00`; the instructor starts it manually.

1. Unidad XI: tecnologia. Teams infer the production profile and choose an initial `L`/`K` mix.
2. Unidad XII: maximizacion del beneficio. Teams make a binary accept/reject decision for an order.
3. Unidad XIII: minimizacion de costes. Teams choose the cost-minimizing direction of the input mix and then pick `L`/`K`.
4. Unidad XIII: precios relativos and conditional factor demands. Teams predict the direction of `K/L` after a wage/rent shock.
5. Unidad XIV: curvas de costes. Teams decide whether a large order is viable given `F`, `CMe`, and `p`.
6. Reveal/final formalization. Admin mode reveals production functions and theoretical optima.

## Simulator Mechanics

The main score still measures performance against the theoretical minimum cost:

`Score = 100 x C* / coste equivalente del equipo`

The simulator also shows a round-specific decision control and a feedback chip. The feedback does not replace the cost score; it tells students whether their qualitative decision is coherent with the model in that round.

Live mode hides official production functions. Test mode runs diagnostics. Admin mode reveals functions, optima, and formalization data.

## Notes

The Dominican companies and production functions are didactic simulations, not empirical estimates of those firms.

Current Drive prototype:
https://drive.google.com/file/d/1asd3MWt_sJhaqCQudFPrXqP8O8xq1Ez6/view?usp=drivesdk
