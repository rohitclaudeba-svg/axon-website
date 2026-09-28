/**
 * One-off content fill: populates every subcategory page's sections with the
 * real content that already exists in frontend/content/services.ts and
 * programs.ts (plus their real photos from frontend/content/media.ts), so the
 * admin Edit screen isn't empty for the 12 subcategories seeded before this
 * module existed. Mirrors the exact section layout of
 * frontend/components/sections/DetailTemplate.tsx so the data matches what's
 * already live. Safe to re-run — always overwrites with the same source data.
 */
import "dotenv/config";
import crypto from "node:crypto";
import { pool } from "../src/config/db";
import { findCategoryBySlug } from "../src/repositories/categories.repository";
import { findPageByCategoryId, updatePageFull } from "../src/repositories/subcategoryPages.repository";
import { services } from "../../frontend/content/services";
import { programs } from "../../frontend/content/programs";
import { media } from "../../frontend/content/media";
import type { ServiceEntry, ProgramEntry, SupportArea } from "../../frontend/content/types";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function listHtml(areas: SupportArea[]): string {
  return `<ul>${areas
    .map((a) => `<li><strong>${escapeHtml(a.title)}</strong>${a.description ? ` — ${escapeHtml(a.description)}` : ""}</li>`)
    .join("")}</ul>`;
}

const WHY_CHOOSE_POINTS = ["Experienced therapists", "Individualized treatment plans", "Family involvement", "Evidence-based approach"];

async function buildSectionsFor(entry: ServiceEntry | ProgramEntry, kind: "service" | "program") {
  const name = entry.name;
  const slug = entry.slug;

  const heroImg = kind === "service" ? (media.serviceShowcaseImages as any)[slug] : (media.programImages as any)[slug];
  const contentImg = kind === "service" ? (media.serviceImages as any)[slug] : (media.programContentImages as any)[slug];
  const benefitImg =
    kind === "service" ? (media.serviceWhoBenefitImages as any)[slug] : (media.programWhoBenefitImages as any)[slug];

  const approachSections = "approachSections" in entry ? entry.approachSections : undefined;
  const [primaryAreas, restAreas] =
    approachSections && approachSections.length > 0
      ? [entry.supportAreas, [] as SupportArea[]]
      : [entry.supportAreas.slice(0, 5), entry.supportAreas.slice(5)];

  const howItHelpsContent =
    `<p>Individuals we support may face:</p>${listHtml(primaryAreas)}` +
    `<p>Our ${name.toLowerCase()} at AXON Multi-Rehabilitation Centre supports individuals in working through these challenges, building confidence and everyday skills.</p>`;

  let approachContent = "";
  if (approachSections && approachSections.length > 0) {
    approachContent = approachSections
      .map((s) => `<h2>${escapeHtml(s.title)}</h2><p>${escapeHtml(s.intro)}</p>${listHtml(s.items)}`)
      .join("");
  } else if (restAreas.length > 0) {
    approachContent = listHtml(restAreas);
  }

  const whyChooseContent =
    `<p>Our therapists coordinate ${name.toLowerCase()} alongside AXON Multi-Rehabilitation Centre's wider team where needed, so your plan stays consistent, personalised and focused on measurable progress — not delivered in isolation.</p>` +
    `<p>If you're looking for ${name.toLowerCase()} to help build confidence and everyday independence, get in touch with AXON Multi-Rehabilitation Centre today to take the first step.</p>`;

  return [
    {
      type: "hero" as const,
      enabled: true,
      position: 0,
      data: {
        heading: name,
        subtitle: entry.heroSummary,
        imageUrl: heroImg?.src ?? null,
        buttonText: "Book an Appointment",
        buttonUrl: "/book-appointment",
      },
    },
    {
      type: "about" as const,
      enabled: true,
      position: 1,
      data: {
        heading: `What is ${name}?`,
        content: `<p>${escapeHtml(entry.whatItIs)}</p>`,
        imageUrl: null,
        imagePosition: "right" as const,
      },
    },
    {
      type: "how_it_helps" as const,
      enabled: true,
      position: 2,
      data: {
        heading: `How ${name} Helps`,
        content: howItHelpsContent,
        imageUrl: contentImg?.src ?? null,
        additionalContent: "",
      },
    },
    {
      type: "approach" as const,
      enabled: approachContent.length > 0,
      position: 3,
      data: {
        heading: "Our Approach",
        subtitle: `Our approach to ${name} at AXON Multi-Rehabilitation Centre`,
        content: approachContent,
        imageUrl: null,
      },
    },
    {
      type: "benefits" as const,
      enabled: true,
      position: 4,
      data: {
        heading: `Who Can Benefit from ${name}?`,
        description: "",
        items: entry.whoMayBenefit.map((text) => ({ id: crypto.randomUUID(), text })),
        imageUrl: benefitImg?.src ?? null,
      },
    },
    {
      type: "why_choose_us" as const,
      enabled: true,
      position: 5,
      data: {
        heading: `Why Choose AXON Multi-Rehabilitation Centre for ${name}?`,
        description: "",
        content: whyChooseContent,
        points: WHY_CHOOSE_POINTS.map((text) => ({ id: crypto.randomUUID(), text })),
        imageUrl: null,
      },
    },
    {
      type: "faqs" as const,
      enabled: entry.faqs.length > 0,
      position: 6,
      data: {
        items: entry.faqs.map((f) => ({ id: crypto.randomUUID(), question: f.question, answer: f.answer, enabled: true })),
      },
    },
  ];
}

async function fillOne(entry: ServiceEntry | ProgramEntry, kind: "service" | "program") {
  const category = await findCategoryBySlug(entry.slug);
  if (!category) {
    console.log(`Skipping "${entry.name}" — no matching category found for slug "${entry.slug}".`);
    return;
  }
  const page = await findPageByCategoryId(category.id);
  if (!page) {
    console.log(`Skipping "${entry.name}" — no subcategory_pages row provisioned yet.`);
    return;
  }

  const sections = await buildSectionsFor(entry, kind);
  const heroImg = kind === "service" ? (media.serviceShowcaseImages as any)[entry.slug] : (media.programImages as any)[entry.slug];

  await updatePageFull(
    page.id,
    {
      seoTitle: entry.seo.title,
      seoDescription: entry.seo.description,
      seoKeywords: "",
      featuredImageUrl: heroImg?.src ?? null,
      status: "published",
    },
    sections
  );
  console.log(`Filled "${entry.name}".`);
}

async function main() {
  for (const service of services) {
    await fillOne(service, "service");
  }
  for (const program of programs) {
    await fillOne(program, "program");
  }
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Fill failed:", err);
  process.exit(1);
});
