import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import { listEnquiries, getEnquiry, createEnquiry, editEnquiry, removeEnquiry } from "../services/enquiries.service";
import { createEnquirySchema, updateEnquirySchema, listEnquiriesQuerySchema } from "../validators/enquiries";

export async function listEnquiriesHandler(req: AuthedRequest, res: Response) {
  const parsedQuery = listEnquiriesQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(422).json({ ok: false, errors: parsedQuery.error.flatten().fieldErrors });
  }

  const items = await listEnquiries(parsedQuery.data);
  res.json({ ok: true, data: items });
}

export async function getEnquiryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid enquiry id" });
  }

  const item = await getEnquiry(id);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Enquiry not found" });
  }

  res.json({ ok: true, data: item });
}

export async function createEnquiryHandler(req: AuthedRequest, res: Response) {
  const parsed = createEnquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await createEnquiry(parsed.data);
  res.status(201).json({ ok: true, data: item });
}

export async function updateEnquiryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid enquiry id" });
  }

  const parsed = updateEnquirySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const item = await editEnquiry(id, parsed.data);
  if (!item) {
    return res.status(404).json({ ok: false, error: "Enquiry not found" });
  }

  res.json({ ok: true, data: item });
}

export async function deleteEnquiryHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid enquiry id" });
  }

  const removed = await removeEnquiry(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Enquiry not found" });
  }

  res.json({ ok: true });
}
