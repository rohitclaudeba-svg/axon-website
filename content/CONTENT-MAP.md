# Content Map

Every indexable public URL, its intent, primary topic, SEO title/description
source, H1 and structured data. Titles/descriptions are defined once in
`frontend/content/*.ts` or a page's `generateMetadata` — this table points to
the source of truth rather than duplicating the copy.

| URL | Intent | Primary Topic | Title/Description Source | H1 | Schema |
|---|---|---|---|---|---|
| `/` | Brand/home, orient new visitors | AXON multi-rehabilitation centre | `app/page.tsx` | Emotional tagline | MedicalBusiness, WebSite, WebPage |
| `/about` | Learn about AXON | About AXON | `app/about/page.tsx` | "Comprehensive rehabilitation, under one roof" | WebPage |
| `/about/approach` | Understand care model | AXON's approach | `app/about/approach/page.tsx` | "Personalised, multidisciplinary and progress-driven" | WebPage |
| `/about/why-choose-axon` | Compare/decide | Why choose AXON | `app/about/why-choose-axon/page.tsx` | "A coordinated care team, not a checklist of services" | WebPage |
| `/our-team` | Find a specialist, build trust | AXON team | `app/our-team/page.tsx` | "Experienced specialists, working as one team" | WebPage |
| `/services` | Browse services | Therapy services | `app/services/page.tsx` | "Therapy services designed around you" | WebPage |
| `/services/speech-therapy` | Service research | Speech therapy | `content/services.ts` | Service name | Service, BreadcrumbList |
| `/services/occupational-therapy` | Service research | Occupational therapy | `content/services.ts` | Service name | Service, BreadcrumbList |
| `/services/physiotherapy` | Service research | Physiotherapy | `content/services.ts` | Service name | Service, BreadcrumbList |
| `/services/special-education` | Service research | Special education | `content/services.ts` | Service name | Service, BreadcrumbList |
| `/rehabilitation` | Browse programs | Rehabilitation programs | `app/rehabilitation/page.tsx` | "Coordinated care for every stage of life" | WebPage |
| `/rehabilitation/pediatric` | Program research | Pediatric rehabilitation | `content/programs.ts` | Program name | Service, BreadcrumbList |
| `/rehabilitation/neurological` | Program research | Neurological rehabilitation | `content/programs.ts` | Program name | Service, BreadcrumbList |
| `/rehabilitation/orthopedic-musculoskeletal` | Program research | Orthopedic & musculoskeletal rehabilitation | `content/programs.ts` | Program name | Service, BreadcrumbList |
| `/rehabilitation/geriatric` | Program research | Geriatric rehabilitation | `content/programs.ts` | Program name | Service, BreadcrumbList |
| `/conditions` | "Do you treat X?" research | Conditions supported | `app/conditions/page.tsx` | "Care across every stage of life" | WebPage |
| `/patient-resources` | Preparation, orientation | Patient resources | `app/patient-resources/page.tsx` | "Helpful information for your care journey" | WebPage |
| `/faqs` | Direct-answer / voice search | Common questions | `app/faqs/page.tsx` | "Frequently asked questions" | FAQPage, WebPage |
| `/gallery` | Trust/visual proof | Clinic photos | `app/gallery/page.tsx` | "A look inside AXON" | WebPage |
| `/contact` | Local intent, conversion | Contact/location | `app/contact/page.tsx` | "We'd love to hear from you" | WebPage |
| `/book-appointment` | Conversion | Book appointment | `app/book-appointment/page.tsx` | "Let's build your personalised plan" | WebPage |

## Internal Linking Pattern

- Service detail pages cross-link to related services (`relatedServiceSlugs`)
  and related rehabilitation programs (`relatedProgramSlugs`).
- Rehabilitation program pages cross-link to related services
  (`relatedServiceSlugs`).
- Every detail page and most section pages end in a `CTASection` linking to
  `/book-appointment` and `/contact`.
- Homepage links out to every section (services, programs, conditions, team,
  gallery) as the primary internal-link hub.

## Not Yet Built

Location landing pages (`/locations/[location]`) and a blog/resources
article system are supported by the same routing pattern already in use but
are not built — spec §3 explicitly avoids mass-generating thin pages before
there is genuine content for them.
