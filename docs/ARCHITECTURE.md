# Architecture

## Current Phase: Public Website Only

This build covers the public AXON website end to end — every page in the
sitemap, the SEO/GEO foundation, the design system and animation, and full
responsiveness. The admin CMS, MySQL database and backend API are **explicitly
deferred** — they will be scoped and built once the clinic/user supplies
dynamic-module requirements and connects them.

## Why a Typed Content Layer Instead of a Database

`frontend/content/*.ts` holds typed data (services, rehabilitation programs,
condition groups, team, FAQs, testimonials, NAP/business details) that every
page reads from. Each shape mirrors what its eventual MySQL table will look
like (`slug`, `name`, `seo: { title, description }`, etc. — see
`frontend/content/types.ts`), so migrating a content type to a real,
admin-editable database table later is a data-migration exercise, not a
rewrite of the pages or components that consume it.

## Frontend Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript** — chosen over
  newer majors (Next 16 / React 19 / Tailwind v4) specifically for maturity:
  two years of production usage, stable docs and tooling, and no need to
  track fast-moving breaking changes on a client project.
- **Tailwind CSS v3** with brand tokens centralised in `tailwind.config.ts`
  (colors, fonts, keyframes) — no ad-hoc colors in components.
- **Framer Motion** for scroll-reveal, stagger and micro-interactions, gated
  behind `prefers-reduced-motion` via `useReducedMotion()`.
- **react-hook-form + zod** for the appointment/contact forms, validated
  identically on submit.

## SEO/GEO Infrastructure

- `lib/seo.ts` — `buildMetadata()` is the single place every page's
  `generateMetadata` calls for title/description/canonical/OG/robots tags.
- `lib/schema.ts` — JSON-LD builders (MedicalBusiness, Service,
  BreadcrumbList, FAQPage, WebSite/WebPage), rendered via
  `components/seo/JsonLd.tsx`, fed from `content/nap.ts` so business facts
  stay consistent site-wide.
- `app/sitemap.ts` / `app/robots.ts` — generated from the same route list
  the app actually serves, so they can't drift from real pages.

## Reusable Templates

- `components/sections/DetailTemplate.tsx` renders both service pages
  (`/services/[slug]`) and rehabilitation program pages
  (`/rehabilitation/[slug]`) from one component, driven by
  `content/services.ts` / `content/programs.ts`. Adding a 6th service or 5th
  program is a content-file change, not a new page template.

## What Changes When the Backend/CMS Phase Begins

1. A `backend/` service is added (Node.js + TypeScript, REST API,
   controllers/services/repositories layering) with a real MySQL connection.
2. `database/migrations/` gets tables shaped like `content/types.ts`.
3. Pages currently importing from `frontend/content/*.ts` switch to fetching
   from the API instead — the component tree underneath does not need to
   change, since it was always driven by the same shapes.
4. `frontend/app/api/enquiries/route.ts` (currently validates + logs) starts
   forwarding to the real backend instead.
5. An admin UI is added as a separate, protected app area.

Nothing in the current build should need architectural rework to support
this — see spec §9, §19.
