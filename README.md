<div align="center">

<img src="app/icon.svg" alt="" width="76" height="76">

# NestFind

**A free, open-source real estate website template for Next.js 16 — built entirely with [VivekUI](https://ui.vivekkumarsingh.in).**

[![Live demo](https://img.shields.io/badge/demo-nestfind.vivekkumarsingh.in-1257c9)](https://nestfind.vivekkumarsingh.in)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![VivekUI](https://img.shields.io/npm/v/@the_viveksingh/vivek-ui?color=1257c9&label=VivekUI)](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
[![Runtime dependencies](https://img.shields.io/badge/UI%20runtime%20deps-0-1257c9)](#why-this-exists)
[![Licence: MIT](https://img.shields.io/badge/licence-MIT-1257c9)](LICENSE)

### [**View the live demo →**](https://nestfind.vivekkumarsingh.in)

[![NestFind — a free real estate website template for Next.js](https://nestfind.vivekkumarsingh.in/opengraph-image)](https://nestfind.vivekkumarsingh.in)

</div>

---

## Contents

[Why this exists](#why-this-exists) ·
[What you get](#what-you-get) ·
[Quick start](#quick-start) ·
[Deploy](#deploy) ·
[Make it yours](#make-it-yours) ·
[Project structure](#project-structure) ·
[SEO and AEO](#seo-and-aeo) ·
[Accessibility](#accessibility) ·
[Components used](#components-used) ·
[FAQ](#faq) ·
[Licence](#licence)

---

## Why this exists

Component libraries are usually demonstrated with a button page and a form page. That
proves nothing about whether you can finish a product with one.

NestFind is the counter-argument: a complete property marketplace — **18 fictional
Bengaluru listings**, locality price trends, a live EMI calculator, a side-by-side
comparison table, six agents — assembled from **one package with zero runtime
dependencies**.

No Tailwind. No shadcn. No MUI. No CSS-in-JS. No charting library. One `npm install`,
two CSS imports, and roughly 600 lines of custom CSS for the identity.

Everything on this site is invented. It is a template, so the data is there to be
replaced.

## What you get

| | |
|---|---|
| **Search that carries through** | Locality combobox, type select, Buy/Rent toggle and a budget slider on the homepage; the query string is read back by `/listings` |
| **A filter rail that means it** | Price range, locality, type, bedrooms, eight amenities, free keywords and a ready-to-move switch — every filter is cumulative |
| **Grid or Compare** | A tab flips results between cards and one sortable `DataTable` comparing area, ₹/sq ft, upkeep, possession and furnishing |
| **Locality price trends** | A `LineChart` on every listing page — ₹/sq ft across five years, with the change since 2021 written out in a sentence, not left as homework |
| **A live EMI calculator** | Three sliders → the standard reducing-balance instalment, counted up, with a `PieChart` splitting principal from interest |
| **Real SEO** | Metadata API per route, `sitemap.ts`, `robots.ts`, `manifest.ts`, canonicals, a generated OG image, and six kinds of JSON-LD |
| **AEO** | An FAQ answered honestly plus `public/llms.txt` for answer engines |
| **Accessible** | One `h1` per page, visible focus, reduced motion respected, 24px touch targets, zero axe violations in both themes |
| **Responsive** | Verified with no horizontal overflow from 320px to 1920px on every route |
| **Light and dark** | `ThemeProvider` with an anti-flash script inlined in `<head>` |

## Quick start

```bash
git clone https://github.com/intellectwithvivek/NestFind.git
cd NestFind
npm install
npm run dev
```

Open <http://localhost:3000>.

**Requires Node.js 20.9+** (22 LTS recommended) — Next.js 16 will not run on older.

| Script | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build — all 18 listing pages prerender |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fintellectwithvivek%2FNestFind&project-name=nestfind&repository-name=nestfind)

**Before you deploy, change one line.** `SITE_URL` in [`lib/site.ts`](lib/site.ts) is
what `metadataBase`, every canonical URL, the sitemap, the OG image URLs and every
JSON-LD `@id` are built from. Point it at your domain and the whole site follows.

```ts
// lib/site.ts
export const SITE_URL = 'https://your-domain.com'
```

No environment variables, no database, no API keys. The site is fully static apart
from `/listings`, which is server-rendered so it can read the search query.

## Make it yours

Everything you would normally have to hunt for lives in five files:

| File | What it holds |
|---|---|
| [`data/listings.ts`](data/listings.ts) | The 18 properties — price, specs, amenities, copy, photos |
| [`data/localities.ts`](data/localities.ts) | Twelve localities and the five-year ₹/sq ft series each chart plots |
| [`data/agents.ts`](data/agents.ts) | Six agents |
| [`data/faqs.ts`](data/faqs.ts) | FAQ copy, which is also the source for the `FAQPage` JSON-LD |
| [`lib/site.ts`](lib/site.ts) | Domain, name, description, repository links, UTM helper |

### Theming

The accent colour, the blueprint grid and the tabular-figure price styling are CSS
custom properties at the top of [`app/globals.css`](app/globals.css):

```css
:root {
  --vk-color-primary: #1257c9;           /* the accent, everywhere */
  --nf-grid-fine: rgb(18 87 201 / 0.07); /* the blueprint grid */
  --nf-grid-bold: rgb(18 87 201 / 0.13);
}
```

Change `--vk-color-primary` and the whole site follows. Every VivekUI selector is
wrapped in `:where()`, so a single flat class of yours wins with no `!important`
anywhere in this repository.

### The logo

One drawing on a 32-unit grid — a gable sheltering a cradle — used in five places:

| File | Where it shows up |
|---|---|
| [`components/logo.tsx`](components/logo.tsx) | Header and footer, inline SVG |
| [`app/icon.svg`](app/icon.svg) | Browser tab, `sizes="any"` |
| `app/favicon.ico` | 16 / 32 / 48 px, for Windows and older browsers |
| `app/apple-icon.png` | 180×180, opaque — iOS rounds it itself |
| [`app/opengraph-image.tsx`](app/opengraph-image.tsx) | Social card, inlined as a data URI |

The roof is a filled triangle rather than a stroked chevron on purpose: a stroked roof
and the cradle below it land less than a pixel apart at 16px, where anti-aliasing welds
them into a ring. `--nf-logo-tile` and `--nf-logo-ink` recolour the mark.

## Project structure

```
app/
  layout.tsx              root layout, theme script, site-wide metadata
  page.tsx                homepage
  listings/page.tsx       results — filters, grid/compare, pagination
  listings/[slug]/        one property — gallery, tabs, price chart, EMI
  agents/page.tsx         six agents
  built-with/page.tsx     every section mapped to its component
  opengraph-image.tsx     social card, generated at build time
  icon.svg · favicon.ico · apple-icon.png
  sitemap.ts · robots.ts · manifest.ts
  not-found.tsx
components/               cards, filter rail, charts, EMI calculator, logo, nav
data/                     listings, localities, agents, FAQs, component map
lib/                      formatting, the EMI formula, JSON-LD builders, site config
public/llms.txt           attribution and facts for answer engines
```

## SEO and AEO

Everything is generated from the data — nothing is hand-maintained, so nothing drifts.

**Per route:** a unique `<title>` and description via the Metadata API, a canonical
URL, Open Graph and Twitter cards, and exactly one `<h1>`.

**Site-wide:** [`app/sitemap.ts`](app/sitemap.ts) emits all 22 URLs (four static routes
plus every listing) at `/sitemap.xml`; [`app/robots.ts`](app/robots.ts) points at it;
[`app/manifest.ts`](app/manifest.ts) carries the icons and theme colour.

**Structured data** — six types, all built in [`lib/jsonld.ts`](lib/jsonld.ts):

| Schema | Where |
|---|---|
| `RealEstateListing` + `Residence`/`Place` + `Offer` | Each listing page |
| `ItemList` | `/listings` and `/agents` |
| `RealEstateAgent` | `/agents`, and as the seller on each listing |
| `SoftwareSourceCode` | `/built-with` |
| `FAQPage` | Homepage |
| `BreadcrumbList` + `WebSite` | Every page |

**AEO.** The FAQ answers are plain strings used for both the rendered page and the
`FAQPage` JSON-LD, so a crawler and a visitor can never be told different things.
[`public/llms.txt`](public/llms.txt) states plainly that the listings are fictional,
explains the EMI formula, and lists the structured data the site publishes.

## Accessibility

Verified, not asserted:

- **Zero axe violations** (WCAG 2.1 A and AA) across five pages in both themes
- One `h1` per page; headings keep a correct outline via `level` / `size` separation
- Every image has meaningful `alt` text derived from the frame and the property
- Touch targets meet the 24px minimum (WCAG 2.5.8), including the sliders
- Visible focus rings; `prefers-reduced-motion` respected throughout
- Charts publish a real `<table>` of their numbers for screen readers
- No horizontal scrolling at any width from 320px up

## Components used

**47 components and 2 charts**, all from `@the_viveksingh/vivek-ui`. The
[`/built-with`](https://nestfind.vivekkumarsingh.in/built-with) page maps every one of
them to the section it builds, each linked to its documentation.

```bash
npm i @the_viveksingh/vivek-ui
```

[Docs](https://ui.vivekkumarsingh.in/docs?utm_source=vivekui-template&utm_campaign=realestate&utm_medium=readme)
· [npm](https://www.npmjs.com/package/@the_viveksingh/vivek-ui)
· [GitHub](https://github.com/intellectwithvivek/vivek_UI)
· [Vivek Kumar Singh](https://vivekkumarsingh.in/?utm_source=vivekui-template&utm_campaign=realestate&utm_medium=readme)

## FAQ

**Are the listings real?**
No. Every property, price, agent, rating and review is invented. This is a template.

**Can I use this commercially?**
Yes. MIT licensed, free for any use. The footer credit is removable.

**Do I have to use VivekUI?**
To use this template as-is, yes — it is the whole point of the project. It is one
dependency with zero runtime dependencies of its own.

**Where do the images come from?**
Unsplash and i.pravatar.cc, referenced by URL and allow-listed in
[`next.config.ts`](next.config.ts). Swap the `remotePatterns` for your own CDN.

**Why is `/listings` server-rendered when everything else is static?**
It reads `searchParams` so the homepage search can hand it a locality and a budget.
Everything else, including all 18 listing pages, is prerendered at build time.

## Contributing

Issues and pull requests are welcome — bug reports especially. If you build something
with this, a link back is appreciated but not required.

## Licence

[MIT](LICENSE) © 2026 Vivek Kumar Singh. Free forever, for any use, commercial
included.

A ⭐ on [VivekUI](https://github.com/intellectwithvivek/vivek_UI) is appreciated if the
component library saved you time.

---

<div align="center">

**[Live demo](https://nestfind.vivekkumarsingh.in)** ·
**[Clone this template](https://github.com/intellectwithvivek/NestFind)** ·
**[Built with VivekUI](https://nestfind.vivekkumarsingh.in/built-with)**

*Every property, price, agent and review on this site is fictional.*

</div>
