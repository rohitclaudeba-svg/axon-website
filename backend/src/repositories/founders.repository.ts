import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface FounderRow extends RowDataPacket {
  id: number;
  name: string;
  credentials: string | null;
  role: string;
  bio: string;
  photo_filename: string | null;
  photo_original_filename: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllFounders(): Promise<FounderRow[]> {
  const [rows] = await pool.query<FounderRow[]>("SELECT * FROM founders ORDER BY position ASC, id ASC");
  return rows;
}

export async function findFounderById(id: number): Promise<FounderRow | null> {
  const [rows] = await pool.query<FounderRow[]>("SELECT * FROM founders WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

async function nextPosition(): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM founders"
  );
  return rows[0].position as number;
}

export interface NewFounder {
  name: string;
  credentials: string;
  role: string;
  bio: string;
  photoFilename: string | null;
  photoOriginalFilename: string | null;
}

export async function insertFounder(data: NewFounder): Promise<number> {
  const position = await nextPosition();
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO founders (name, credentials, role, bio, photo_filename, photo_original_filename, position)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.name, data.credentials, data.role, data.bio, data.photoFilename, data.photoOriginalFilename, position]
  );
  return result.insertId;
}

export interface UpdateFounder {
  name: string;
  credentials: string;
  role: string;
  bio: string;
  photoFilename?: string; // only set when the admin replaces the photo
  photoOriginalFilename?: string;
}

export async function updateFounder(id: number, data: UpdateFounder): Promise<void> {
  if (data.photoFilename) {
    await pool.query(
      `UPDATE founders SET name = ?, credentials = ?, role = ?, bio = ?, photo_filename = ?, photo_original_filename = ?
       WHERE id = ?`,
      [data.name, data.credentials, data.role, data.bio, data.photoFilename, data.photoOriginalFilename, id]
    );
  } else {
    await pool.query("UPDATE founders SET name = ?, credentials = ?, role = ?, bio = ? WHERE id = ?", [
      data.name,
      data.credentials,
      data.role,
      data.bio,
      id,
    ]);
  }
}

export async function deleteFounder(id: number): Promise<void> {
  await pool.query("DELETE FROM founders WHERE id = ?", [id]);
}
