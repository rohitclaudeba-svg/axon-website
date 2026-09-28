import type { Request, Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth";
import {
  listCareerApplications,
  createCareerApplication,
  getResumeFile,
  getCertificateFile,
  removeCareerApplication,
} from "../services/careerApplications.service";
import { createCareerApplicationSchema } from "../validators/careerApplications";

export async function listCareerApplicationsHandler(_req: AuthedRequest, res: Response) {
  const items = await listCareerApplications();
  res.json({ ok: true, data: items });
}

export async function createCareerApplicationHandler(req: Request, res: Response) {
  const parsed = createCareerApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ ok: false, errors: parsed.error.flatten().fieldErrors });
  }

  const files = req.files as { resume?: Express.Multer.File[]; certificates?: Express.Multer.File[] } | undefined;
  const resume = files?.resume?.[0];
  if (!resume) {
    return res.status(422).json({ ok: false, error: "Please attach your resume." });
  }
  const certificates = (files?.certificates ?? []).map((file) => ({
    filename: file.filename,
    originalFilename: file.originalname,
  }));

  const application = await createCareerApplication({
    ...parsed.data,
    resumeFilename: resume.filename,
    resumeOriginalFilename: resume.originalname,
    certificates,
  });
  res.status(201).json({ ok: true, data: application });
}

export async function downloadResumeHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid application id" });
  }

  const file = await getResumeFile(id);
  if (!file) {
    return res.status(404).json({ ok: false, error: "Resume not found" });
  }
  res.download(file.path, file.originalFilename, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ ok: false, error: "Resume file is missing" });
    }
  });
}

export async function downloadCertificateHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  const index = Number(req.params.index);
  if (!Number.isInteger(id) || !Number.isInteger(index)) {
    return res.status(400).json({ ok: false, error: "Invalid request" });
  }

  const file = await getCertificateFile(id, index);
  if (!file) {
    return res.status(404).json({ ok: false, error: "Certificate not found" });
  }
  res.download(file.path, file.originalFilename, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ ok: false, error: "Certificate file is missing" });
    }
  });
}

export async function deleteCareerApplicationHandler(req: AuthedRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ ok: false, error: "Invalid application id" });
  }

  const removed = await removeCareerApplication(id);
  if (!removed) {
    return res.status(404).json({ ok: false, error: "Application not found" });
  }
  res.json({ ok: true });
}
