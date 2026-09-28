import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface CareerOpeningRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  department: string;
  icon: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: unknown; // mysql2 auto-parses JSON columns
  requirements: unknown;
  enabled: number;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllCareerOpenings(): Promise<CareerOpeningRow[]> {
  const [rows] = await pool.query<CareerOpeningRow[]>(
    "SELECT * FROM career_openings ORDER BY position ASC, id ASC"
  );
  return rows;
}

export async function findCareerOpeningById(id: number): Promise<CareerOpeningRow | null> {
  const [rows] = await pool.query<CareerOpeningRow[]>("SELECT * FROM career_openings WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export async function findCareerOpeningBySlug(slug: string): Promise<CareerOpeningRow | null> {
  const [rows] = await pool.query<CareerOpeningRow[]>(
    "SELECT * FROM career_openings WHERE slug = ? LIMIT 1",
    [slug]
  );
  return rows[0] ?? null;
}

async function nextPosition(): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM career_openings"
  );
  return rows[0].position as number;
}

export interface NewCareerOpening {
  slug: string;
  title: string;
  department: string;
  icon: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  enabled: boolean;
}

export async function insertCareerOpening(data: NewCareerOpening): Promise<number> {
  const position = await nextPosition();
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO career_openings
      (slug, title, department, icon, type, location, summary, responsibilities, requirements, enabled, position)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.slug,
      data.title,
      data.department,
      data.icon,
      data.type,
      data.location,
      data.summary,
      JSON.stringify(data.responsibilities),
      JSON.stringify(data.requirements),
      data.enabled ? 1 : 0,
      position,
    ]
  );
  return result.insertId;
}

export interface UpdateCareerOpening {
  title: string;
  department: string;
  icon: string;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  enabled: boolean;
}

export async function updateCareerOpening(id: number, data: UpdateCareerOpening): Promise<void> {
  await pool.query(
    `UPDATE career_openings SET
      title = ?, department = ?, icon = ?, type = ?, location = ?, summary = ?,
      responsibilities = ?, requirements = ?, enabled = ?
     WHERE id = ?`,
    [
      data.title,
      data.department,
      data.icon,
      data.type,
      data.location,
      data.summary,
      JSON.stringify(data.responsibilities),
      JSON.stringify(data.requirements),
      data.enabled ? 1 : 0,
      id,
    ]
  );
}

export async function deleteCareerOpening(id: number): Promise<void> {
  await pool.query("DELETE FROM career_openings WHERE id = ?", [id]);
}
