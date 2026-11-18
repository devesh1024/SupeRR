# SupeRR Selector: RR IPL 2027 final 20-player shortlist

React + Vite static site.

## Run

    npm install
    npm run dev       # local development
    npm run build     # production build to dist/
    npm run preview   # serve dist/ locally

Use a static server (for example `npm run preview`). Opening `dist/index.html` directly from disk can be blocked by browsers for module scripts.

## Data

- `src/data/players.json`: the final 20 shortlist (10 batters, 10 bowlers) in team order, built from `final20_evidence_check_1.csv`. Rationale and caveats come from the PRD, section 4.3.
- `public/data/final20_evidence_check.csv`: the download offered on the Evidence page.

## Notes

- Model 1 (SupeRR v3) and Model 2 (learned leverage) ranks are shown side by side and never combined.
- Three players have no model rating; their pages say so.
- No auction price, purse or valuation is estimated.
