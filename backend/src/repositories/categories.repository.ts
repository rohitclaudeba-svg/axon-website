import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface CategoryRow extends RowDataPacket {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function findAllCategories(): Promise<CategoryRow[]> {
  const [rows] = await pool.query<CategoryRow[]>(
    "SELECT * FROM categories ORDER BY parent_id IS NOT NULL, position ASC, id ASC"
  );
  return rows;
}

export async function findCategoryById(id: number): Promise<CategoryRow | null> {
  const [rows] = await pool.query<CategoryRow[]>("SELECT * FROM categories WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export async function findCategoryBySlug(slug: string): Promise<CategoryRow | null> {
  const [rows] = await pool.query<CategoryRow[]>("SELECT * FROM categories WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] ?? null;
}

export async function countChildren(id: number): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS count FROM categories WHERE parent_id = ?",
    [id]
  );
  return rows[0].count as number;
}

async function nextPosition(parentId: number | null): Promise<number> {
  const [rows] = await pool.query<RowDataPacket[]>(
    parentId === null
      ? "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM categories WHERE parent_id IS NULL"
      : "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM categories WHERE parent_id = ?",
    parentId === null ? [] : [parentId]
  );
  return rows[0].position as number;
}

export interface NewCategory {
  name: string;
  slug: string;
  parentId: number | null;
}

export async function insertCategory(data: NewCategory): Promise<number> {
  const position = await nextPosition(data.parentId);
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO categories (parent_id, name, slug, position) VALUES (?, ?, ?, ?)",
    [data.parentId, data.name, data.slug, position]
  );
  return result.insertId;
}

export interface UpdateCategory {
  name: string;
  parentId: number | null;
}

export async function updateCategoryRow(id: number, data: UpdateCategory): Promise<void> {
  await pool.query("UPDATE categories SET name = ?, parent_id = ? WHERE id = ?", [
    data.name,
    data.parentId,
    id,
  ]);
}

export async function deleteCategoryRow(id: number): Promise<void> {
  await pool.query("DELETE FROM categories WHERE id = ?", [id]);
}
