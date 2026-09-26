import fs from "node:fs";
import path from "node:path";
import {
  findAllFounders,
  findFounderById,
  insertFounder,
  updateFounder,
  deleteFounder,
  type FounderRow,
  type NewFounder,
  type UpdateFounder,
} from "../repositories/founders.repository";
import { env } from "../config/env";
import { foundersDir } from "../middleware/upload";

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

function toDto(row: FounderRow): FounderDto {
  return {
    id: row.id,
    name: row.name,
    credentials: row.credentials,
    role: row.role,
    bio: row.bio,
    bioParagraphs: row.bio
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    photo: row.photo_filename ? `${env.PUBLIC_API_URL}/uploads/founders/${row.photo_filename}` : null,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listFounders(): Promise<FounderDto[]> {
  const rows = await findAllFounders();
  return rows.map(toDto);
}

export async function getFounder(id: number): Promise<FounderDto | null> {
  const row = await findFounderById(id);
  return row ? toDto(row) : null;
}

export async function createFounder(data: NewFounder): Promise<FounderDto> {
  const id = await insertFounder(data);
  const row = await findFounderById(id);
  if (!row) throw new Error("Failed to load newly created founder");
  return toDto(row);
}

function deleteFileQuietly(filename: string) {
  fs.promises.unlink(path.join(foundersDir, filename)).catch(() => {
    // Already gone / never existed — nothing more to do.
  });
}

export async function editFounder(id: number, data: UpdateFounder): Promise<FounderDto | null> {
  const existing = await findFounderById(id);
  if (!existing) return null;

  await updateFounder(id, data);

  if (data.photoFilename && existing.photo_filename) {
    deleteFileQuietly(existing.photo_filename);
  }

  const row = await findFounderById(id);
  return row ? toDto(row) : null;
}

export async function removeFounder(id: number): Promise<boolean> {
  const row = await findFounderById(id);
  if (!row) return false;

  await deleteFounder(id);

  if (row.photo_filename) {
    deleteFileQuietly(row.photo_filename);
  }

  return true;
}
