import {
  findAllCategories,
  findCategoryById,
  findCategoryBySlug,
  countChildren,
  insertCategory,
  updateCategoryRow,
  deleteCategoryRow,
  type CategoryRow,
} from "../repositories/categories.repository";
import { provisionPageForCategory } from "./subcategoryPages.service";

export interface CategoryDto {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTreeNode extends CategoryDto {
  children: CategoryDto[];
}

function toDto(row: CategoryRow): CategoryDto {
  return {
    id: row.id,
    parentId: row.parent_id,
    name: row.name,
    slug: row.slug,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 150) || "category";
}

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let suffix = 2;
  while (await findCategoryBySlug(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export class CategoryError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export async function listCategoryTree(): Promise<CategoryTreeNode[]> {
  const rows = await findAllCategories();
  const dtos = rows.map(toDto);
  const parents = dtos.filter((c) => c.parentId === null);
  const children = dtos.filter((c) => c.parentId !== null);
  return parents.map((parent) => ({
    ...parent,
    children: children.filter((c) => c.parentId === parent.id),
  }));
}

export async function getCategory(id: number): Promise<CategoryDto | null> {
  const row = await findCategoryById(id);
  return row ? toDto(row) : null;
}

export async function createCategory(data: { name: string; parentId: number | null }): Promise<CategoryDto> {
  if (data.parentId !== null) {
    const parent = await findCategoryById(data.parentId);
    if (!parent) throw new CategoryError("Selected parent category was not found.");
    if (parent.parent_id !== null) throw new CategoryError("Subcategories can only be created under a parent category.");
  }

  const slug = await uniqueSlug(data.name);
  const id = await insertCategory({ name: data.name, slug, parentId: data.parentId });
  const row = await findCategoryById(id);
  if (!row) throw new Error("Failed to load newly created category");

  // Every category — parent or subcategory — automatically gets its dynamic
  // page structure, no developer step required before the admin can start
  // filling it in.
  await provisionPageForCategory(id);

  return toDto(row);
}

export async function editCategory(
  id: number,
  data: { name: string; parentId: number | null }
): Promise<CategoryDto | null> {
  const existing = await findCategoryById(id);
  if (!existing) return null;

  if (data.parentId !== null) {
    if (data.parentId === id) throw new CategoryError("A category can't be its own parent.");
    const parent = await findCategoryById(data.parentId);
    if (!parent) throw new CategoryError("Selected parent category was not found.");
    if (parent.parent_id !== null) throw new CategoryError("Subcategories can only be created under a parent category.");
  } else if (existing.parent_id === null) {
    // Staying a parent category — must not itself have children turned invalid; nothing else to check.
  }

  // A parent category with existing subcategories can't be turned into a subcategory itself.
  if (data.parentId !== null && existing.parent_id === null) {
    const childCount = await countChildren(id);
    if (childCount > 0) {
      throw new CategoryError("This category has subcategories under it — remove them before making it a subcategory.");
    }
  }

  await updateCategoryRow(id, { name: data.name, parentId: data.parentId });

  // Became a subcategory just now (e.g. reparented from top-level) — make
  // sure its dynamic page structure exists.
  if (data.parentId !== null && existing.parent_id === null) {
    await provisionPageForCategory(id);
  }

  const row = await findCategoryById(id);
  return row ? toDto(row) : null;
}

export async function removeCategory(id: number): Promise<boolean> {
  const row = await findCategoryById(id);
  if (!row) return false;

  const childCount = await countChildren(id);
  if (childCount > 0) {
    throw new CategoryError("Delete its subcategories first before deleting this category.");
  }

  await deleteCategoryRow(id);
  return true;
}
