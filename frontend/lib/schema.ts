import { nap } from "@/content/nap";
import type { FaqEntry } from "@/content/types";
import type { SiteSettingsData } from "./siteSettings";

/**
 * Reusable JSON-LD builders (spec §1.2). Rendered through <JsonLd> so schema
 * markup stays centralised and data-driven from the NAP/content layer instead
 * of being duplicated across components.
 */

export function medicalBusinessSchema(settings: SiteSettingsData) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: nap.brandName,
    description:
      "Multi-specialty rehabilitation and therapy centre offering speech therapy, occupational therapy, physiotherapy and special education.",
    url: nap.siteUrl,
    telephone: settings.phones[0]?.text ?? "",
    email: settings.emails[0]?.text ?? "",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.addressLocality,
      addressRegion: settings.addressRegion,
      postalCode: settings.postalCode,
      addressCountry: settings.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.latitude,
      longitude: settings.longitude,
    },
    hasMap: nap.mapDirectionsUrl,
    openingHoursSpecification: settings.hours
      .filter((h) => !h.closed && h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: h.opens,
        closes: h.closes,
      })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: nap.brandName,
    url: nap.siteUrl,
  };
}

export function webPageSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: new URL(input.path, nap.siteUrl).toString(),
  };
}

export function serviceSchema(entry: { name: string; heroSummary: string }, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: entry.name,
    description: entry.heroSummary,
    url: new URL(path, nap.siteUrl).toString(),
    provider: {
      "@type": "MedicalBusiness",
      name: nap.brandName,
      url: nap.siteUrl,
    },
    areaServed: nap.addressLocality,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, nap.siteUrl).toString(),
    })),
  };
}

export function faqPageSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
