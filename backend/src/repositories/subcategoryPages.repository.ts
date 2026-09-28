import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import { SECTION_TYPES, defaultSectionData, type SectionType } from "../lib/subcategoryPageSections";

export interface SubcategoryPageRow extends RowDataPacket {
  id: number;
  category_id: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  featured_image_url: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface SectionRow extends RowDataPacket {
  id: number;
  subcategory_page_id: number;
  type: SectionType;
  enabled: number;
  position: number;
  data: unknown; // mysql2 auto-parses JSON columns to JS values
  created_at: string;
  updated_at: string;
}

export interface CategoryJoinRow extends RowDataPacket {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  parent_name: string | null;
  parent_slug: string | null;
}

export async function findPageByCategoryId(categoryId: number): Promise<SubcategoryPageRow | null> {
  const [rows] = await pool.query<SubcategoryPageRow[]>(
    "SELECT * FROM subcategory_pages WHERE category_id = ? LIMIT 1",
    [categoryId]
  );
  return rows[0] ?? null;
}

export async function findPageById(id: number): Promise<SubcategoryPageRow | null> {
  const [rows] = await pool.query<SubcategoryPageRow[]>("SELECT * FROM subcategory_pages WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export async function findSectionsByPageId(pageId: number): Promise<SectionRow[]> {
  const [rows] = await pool.query<SectionRow[]>(
    "SELECT * FROM subcategory_page_sections WHERE subcategory_page_id = ? ORDER BY position ASC, id ASC",
    [pageId]
  );
  return rows;
}

export async function findCategoryWithParent(categoryId: number): Promise<CategoryJoinRow | null> {
  const [rows] = await pool.query<CategoryJoinRow[]>(
    `SELECT c.id, c.name, c.slug, c.parent_id, p.name AS parent_name, p.slug AS parent_slug
     FROM categories c
     LEFT JOIN categories p ON p.id = c.parent_id
     WHERE c.id = ? LIMIT 1`,
    [categoryId]
  );
  return rows[0] ?? null;
}

export async function listAllSubcategoriesWithPages(): Promise<
  (CategoryJoinRow & { page_id: number | null; status: "draft" | "published" | null; updated_at: string | null })[]
> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.id, c.name, c.slug, c.parent_id, p.name AS parent_name, p.slug AS parent_slug,
            sp.id AS page_id, sp.status, sp.updated_at
     FROM categories c
     LEFT JOIN categories p ON p.id = c.parent_id
     LEFT JOIN subcategory_pages sp ON sp.category_id = c.id
     WHERE c.parent_id IS NOT NULL
     ORDER BY p.position ASC, p.id ASC, c.position ASC, c.id ASC`
  );
  return rows as (CategoryJoinRow & {
    page_id: number | null;
    status: "draft" | "published" | null;
    updated_at: string | null;
  })[];
}

export async function listAllParentCategoriesWithPages(): Promise<
  (CategoryJoinRow & { page_id: number | null; status: "draft" | "published" | null; updated_at: string | null })[]
> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.id, c.name, c.slug, c.parent_id, NULL AS parent_name, NULL AS parent_slug,
            sp.id AS page_id, sp.status, sp.updated_at
     FROM categories c
     LEFT JOIN subcategory_pages sp ON sp.category_id = c.id
     WHERE c.parent_id IS NULL
     ORDER BY c.position ASC, c.id ASC`
  );
  return rows as (CategoryJoinRow & {
    page_id: number | null;
    status: "draft" | "published" | null;
    updated_at: string | null;
  })[];
}

/** Creates the subcategory_pages row + one row per section type, all defaulted. Idempotent. */
export async function provisionPage(categoryId: number): Promise<number> {
  const existing = await findPageByCategoryId(categoryId);
  if (existing) return existing.id;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query<ResultSetHeader>(
      "INSERT INTO subcategory_pages (category_id, status) VALUES (?, 'draft')",
      [categoryId]
    );
    const pageId = result.insertId;

    for (let i = 0; i < SECTION_TYPES.length; i++) {
      const type = SECTION_TYPES[i];
      await conn.query(
        "INSERT INTO subcategory_page_sections (subcategory_page_id, type, enabled, position, data) VALUES (?, ?, 1, ?, ?)",
        [pageId, type, i, JSON.stringify(defaultSectionData(type))]
      );
    }

    await conn.commit();
    return pageId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export interface UpdatePageInput {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImageUrl: string | null;
  status: "draft" | "published";
}

export interface UpdateSectionInput {
  type: SectionType;
  enabled: boolean;
  position: number;
  data: Record<string, unknown>;
}

export async function updatePageFull(pageId: number, page: UpdatePageInput, sections: UpdateSectionInput[]) {
  const conn: PoolConnection = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      "UPDATE subcategory_pages SET seo_title = ?, seo_description = ?, seo_keywords = ?, featured_image_url = ?, status = ? WHERE id = ?",
      [page.seoTitle, page.seoDescription, page.seoKeywords, page.featuredImageUrl, page.status, pageId]
    );

    for (const section of sections) {
      await conn.query(
        `UPDATE subcategory_page_sections SET enabled = ?, position = ?, data = ?
         WHERE subcategory_page_id = ? AND type = ?`,
        [section.enabled ? 1 : 0, section.position, JSON.stringify(section.data), pageId, section.type]
      );
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
