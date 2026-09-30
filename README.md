# upperlayerstudio

Marketing site for **Upper Layer Studio** — an independent AI studio building
automation, agents and AI products.

Live: [upperlayerstudio.com](https://upperlayerstudio.com)

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4 — design tokens live in `src/app/globals.css` under `@theme`
- [motion](https://motion.dev) for scroll reveals

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project layout

```
src/
  app/           routes, layout, global styles + design tokens
  components/
    ui/          shared primitives — Button, Card, Accordion, Section, …
    sections/    homepage sections composed from the primitives
    layout/      navbar and footer
  lib/
    site.ts      every string on the site
```

## Editing content

All copy lives in `src/lib/site.ts`. Change text there rather than in
components.

Two conventions that file documents and the site depends on:

- **Voice is first person singular.** This is a solo studio.
- **No figure claims a past result.** Every number on the site is a commitment
  that can be kept from day one. Swap them for real outcome metrics once there
  is delivered work to point at.

## Design system

New sections should be built from the primitives in `src/components/ui/` rather
than styled ad hoc, so spacing, radii and type stay consistent. The tokens —
colour, radius, shadow, easing — are defined once in `src/app/globals.css`.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npx eslint .` | Lint |
