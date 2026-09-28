import { z } from "zod";
import { SECTION_TYPES } from "../lib/subcategoryPageSections";

const listItemSchema = z.object({
  id: z.string(),
  text: z.string(),
});

const approachItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().default(""),
});

const faqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  enabled: z.boolean().default(true),
});

const heroDataSchema = z.object({
  heading: z.string().optional().default(""),
  subtitle: z.string().optional().default(""),
  imageUrl: z.string().nullable().optional().default(null),
  buttonText: z.string().optional().default(""),
  buttonUrl: z.string().optional().default(""),
});

const aboutDataSchema = z.object({
  heading: z.string().optional().default(""),
  content: z.string().optional().default(""),
  imageUrl: z.string().nullable().optional().default(null),
  imagePosition: z.enum(["left", "right"]).optional().default("right"),
});

const howItHelpsDataSchema = z.object({
  heading: z.string().optional().default(""),
  content: z.string().optional().default(""),
  imageUrl: z.string().nullable().optional().default(null),
  additionalContent: z.string().optional().default(""),
});

const approachDataSchema = z.object({
  heading: z.string().optional().default(""),
  subtitle: z.string().optional().default(""),
  items: z.array(approachItemSchema).optional().default([]),
});

const benefitsDataSchema = z.object({
  heading: z.string().optional().default(""),
  description: z.string().optional().default(""),
  items: z.array(listItemSchema).optional().default([]),
  imageUrl: z.string().nullable().optional().default(null),
});

const whyChooseUsDataSchema = z.object({
  heading: z.string().optional().default(""),
  description: z.string().optional().default(""),
  content: z.string().optional().default(""),
  points: z.array(listItemSchema).optional().default([]),
  imageUrl: z.string().nullable().optional().default(null),
});

const faqsDataSchema = z.object({
  items: z.array(faqItemSchema).optional().default([]),
});

export const sectionDataSchemaByType = {
  hero: heroDataSchema,
  about: aboutDataSchema,
  how_it_helps: howItHelpsDataSchema,
  approach: approachDataSchema,
  benefits: benefitsDataSchema,
  why_choose_us: whyChooseUsDataSchema,
  faqs: faqsDataSchema,
} as const;

const sectionInputSchema = z.object({
  type: z.enum(SECTION_TYPES),
  enabled: z.boolean().default(true),
  position: z.number().int().min(0),
  data: z.record(z.string(), z.unknown()),
});

export const updateSubcategoryPageSchema = z.object({
  seoTitle: z.string().trim().max(191).optional().default(""),
  seoDescription: z.string().trim().max(500).optional().default(""),
  seoKeywords: z.string().trim().max(500).optional().default(""),
  featuredImageUrl: z.string().nullable().optional().default(null),
  status: z.enum(["draft", "published"]).optional().default("draft"),
  sections: z.array(sectionInputSchema),
});

export function validateSectionData(type: (typeof SECTION_TYPES)[number], data: unknown) {
  return sectionDataSchemaByType[type].parse(data ?? {});
}
