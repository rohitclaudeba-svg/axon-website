# AXON Multi-Rehabilitation Centre — Website

Public website for AXON Multi-Rehabilitation Centre, built to the
specification in `AXON_Claude_Code_Master_Development_Prompt_UPDATED.pdf`
(SEO/GEO-first, Next.js + Node.js + MySQL, dynamic architecture with a
separate admin CMS to follow).

**Current phase**: the public website only. Content is authored in a typed
data layer (`frontend/content/`) rather than a live database. The backend
API, admin CMS and MySQL database are a later phase — see
`docs/ARCHITECTURE.md` for what changes when that phase begins.

## Repository Structure

```
Axon-Website/
├── frontend/        # Next.js 14 (App Router) + TypeScript + Tailwind — the public website
├── assets/branding/  # source-of-truth logo files (placeholders until AXON supplies final assets)
├── content/           # SEO/content markdown specification (SEO.md, CONTENT-MAP.md, KEYWORDS.md)
├── docs/               # ARCHITECTURE.md
└── CHANGELOG.md
```

## Getting Started

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
npm run build     # production build
npm run lint       # ESLint
```

No environment variables or database are required to run the site — the
appointment/enquiry form posts to a local API route that validates and logs
submissions (see `frontend/app/api/enquiries/route.ts`) until a real backend
exists.

## Placeholder Content

The clinic has not yet supplied final branding assets, address/phone/hours,
team bios, testimonials or photography. Every such value is a clearly marked
placeholder in:

- `assets/branding/` — logo SVGs
- `frontend/content/nap.ts` — name/address/phone/hours
- `frontend/content/team.ts` — team roster
- `frontend/content/testimonials.ts` — empty until real testimonials are supplied

Replacing these files with real content requires no code changes elsewhere —
every page reads from them.

## Documentation

- `docs/ARCHITECTURE.md` — architecture and current-phase decisions
- `content/SEO.md` — SEO/GEO technical and content requirements
- `content/CONTENT-MAP.md` — public URL → intent/keyword/title/schema mapping
- `content/KEYWORDS.md` — approved search topics and intent clusters
- `CHANGELOG.md` — significant implementation changes
