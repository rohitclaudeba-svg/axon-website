export interface GalleryItemDto {
  id: number;
  type: "image" | "video";
  src: string | null;
  youtubeId: string | null;
  thumbnail: string;
  title: string | null;
  description: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewDto {
  id: number;
  quote: string;
  author: string;
  context: string | null;
  rating: number | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus =
  | "waiting_for_action"
  | "no_response"
  | "follow_up"
  | "appointment_confirmed"
  | "consultation_done";

export interface EnquiryDto {
  id: number;
  source: "appointment" | "contact";
  name: string;
  phone: string;
  email: string | null;
  serviceInterest: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VideoTestimonialDto {
  id: number;
  youtubeId: string;
  title: string;
  author: string | null;
  thumbnail: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryDto {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTreeNode extends CategoryDto {
  children: CategoryDto[];
}

export type SectionType = "hero" | "about" | "how_it_helps" | "approach" | "benefits" | "why_choose_us" | "faqs";

export interface SubcategoryPageSummaryDto {
  categoryId: number;
  name: string;
  slug: string;
  parentName: string;
  parentSlug: string;
  url: string;
  pageId: number | null;
  status: "draft" | "published" | "not_started";
  updatedAt: string | null;
}

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
  content: string;
  imageUrl: string | null;
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

export interface SectionDto<T extends SectionType = SectionType> {
  type: T;
  label: string;
  enabled: boolean;
  position: number;
  data: SectionDataByType[T];
}

export interface SubcategoryPageDetailDto {
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
  sections: SectionDto[];
  createdAt: string;
  updatedAt: string;
}

export interface FounderDto {
  id: number;
  name: string;
  credentials: string | null;
  role: string;
  bio: string;
  bioParagraphs: string[];
  photo: string | null;
  position: number;
  createdAt: string;
  updatedAt: string;
}
