export const SECTION_TYPES = [
  "hero",
  "about",
  "how_it_helps",
  "approach",
  "benefits",
  "why_choose_us",
  "faqs",
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero Banner",
  about: "What is this service?",
  how_it_helps: "How it helps",
  approach: "Our Approach",
  benefits: "Who Can Benefit",
  why_choose_us: "Why Choose AXON",
  faqs: "FAQs",
};

export function defaultSectionData(type: SectionType): Record<string, unknown> {
  switch (type) {
    case "hero":
      return { heading: "", subtitle: "", imageUrl: null, mobileImageUrl: null, buttonText: "", buttonUrl: "" };
    case "about":
      return { heading: "", content: "", imageUrl: null, imagePosition: "right" };
    case "how_it_helps":
      return { heading: "", content: "", imageUrl: null, additionalContent: "" };
    case "approach":
      return { heading: "", subtitle: "", items: [] };
    case "benefits":
      return { heading: "", description: "", items: [], imageUrl: null };
    case "why_choose_us":
      return { heading: "", description: "", content: "", points: [], imageUrl: null };
    case "faqs":
      return { items: [] };
  }
}
