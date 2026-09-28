import fs from "node:fs";
import path from "node:path";
import {
  findAllGalleryItems,
  findGalleryItemById,
  insertGalleryItem,
  updateGalleryImageItem,
  updateGalleryVideoItem,
  deleteGalleryItem,
  reorderGalleryItems,
  type GalleryItemRow,
  type NewImageItem,
  type NewVideoItem,
} from "../repositories/gallery.repository";
import { env } from "../config/env";
import { galleryDir } from "../middleware/upload";

export interface GalleryItemDto {
  id: number;
  type: "image" | "video";
  src: string | null; // image URL (image items only)
  youtubeId: string | null; // video items only
  thumbnail: string; // usable in a grid for either type
  title: string | null;
  description: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

function toDto(row: GalleryItemRow): GalleryItemDto {
  const isImage = row.type === "image";
  const src = isImage && row.filename ? `${env.PUBLIC_API_URL}/uploads/gallery/${row.filename}` : null;
  const thumbnail = isImage
    ? (src as string)
    : `https://img.youtube.com/vi/${row.youtube_id}/hqdefault.jpg`;

  return {
    id: row.id,
    type: row.type,
    src,
    youtubeId: row.youtube_id,
    thumbnail,
    title: row.title,
    description: row.description,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listGalleryItems(): Promise<GalleryItemDto[]> {
  const rows = await findAllGalleryItems();
  return rows.map(toDto);
}

export async function getGalleryItem(id: number): Promise<GalleryItemDto | null> {
  const row = await findGalleryItemById(id);
  return row ? toDto(row) : null;
}

export async function createGalleryItem(data: NewImageItem | NewVideoItem): Promise<GalleryItemDto> {
  const id = await insertGalleryItem(data);
  const row = await findGalleryItemById(id);
  if (!row) throw new Error("Failed to load newly created gallery item");
  return toDto(row);
}

function deleteFileQuietly(filename: string) {
  fs.promises.unlink(path.join(galleryDir, filename)).catch(() => {
    // Already gone / never existed — nothing more to do.
  });
}

export async function updateImageGalleryItem(
  id: number,
  data: { filename?: string; originalFilename?: string; description: string }
): Promise<GalleryItemDto | null> {
  const existing = await findGalleryItemById(id);
  if (!existing || existing.type !== "image") return null;

  await updateGalleryImageItem(id, data);

  // Replacing the photo — remove the old file now that the new one is saved.
  if (data.filename && existing.filename) {
    deleteFileQuietly(existing.filename);
  }

  const row = await findGalleryItemById(id);
  return row ? toDto(row) : null;
}

export async function updateVideoGalleryItem(
  id: number,
  data: { youtubeId: string; title: string; description: string }
): Promise<GalleryItemDto | null> {
  const existing = await findGalleryItemById(id);
  if (!existing || existing.type !== "video") return null;

  await updateGalleryVideoItem(id, data);
  const row = await findGalleryItemById(id);
  return row ? toDto(row) : null;
}

export async function removeGalleryItem(id: number): Promise<boolean> {
  const row = await findGalleryItemById(id);
  if (!row) return false;

  await deleteGalleryItem(id);

  if (row.type === "image" && row.filename) {
    deleteFileQuietly(row.filename);
  }

  return true;
}

export async function reorderGallery(ids: number[]): Promise<GalleryItemDto[]> {
  await reorderGalleryItems(ids);
  return listGalleryItems();
}
