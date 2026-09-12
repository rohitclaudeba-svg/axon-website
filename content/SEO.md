# SEO & GEO Specification

Master SEO/GEO reference for the AXON website, implementing spec §1.

## Technical SEO

| Requirement | Implementation |
|---|---|
| Semantic HTML5, one H1 per page | Every page has exactly one `<h1>` (in `PageHero` or `HomeHero`) |
| Clean, stable URLs | Kebab-case slugs, no query-string routing (`content/*.ts` `slug` fields) |
| XML sitemap | `frontend/app/sitemap.ts` — generated from the same route list the app serves |
| robots.txt | `frontend/app/robots.ts` — disallows `/api/` only |
| Canonical URLs | `lib/seo.ts` `buildMetadata()` sets `alternates.canonical` on every page |
| Open Graph / social metadata | `buildMetadata()` sets `openGraph` + `twitter` on every page |
| Alt text | Enforced via component props (e.g. `Icon`, `Image` usages) — real photography will need alt text supplied per asset when added |
| Breadcrumbs + BreadcrumbList JSON-LD | `components/ui/Breadcrumbs.tsx`, used on every inner page |
| No thin/duplicate content, no indexing of private pages | No admin/auth routes exist yet; `/api/*` is disallowed in robots.ts |
| Branded 404 | `frontend/app/not-found.tsx` |
| Core Web Vitals | Static generation (`generateStaticParams`) for all content pages, `next/font` for zero layout-shift fonts, `next/image` for the logo |

## Structured Data

Centralised in `frontend/lib/schema.ts` — no component hand-rolls JSON-LD:

- `medicalBusinessSchema()` — rendered once, site-wide, in `app/layout.tsx`
- `websiteSchema()` — rendered once, site-wide
- `webPageSchema()` — per-page, describes that page
- `serviceSchema()` — service and rehabilitation-program detail pages
- `breadcrumbSchema()` — rendered by `<Breadcrumbs>`
- `faqPageSchema()` — `/faqs`, built from the real visible FAQ list in `content/faqs.ts`

All schema values read from `content/nap.ts` (business facts) or the
relevant content file — nothing is duplicated inline in a component.

## GEO / Local SEO

- NAP (Name/Address/Phone) lives in one file (`content/nap.ts`) and is
  reused in the footer, contact page and JSON-LD. Address/map details are
  real (supplied by the clinic); phone, email and hours are still
  placeholder, clearly marked, pending approval.
- `/contact` and the homepage both surface address, phone, hours and an
  embedded Google Map with a directions CTA.
- Future `/locations/[location]` pages are supported by the same
  slug-driven routing pattern already used for services/programs, without
  requiring new architecture — not built yet since only one location exists.
- FAQ content (`content/faqs.ts`) answers real local-intent questions
  (services offered, how appointments work, where the centre is) without
  keyword stuffing.
- No awards, rankings, outcomes, reviews or statistics are claimed anywhere
  in the content layer.

## Content Governance

- `content/CONTENT-MAP.md` — every public URL mapped to intent/keyword/title/description/H1/schema
- `content/KEYWORDS.md` — approved topic clusters content should stay within
- Placeholder values use clearly marked bracket notation (e.g.
  `[Hours — Placeholder]`) everywhere except URL-bound fields (phone/email),
  which use a bracket-free placeholder format since literal `[` `]`
  characters break Next.js `<Link>` dynamic-route parsing.
