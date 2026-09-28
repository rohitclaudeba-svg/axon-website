import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listCareerOpenings,
  listPublishedCareerOpenings,
  getCareerOpening,
  createCareerOpening,
  editCareerOpening,
  removeCareerOpening,
} from "../services/careerOpenings.service";
import { createCareerOpeningSchema, updateCareerOpeningSchema } from "../validators/careerOpenings";

export async function listPublicCareerOpeningsHandler(_req: AuthedRequest, res: Response) {
  const items = await listPublishedCareerOpenings();
  res.json({ ok: true, data: items });
}

export async function listCareerOpeningsHandler(_req: AuthedRequest, res: Response) {
  const items = await listCareerOpenings();
  res.json({ ok: true, data: items });
}

export async function getCareerOpeningHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid opening id" });
  }

  const item = await getCareerOpening(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Opening not found" });
  }
  res.json({ ok: true, data: item });
}

export async function createCareerOpeningHandler(req: AuthedRequest, res: Response) {
  const parsed = createCareerOpeningSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await createCareerOpening(parsed.data);
  res.status(201).json({ ok: true, data: item });
}

export async function updateCareerOpeningHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid opening id" });
  }

  const parsed = updateCareerOpeningSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await editCareerOpening(id, parsed.data);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Opening not found" });
  }
  res.json({ ok: true, data: item });
}

export async function deleteCareerOpeningHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid opening id" });
  }

  const removed = await removeCareerOpening(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Opening not found" });
  }
  res.json({ ok: true });
}
