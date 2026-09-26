import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import { listReviews, getReview, createReview, editReview, removeReview } from "../services/reviews.service";
import { reviewSchema } from "../validators/reviews";

export async function listReviewsHandler(_req: AuthedRequest, res: Response) {
  const items = await listReviews();
  res.json({ ok: true, data: items });
}

export async function getReviewHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid review id" });
  }

  const item = await getReview(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Review not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createReviewHandler(req: AuthedRequest, res: Response) {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await createReview(parsed.data);
  res.status(201).json({ ok: true, data: item });
}

export async function updateReviewHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid review id" });
  }

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await editReview(id, parsed.data);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Review not found" });
  }

  res.json({ ok: true, data: item });
}

export async function deleteReviewHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid review id" });
  }

  const removed = await removeReview(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Review not found" });
  }

  res.json({ ok: true });
}
