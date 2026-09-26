/**
 * Shared content shapes for the typed data layer.
 * Field names intentionally mirror the future MySQL columns (spec §10) so this
 * layer can be swapped for real API/DB-backed data later with minimal rework.
 */

export type IconName =
  | "speech"
  | "occupational"
  | "physiotherapy"
  | "special-education"
  | "behavioral-therapy"
  | "social-groups"
  | "school-readiness"
  | "play-groups"
  | "pediatric"
  | "neurological"
  | "orthopedic"
  | "geriatric"
  | "assessment"
  | "plan"
  | "therapy"
  | "progress";

export interface SeoMeta {
  title: string;
  description: string;
}

export interface SupportArea {
  title: string;
  description: string;
}

/** A themed cluster of strategies within "Our Approach" — optional; when a
 * service/program doesn't define these, the page falls back to a flat list
 * built from `supportAreas` instead. */
export interface ApproachSection {
  title: string;
  intro: string;
  items: SupportArea[];
}

export interface ServiceEntry {
  slug: string;
  name: string;
  shortDescription: string;
  icon: IconName;
  heroSummary: string;
  whatItIs: string;
  supportAreas: SupportArea[];
  approachSections?: ApproachSection[];
  whoMayBenefit: string[];
  processSteps: string[];
  faqs: FaqEntry[];
  relatedServiceSlugs: string[];
  relatedProgramSlugs: string[];
  seo: SeoMeta;
}

export interface ProgramEntry {
  slug: string;
  name: string;
  shortDescription: string;
  icon: IconName;
  heroSummary: string;
  whatItIs: string;
  supportAreas: SupportArea[];
  whoMayBenefit: string[];
  processSteps: string[];
  faqs: FaqEntry[];
  relatedServiceSlugs: string[];
  relatedConditionGroupSlugs: string[];
  seo: SeoMeta;
}

export interface ConditionGroup {
  slug: string;
  title: string;
  description: string;
  items: SupportArea[];
  icon: IconName;
}

export interface CareerOpening {
  slug: string;
  title: string;
  department: string;
  icon: IconName;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** One entry per paragraph. */
  bio: string[];
  photoPlaceholder: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}
