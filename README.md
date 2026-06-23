# Micro Firm Simulator

Interactive teaching activity for Microeconomics I, built around Varian-style firm theory topics and Dominican company cases.

## Contents

- `micro-firm-simulator.html`: current working simulator for the classroom activity.
- `index.html`: same current simulator, kept in sync so GitHub Pages/root opening uses the right version.
- `docs/guion-operativo.md`: classroom flow, timing, round mechanics, scoring rules, debrief prompts, and pre-class checklist.
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

The simulator now reports two scores:

- `Score ronda`: the score for the active round. Its formula changes by round so it matches the learning objective of that round.
- `Overall`: the rolling mean of all competitive round scores up to the active round. The ranking is ordered by this overall score.

Coherence now affects scoring directly. The conceptual dropdown is no longer only feedback: if the qualitative decision is not coherent with the hidden optimum, the team loses the conceptual component of that round's score.

Round score logic:

1. Technology map: technology-profile coherence plus closeness of the chosen `K/L` to the hidden technology ratio.
2. Profit order: accept/reject coherence plus cost efficiency and profit quality.
3. Cost minimization: mostly cost efficiency, with a smaller conceptual component for choosing the right input-mix direction.
4. Relative-price shock: prediction coherence plus closeness of the chosen `K/L` to the new optimal ratio.
5. Scale and average cost: scale-decision coherence plus cost efficiency and profit quality.
6. Reveal: non-competitive; excluded from the rolling mean.

Live mode hides official production functions. Test mode runs diagnostics. Admin mode reveals functions, optima, and formalization data.

## Notes

The Dominican companies and production functions are didactic simulations, not empirical estimates of those firms.

Current Drive prototype:
https://drive.google.com/file/d/1asd3MWt_sJhaqCQudFPrXqP8O8xq1Ez6/view?usp=drivesdk
