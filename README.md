# Budget Alpha

Static [Astro](https://astro.build) + TypeScript directory of investing **newsletters** and **research tools** whose reviewed retail plan is **≤ $50/month** or **≤ about $500/year**.

This repository is set up for **Netlify continuous deploys** from `main` (`npm run build` → `dist`).

## Rules

- Intro discounts do not qualify a product unless the **renewal** rate also clears the cap.
- Listings call out trial conversion, grandfathering, and first-year promos.
- No invented performance claims (no fake backtests or “paid for itself” copy).
- Affiliate URLs are placeholders: `https://example.com/go/{slug}`.

Brand copy lives in `src/data/site.ts`. Listings live in `src/content/listings/*.md`.

## Local

```bash
npm install
npm run dev
npm run build
```

## Netlify

`netlify.toml` sets:

- Build command: `npm run build`
- Publish directory: `dist`
- Node 22

## Pages

- `/` — All / Newsletters / Tools filters and search
- `/listings/{slug}/` — listing detail
- `/about/` — methodology and disclosure
