# Mock-exam scoring methodology (RBT)

The full mock exam is **not** scored as a raw percentage. It is scored the way
the BACB scores the real exam, **in approximation**:

1. **Scored items only.** The mock builds 85 items: 75 scored + 10 unscored
   "pilot/field-test" fillers. Pilots are tagged `scored: false` at build time
   and are ignored entirely — they never touch the raw score or the denominator.
2. **Criterion-referenced.** Pass/fail is a fixed competence cut, not a curve.
3. **Raw → scaled.** The raw score (correct of 75) is converted to a scaled score
   on a **0–500** scale by a monotonic, piecewise-linear transform anchored so
   the form's raw cut always maps to the scaled **pass mark of 400** (the equating
   step in approximation).
4. **Pass = scaled ≥ 400.** Percent correct is shown only as a secondary
   diagnostic and never drives pass/fail.

**Per-form config** (in `src/App.jsx`, `RBT_FORM`; engine in `src/scoring.js`):

| field | value | meaning |
|---|---|---|
| `rawCut` | 60 | summed modified-Angoff cut (≈ 0.80 × 75); **tunable per form** |
| `scoredCount` | 75 | scored items |
| `scaleMin`–`scaleMax` | 0–500 | reported scale |
| `scaleCut` | 400 | scaled pass mark |

> **Honesty note — RBT scale is internal.** Unlike the BCBA exam, the BACB
> publishes **no** scaled-score scale or cut score for the RBT exam at all. The
> 0–500 / cut-400 scale here is an **internal approximation**, chosen for
> consistency with the BCBA app. It *approximates* BACB methodology (Angoff cut →
> raw→scaled → equating) but is a practice estimate, **not a prediction** of real
> exam outcomes.

The scoring engine `src/scoring.js` is generated — it is copied verbatim from
`cst-rebuild/scoring.js` by `cst-rebuild/port-scoring.cjs`. Edit the canonical
file, then re-run the port; do not edit the copy.
