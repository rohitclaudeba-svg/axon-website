const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export type SectionType = "hero" | "about" | "how_it_helps" | "approach" | "benefits" | "why_choose_us" | "faqs";

export interface TextListItem {
  id: string;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  enabled: boolean;
}

export interface ApproachItem {
  id: string;
  title: string;
  description: string;
}

export interface HeroSectionData {
  heading: string;
  subtitle: string;
  imageUrl: string | null;
  buttonText: string;
  buttonUrl: string;
}

export interface AboutSectionData {
  heading: string;
  content: string;
  imageUrl: string | null;
  imagePosition: "left" | "right";
}

export interface HowItHelpsSectionData {
  heading: string;
  content: string;
  imageUrl: string | null;
  additionalContent: string;
}

export interface ApproachSectionData {
  heading: string;
  subtitle: string;
  items: ApproachItem[];
}

export interface BenefitsSectionData {
  heading: string;
  description: string;
  items: TextListItem[];
  imageUrl: string | null;
}

export interface WhyChooseUsSectionData {
  heading: string;
  description: string;
  content: string;
  points: TextListItem[];
  imageUrl: string | null;
}

export interface FaqsSectionData {
  items: FaqItem[];
}

export type SectionDataByType = {
  hero: HeroSectionData;
  about: AboutSectionData;
  how_it_helps: HowItHelpsSectionData;
  approach: ApproachSectionData;
  benefits: BenefitsSectionData;
  why_choose_us: WhyChooseUsSectionData;
  faqs: FaqsSectionData;
};

export interface SubcategorySection<T extends SectionType = SectionType> {
  type: T;
  enabled: boolean;
  position: number;
  data: SectionDataByType[T];
}

export interface SubcategoryPageData {
  pageId: number;
  categoryId: number;
  name: string;
  slug: string;
  parentName: string;
  parentSlug: string;
  url: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImageUrl: string | null;
  status: "draft" | "published";
  sections: SubcategorySection[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Server-side fetch for a subcategory's live page content, used by
 * /services/[slug] and /rehabilitation/[slug]. Always hits the network (no
 * cache) so admin edits show up on the next page load — this content is
 * admin-managed and expected to change independently of a redeploy.
 */
export async function getPublishedSubcategoryPage(slug: string): Promise<SubcategoryPageData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/subcategory-pages/public/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = (await res.json()) as { ok: boolean; data: SubcategoryPageData };
    return json.ok ? json.data : null;
  } catch {
    return null;
  }
}
