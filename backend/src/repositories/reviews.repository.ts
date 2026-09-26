import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

// Table name stays `testimonials` (internal detail, matches the migration
// already applied) — only the public-facing naming ("Reviews") changed.
export interface ReviewRow extends RowDataPacket {
  id: number;
  quote: string;
  author: string;
  context: string | null;
  rating: number | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllReviews(): Promise<ReviewRow[]> {
  const [rows] = await pool.query<ReviewRow[]>(
    "SELECT * FROM testimonials ORDER BY position ASC, id ASC"
  );
  return rows;
}

export async function findReviewById(id: number): Promise<ReviewRow | null> {
  const [rows] = await pool.query<ReviewRow[]>("SELECT * FROM testimonials WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export interface ReviewInput {
  quote: string;
  author: string;
  context?: string | null;
  rating?: number | null;
}

export async function insertReview(data: ReviewInput): Promise<number> {
  const [positionRows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM testimonials"
  );
  const position = positionRows[0].position as number;

  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO testimonials (quote, author, context, rating, position) VALUES (?, ?, ?, ?, ?)",
    [data.quote, data.author, data.context ?? null, data.rating ?? null, position]
  );
  return result.insertId;
}

export async function updateReview(id: number, data: ReviewInput): Promise<void> {
  await pool.query("UPDATE testimonials SET quote = ?, author = ?, context = ?, rating = ? WHERE id = ?", [
    data.quote,
    data.author,
    data.context ?? null,
    data.rating ?? null,
    id,
  ]);
}

export async function deleteReview(id: number): Promise<void> {
  await pool.query("DELETE FROM testimonials WHERE id = ?", [id]);
}
