# Changelog

## Unreleased — Phase 1: Public Website Foundation

- Scaffolded the repository: `frontend/` (Next.js 14 + TypeScript + Tailwind
  v3), `assets/branding/` (placeholder logo SVGs), `content/`
  (SEO/CONTENT-MAP/KEYWORDS markdown), `docs/ARCHITECTURE.md`.
- Built the design token system (brand colors, Poppins/Inter type scale,
  animation tokens) centralised in `tailwind.config.ts` and `globals.css`.
- Built the SEO/GEO foundation: centralised metadata builder (`lib/seo.ts`),
  JSON-LD schema builders (`lib/schema.ts`), `sitemap.ts`, `robots.ts`,
  breadcrumbs with `BreadcrumbList` schema on every inner page.
- Built the full public sitemap (21 routes): home, about + 2 sub-pages,
  our-team, services index + 4 service detail pages, rehabilitation index +
  4 program detail pages, conditions, patient-resources, faqs, gallery,
  contact, book-appointment, and a branded 404.
- Built the reusable component library: Header (sticky, animated mobile
  menu), Footer, Hero variants, service/program cards, FAQ accordion,
  enquiry/appointment form (react-hook-form + zod, loading/success/error
  states), contact details block, testimonial section (inactive until real
  testimonials are supplied).
- Added a typed content data layer (`frontend/content/*.ts`) shaped to
  mirror future database columns, holding all services/programs/conditions/
  team/FAQ/NAP content — every value the clinic hasn't supplied yet is a
  clearly marked placeholder.
- Added Framer Motion animation throughout (hero entrance, scroll reveal,
  staggered cards, hover micro-interactions), gated behind
  `prefers-reduced-motion`.
- Verified: `npm run build` and `npm run lint` clean; all 21 routes return
  200; canonical/OG/JSON-LD verified via rendered HTML.
- Added a real placeholder hero photo and service-card photos (free-license
  stock via `frontend/content/media.ts`) in place of icon-only placeholders.
- Removed Acupuncture site-wide — not a current AXON service. Four services
  remain: Speech Therapy, Occupational Therapy, Physiotherapy, Special
  Education.

### Notes

- Backend API, MySQL database and admin CMS are intentionally not built in
  this phase — deferred until dynamic-module requirements are supplied (see
  `docs/ARCHITECTURE.md`).
- Stack pinned to Next.js 14 / React 18 / Tailwind v3 (mature, ~2 years of
  production usage) rather than the newer Next 16 / React 19 / Tailwind v4
  majors, per project direction.
