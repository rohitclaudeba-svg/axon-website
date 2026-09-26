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
