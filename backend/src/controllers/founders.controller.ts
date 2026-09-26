import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import { listFounders, getFounder, createFounder, editFounder, removeFounder } from "../services/founders.service";
import { createFounderSchema, updateFounderSchema } from "../validators/founders";

export async function listFoundersHandler(_req: AuthedRequest, res: Response) {
  const items = await listFounders();
  res.json({ ok: true, data: items });
}

export async function getFounderHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid founder id" });
  }

  const item = await getFounder(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Founder not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createFounderHandler(req: AuthedRequest, res: Response) {
  const parsed = createFounderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }
  if (!req.file) {
    return res.status(422).json({ ok: false, error: "Please attach a photo." });
  }

  const item = await createFounder({
    name: parsed.data.name,
    credentials: parsed.data.credentials,
    role: parsed.data.role,
    bio: parsed.data.bio,
    photoFilename: req.file.filename,
    photoOriginalFilename: req.file.originalname,
  });
  res.status(201).json({ ok: true, data: item });
}

export async function updateFounderHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid founder id" });
  }

  const parsed = updateFounderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await editFounder(id, {
    name: parsed.data.name,
    credentials: parsed.data.credentials,
    role: parsed.data.role,
    bio: parsed.data.bio,
    photoFilename: req.file?.filename,
    photoOriginalFilename: req.file?.originalname,
  });
  if (!item) {
    return res.status(404).json({ ok: false, error: "Founder not found" });
  }
  res.json({ ok: true, data: item });
}

export async function deleteFounderHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid founder id" });
  }

  const removed = await removeFounder(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Founder not found" });
  }

  res.json({ ok: true });
}
