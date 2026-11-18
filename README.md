# SupeRR Selector: RR IPL 2027 shortlist site

React + Vite static site. No backend.

## Run

    npm install
    npm run dev          # local development
    npm run build        # production build to dist/
    npm run preview      # serve dist/ locally

Open the built site through a static server (for example `npm run preview`). Opening `dist/index.html` directly from disk can be blocked by browsers for module scripts.

## Deploy

Works on GitHub Pages or any static host. Routing uses hash URLs (`#/shortlist`), so no server rewrite rules are needed. `vite.config.js` sets `base: './'`.

## Data

- `src/data/players.json`: 50 batters and 50 bowlers, built from the approach B shortlists joined to SupeRR v3 rankings by `player_id`. Also contains `meta` (match counts, definitions, model agreement).
- `public/data/`: the CSV files offered for download.

To refresh the data, regenerate `players.json` from the same source files and keep the field names unchanged.

## Notes

- Model 2 (approach B) sets the primary rank. SupeRR v3 scores appear only as a cross-check and are never combined with it.
- Origin comes from the T20I team in the data. Players with IPL-only records are labelled "Unknown".
- No auction price, purse or valuation is estimated.
