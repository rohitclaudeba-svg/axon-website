import fs from "node:fs";
import path from "node:path";
import {
  findAllCareerApplications,
  findCareerApplicationById,
  insertCareerApplication,
  deleteCareerApplication,
  type CareerApplicationRow,
  type NewCareerApplication,
  type CertificateFile,
} from "../repositories/careerApplications.repository";
import { careerApplicationsDir } from "../middleware/upload";
import { notifyCareerApplication } from "../lib/mailer";

export interface CareerApplicationDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string | null;
  message: string | null;
  resumeOriginalFilename: string;
  certificateCount: number;
  // Original filenames only — files are fetched via /certificates/:index.
  certificates: { index: number; originalFilename: string }[];
  createdAt: string;
}

function parseCertificates(raw: unknown): CertificateFile[] {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return Array.isArray(raw) ? (raw as CertificateFile[]) : [];
}

function toDto(row: CareerApplicationRow): CareerApplicationDto {
  const certificates = parseCertificates(row.certificates);
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    position: row.position,
    message: row.message,
    resumeOriginalFilename: row.resume_original_filename,
    certificateCount: certificates.length,
    certificates: certificates.map((certificate, index) => ({
      index,
      originalFilename: certificate.originalFilename,
    })),
    createdAt: row.created_at,
  };
}

export async function listCareerApplications(): Promise<CareerApplicationDto[]> {
  const rows = await findAllCareerApplications();
  return rows.map(toDto);
}

export async function createCareerApplication(data: NewCareerApplication): Promise<CareerApplicationDto> {
  const id = await insertCareerApplication(data);
  const row = await findCareerApplicationById(id);
  if (!row) throw new Error("Failed to load newly created career application");
  const dto = toDto(row);
  // Resume first so it's the one kept if the attachments exceed the email size cap.
  const files = [
    { filename: row.resume_original_filename, path: path.join(careerApplicationsDir, row.resume_filename) },
    ...parseCertificates(row.certificates).map((certificate) => ({
      filename: certificate.originalFilename,
      path: path.join(careerApplicationsDir, certificate.filename),
    })),
  ];
  // Fire-and-forget so the form response isn't held up by SMTP.
  void notifyCareerApplication(dto, files);
  return dto;
}

export interface ResumeFile {
  path: string;
  originalFilename: string;
}

export async function getResumeFile(applicationId: number): Promise<ResumeFile | null> {
  const row = await findCareerApplicationById(applicationId);
  if (!row) return null;
  return { path: path.join(careerApplicationsDir, row.resume_filename), originalFilename: row.resume_original_filename };
}

export async function getCertificateFile(applicationId: number, index: number): Promise<ResumeFile | null> {
  const row = await findCareerApplicationById(applicationId);
  if (!row) return null;
  const certificates = parseCertificates(row.certificates);
  const certificate = certificates[index];
  if (!certificate) return null;
  return { path: path.join(careerApplicationsDir, certificate.filename), originalFilename: certificate.originalFilename };
}

function deleteFileQuietly(filename: string) {
  fs.promises.unlink(path.join(careerApplicationsDir, filename)).catch(() => {
    // Already gone / never existed — nothing more to do.
  });
}

export async function removeCareerApplication(id: number): Promise<boolean> {
  const row = await findCareerApplicationById(id);
  if (!row) return false;

  await deleteCareerApplication(id);

  deleteFileQuietly(row.resume_filename);
  for (const certificate of parseCertificates(row.certificates)) {
    deleteFileQuietly(certificate.filename);
  }

  return true;
}
