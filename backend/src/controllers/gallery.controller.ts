import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateImageGalleryItem,
  updateVideoGalleryItem,
  removeGalleryItem,
} from "../services/gallery.service";
import {
  createVideoItemSchema,
  updateVideoItemSchema,
  createImageMetaSchema,
  updateImageMetaSchema,
} from "../validators/gallery";

export async function listGalleryHandler(_req: AuthedRequest, res: Response) {
  const items = await listGalleryItems();
  res.json({ ok: true, data: items });
}

export async function getGalleryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid item id" });
  }

  const item = await getGalleryItem(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Item not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createGalleryHandler(req: AuthedRequest, res: Response) {
  const type = req.body.type;

  if (type === "video") {
    const parsed = createVideoItemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    }
    const item = await createGalleryItem(parsed.data);
    return res.status(201).json({ ok: true, data: item });
  }

  if (type === "image") {
    const parsed = createImageMetaSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    }
    if (!req.file) {
      return res.status(422).json({ ok: false, error: "Please attach an image file." });
    }
    const item = await createGalleryItem({
      type: "image",
      filename: req.file.filename,
      originalFilename: req.file.originalname,
      description: parsed.data.description,
    });
    return res.status(201).json({ ok: true, data: item });
  }

  res.status(422).json({ ok: false, error: "type must be 'image' or 'video'" });
}

export async function updateGalleryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid item id" });
  }

  const existing = await getGalleryItem(id);
  if (!existing) {
    return res.status(404).json({ ok: false, error: "Item not found" });
  }

  if (existing.type === "video") {
    const parsed = updateVideoItemSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
    }
    const item = await updateVideoGalleryItem(id, parsed.data);
    return res.json({ ok: true, data: item });
  }

  const parsed = updateImageMetaSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }
  const item = await updateImageGalleryItem(id, {
    filename: req.file?.filename,
    originalFilename: req.file?.originalname,
    description: parsed.data.description,
  });
  res.json({ ok: true, data: item });
}

export async function deleteGalleryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid item id" });
  }

  const removed = await removeGalleryItem(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Item not found" });
  }

  res.json({ ok: true });
}
