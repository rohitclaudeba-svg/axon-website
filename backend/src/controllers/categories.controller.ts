import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listCategoryTree,
  getCategory,
  createCategory,
  editCategory,
  removeCategory,
  CategoryError,
} from "../services/categories.service";
import { createCategorySchema, updateCategorySchema } from "../validators/categories";

export async function listCategoriesHandler(_req: AuthedRequest, res: Response) {
  const tree = await listCategoryTree();
  res.json({ ok: true, data: tree });
}

export async function getCategoryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid category id" });
  }

  const item = await getCategory(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Category not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createCategoryHandler(req: AuthedRequest, res: Response) {
  const parsed = createCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const item = await createCategory(parsed.data);
    res.status(201).json({ ok: true, data: item });
  } catch (err) {
    if (err instanceof CategoryError) {
      return res.status(422).json({ ok: false, error: err.message });
    }
    throw err;
  }
}

export async function updateCategoryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid category id" });
  }

  const parsed = updateCategorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  try {
    const item = await editCategory(id, parsed.data);
    if (!item) {
      return res.status(404).json({ ok: false, error: "Category not found" });
    }
    res.json({ ok: true, data: item });
  } catch (err) {
    if (err instanceof CategoryError) {
      return res.status(422).json({ ok: false, error: err.message });
    }
    throw err;
  }
}

export async function deleteCategoryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid category id" });
  }

  try {
    const removed = await removeCategory(id);
    if (!removed) {
      return res.status(404).json({ ok: false, error: "Category not found" });
    }
    res.json({ ok: true });
  } catch (err) {
    if (err instanceof CategoryError) {
      return res.status(422).json({ ok: false, error: err.message });
    }
    throw err;
  }
}
