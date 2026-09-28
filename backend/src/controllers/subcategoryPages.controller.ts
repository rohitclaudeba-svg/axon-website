import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listSubcategoryPages,
  listParentCategoryPages,
  getPageByCategoryId,
  updateFullPage,
  getPublishedPageBySlug,
  SubcategoryPageError,
} from "../services/subcategoryPages.service";
import { updateSubcategoryPageSchema } from "../validators/subcategoryPages";
import { env } from "../config/env";

export async function listSubcategoryPagesHandler(_req: AuthedRequest, res: Response) {
  const items = await listSubcategoryPages();
  res.json({ ok: true, data: items });
}

export async function listParentCategoryPagesHandler(_req: AuthedRequest, res: Response) {
  const items = await listParentCategoryPages();
  res.json({ ok: true, data: items });
}

export async function getSubcategoryPageHandler(req: AuthedRequest, res: Response) {
  const categoryId = Number(req.params.categoryId);
  if (!Number.isInteger(categoryId)) {
    return res.status(400).json({ ok: false, error: "Invalid category id" });
  }

  try {
    const page = await getPageByCategoryId(categoryId);
    res.json({ ok: true, data: page });
  } catch (err) {
    if (err instanceof SubcategoryPageError) {
      return res.status(404).json({ ok: false, error: err.message });
    }
    throw err;
  }
}

export async function updateSubcategoryPageHandler(req: AuthedRequest, res: Response) {
  const pageId = Number(req.params.id);
  if (!Number.isInteger(pageId)) {
    return res.status(400).json({ ok: false, error: "Invalid page id" });
  }

  const parsed = updateSubcategoryPageSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const page = await updateFullPage(pageId, parsed.data);
    res.json({ ok: true, data: page });
  } catch (err) {
    if (err instanceof SubcategoryPageError) {
      return res.status(404).json({ ok: false, error: err.message });
    }
    throw err;
  }
}

export async function getPublicSubcategoryPageHandler(req: AuthedRequest, res: Response) {
  const slug = req.params.slug;
  const page = await getPublishedPageBySlug(slug);
  if (!page) {
    return res.status(404).json({ ok: false, error: "Page not found" });
  }
  res.json({ ok: true, data: page });
}

export async function uploadSubcategoryPageImageHandler(req: AuthedRequest, res: Response) {
  if (!req.file) {
    return res.status(422).json({ ok: false, error: "Please attach an image file." });
  }
  const url = `${env.PUBLIC_API_URL}/uploads/subcategory-pages/${req.file.filename}`;
  res.status(201).json({ ok: true, data: { url } });
}
