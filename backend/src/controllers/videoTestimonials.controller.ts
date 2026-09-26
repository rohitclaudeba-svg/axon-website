import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listVideoTestimonials,
  getVideoTestimonial,
  createVideoTestimonial,
  editVideoTestimonial,
  removeVideoTestimonial,
} from "../services/videoTestimonials.service";
import { videoTestimonialSchema } from "../validators/videoTestimonials";

export async function listVideoTestimonialsHandler(_req: AuthedRequest, res: Response) {
  const items = await listVideoTestimonials();
  res.json({ ok: true, data: items });
}

export async function getVideoTestimonialHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid video id" });
  }

  const item = await getVideoTestimonial(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Video not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createVideoTestimonialHandler(req: AuthedRequest, res: Response) {
  const parsed = videoTestimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await createVideoTestimonial(parsed.data);
  res.status(201).json({ ok: true, data: item });
}

export async function updateVideoTestimonialHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid video id" });
  }

  const parsed = videoTestimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await editVideoTestimonial(id, parsed.data);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Video not found" });
  }

  res.json({ ok: true, data: item });
}

export async function deleteVideoTestimonialHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid video id" });
  }

  const removed = await removeVideoTestimonial(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Video not found" });
  }

  res.json({ ok: true });
}
