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
