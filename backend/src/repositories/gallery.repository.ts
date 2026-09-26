import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface GalleryItemRow extends RowDataPacket {
  id: number;
  type: "image" | "video";
  filename: string | null;
  original_filename: string | null;
  youtube_id: string | null;
  title: string | null;
  description: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllGalleryItems(): Promise<GalleryItemRow[]> {
  const [rows] = await pool.query<GalleryItemRow[]>(
    "SELECT * FROM gallery_items ORDER BY position ASC, id ASC"
  );
  return rows;
}

export async function findGalleryItemById(id: number): Promise<GalleryItemRow | null> {
  const [rows] = await pool.query<GalleryItemRow[]>(
    "SELECT * FROM gallery_items WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

async function nextPosition(): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM gallery_items"
  );
  return rows[0].position as number;
}

export interface NewImageItem {
  type: "image";
  filename: string;
  originalFilename: string;
  description: string;
}

export interface NewVideoItem {
  type: "video";
  youtubeId: string;
  title: string;
  description: string;
}

export async function insertGalleryItem(data: NewImageItem | NewVideoItem): Promise<number> {
  const position = await nextPosition();

  if (data.type === "image") {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO gallery_items (type, filename, original_filename, description, position)
       VALUES ('image', ?, ?, ?, ?)`,
      [data.filename, data.originalFilename, data.description, position]
    );
    return result.insertId;
  }

  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO gallery_items (type, youtube_id, title, description, position)
     VALUES ('video', ?, ?, ?, ?)`,
    [data.youtubeId, data.title, data.description, position]
  );
  return result.insertId;
}

export interface UpdateImageItem {
  filename?: string; // only set when the admin replaces the photo
  originalFilename?: string;
  description: string;
}

export interface UpdateVideoItem {
  youtubeId: string;
  title: string;
  description: string;
}

export async function updateGalleryImageItem(id: number, data: UpdateImageItem): Promise<void> {
  if (data.filename) {
    await pool.query(
      "UPDATE gallery_items SET filename = ?, original_filename = ?, description = ? WHERE id = ?",
      [data.filename, data.originalFilename, data.description, id]
    );
  } else {
    await pool.query("UPDATE gallery_items SET description = ? WHERE id = ?", [data.description, id]);
  }
}

export async function updateGalleryVideoItem(id: number, data: UpdateVideoItem): Promise<void> {
  await pool.query("UPDATE gallery_items SET youtube_id = ?, title = ?, description = ? WHERE id = ?", [
    data.youtubeId,
    data.title,
    data.description,
    id,
  ]);
}

export async function deleteGalleryItem(id: number): Promise<void> {
  await pool.query("DELETE FROM gallery_items WHERE id = ?", [id]);
}
