import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface VideoTestimonialRow extends RowDataPacket {
  id: number;
  youtube_id: string;
  title: string;
  author: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllVideoTestimonials(): Promise<VideoTestimonialRow[]> {
  const [rows] = await pool.query<VideoTestimonialRow[]>(
    "SELECT * FROM video_testimonials ORDER BY position ASC, id ASC"
  );
  return rows;
}

export async function findVideoTestimonialById(id: number): Promise<VideoTestimonialRow | null> {
  const [rows] = await pool.query<VideoTestimonialRow[]>(
    "SELECT * FROM video_testimonials WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export interface VideoTestimonialInput {
  youtubeId: string;
  title: string;
  author?: string | null;
}

export async function insertVideoTestimonial(data: VideoTestimonialInput): Promise<number> {
  const [positionRows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM video_testimonials"
  );
  const position = positionRows[0].position as number;

  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO video_testimonials (youtube_id, title, author, position) VALUES (?, ?, ?, ?)",
    [data.youtubeId, data.title, data.author ?? null, position]
  );
  return result.insertId;
}

export async function updateVideoTestimonial(id: number, data: VideoTestimonialInput): Promise<void> {
  await pool.query("UPDATE video_testimonials SET youtube_id = ?, title = ?, author = ? WHERE id = ?", [
    data.youtubeId,
    data.title,
    data.author ?? null,
    id,
  ]);
}

export async function deleteVideoTestimonial(id: number): Promise<void> {
  await pool.query("DELETE FROM video_testimonials WHERE id = ?", [id]);
}
