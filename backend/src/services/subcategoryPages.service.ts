import {
  findPageByCategoryId,
  findPageById,
  findSectionsByPageId,
  findCategoryWithParent,
  listAllSubcategoriesWithPages,
  provisionPage,
  updatePageFull,
  type UpdatePageInput,
  type UpdateSectionInput,
} from "../repositories/subcategoryPages.repository";
import { SECTION_TYPES, defaultSectionData, type SectionType } from "../lib/subcategoryPageSections";
import { validateSectionData } from "../validators/subcategoryPages";

export interface SubcategoryPageSummaryDto {
  categoryId: number;
  name: string;
  slug: string;
  parentName: string;
  parentSlug: string;
  url: string;
  pageId: number | null;
  status: "draft" | "published" | "not_started";
  updatedAt: string | null;
}

export interface SectionDto {
  type: SectionType;
  label: string;
  enabled: boolean;
  position: number;
  data: Record<string, unknown>;
}

export interface SubcategoryPageDetailDto {
  pageId: number;
  categoryId: number;
  name: string;
  slug: string;
  parentName: string;
  parentSlug: string;
  url: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featuredImageUrl: string | null;
  status: "draft" | "published";
  sections: SectionDto[];
  createdAt: string;
  updatedAt: string;
}

function parseData(raw: unknown): Record<string, unknown> {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return (raw as Record<string, unknown>) ?? {};
}

export async function listSubcategoryPages(): Promise<SubcategoryPageSummaryDto[]> {
  const rows = await listAllSubcategoriesWithPages();
  return rows.map((row) => ({
    categoryId: row.id,
    name: row.name,
    slug: row.slug,
    parentName: row.parent_name ?? "",
    parentSlug: row.parent_slug ?? "",
    url: `/${row.parent_slug}/${row.slug}`,
    pageId: row.page_id,
    status: row.page_id ? (row.status as "draft" | "published") : "not_started",
    updatedAt: row.updated_at,
  }));
}

async function buildDetailDto(categoryId: number, pageId: number): Promise<SubcategoryPageDetailDto> {
  const [category, page, sectionRows] = await Promise.all([
    findCategoryWithParent(categoryId),
    findPageById(pageId),
    findSectionsByPageId(pageId),
  ]);
  if (!category || !page) throw new Error("Subcategory page not found after provisioning");

  const sectionsByType = new Map(sectionRows.map((s) => [s.type, s]));
  const sections: SectionDto[] = SECTION_TYPES.map((type, index) => {
    const row = sectionsByType.get(type);
    return {
      type,
      label: type,
      enabled: row ? Boolean(row.enabled) : true,
      position: row ? row.position : index,
      data: row ? parseData(row.data) : defaultSectionData(type),
    };
  }).sort((a, b) => a.position - b.position);

  return {
    pageId: page.id,
    categoryId: category.id,
    name: category.name,
    slug: category.slug,
    parentName: category.parent_name ?? "",
    parentSlug: category.parent_slug ?? "",
    url: `/${category.parent_slug}/${category.slug}`,
    seoTitle: page.seo_title ?? "",
    seoDescription: page.seo_description ?? "",
    seoKeywords: page.seo_keywords ?? "",
    featuredImageUrl: page.featured_image_url,
    status: page.status,
    sections,
    createdAt: page.created_at,
    updatedAt: page.updated_at,
  };
}

export class SubcategoryPageError extends Error {}

export async function getPageByCategoryId(categoryId: number): Promise<SubcategoryPageDetailDto> {
  const category = await findCategoryWithParent(categoryId);
  if (!category) throw new SubcategoryPageError("Category not found");
  if (category.parent_id === null) throw new SubcategoryPageError("Only subcategories have dynamic pages");

  const pageId = await provisionPage(categoryId);
  return buildDetailDto(categoryId, pageId);
}

/** Called when a subcategory is created via the Categories module — provisions its page automatically. */
export async function provisionPageForCategory(categoryId: number): Promise<void> {
  await provisionPage(categoryId);
}

export async function updateFullPage(
  pageId: number,
  input: {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    featuredImageUrl: string | null;
    status: "draft" | "published";
    sections: { type: SectionType; enabled: boolean; position: number; data: unknown }[];
  }
): Promise<SubcategoryPageDetailDto> {
  const page = await findPageById(pageId);
  if (!page) throw new SubcategoryPageError("Page not found");

  const pageInput: UpdatePageInput = {
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    seoKeywords: input.seoKeywords,
    featuredImageUrl: input.featuredImageUrl,
    status: input.status,
  };

  const sectionInputs: UpdateSectionInput[] = input.sections.map((s) => ({
    type: s.type,
    enabled: s.enabled,
    position: s.position,
    data: validateSectionData(s.type, s.data),
  }));

  await updatePageFull(pageId, pageInput, sectionInputs);
  return buildDetailDto(page.category_id, pageId);
}
