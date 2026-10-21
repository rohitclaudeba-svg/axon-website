import {
  findAllEnquiries,
  findEnquiryById,
  insertEnquiry,
  updateEnquiry,
  deleteEnquiry,
  type EnquiryRow,
  type EnquiryFilters,
  type CreateEnquiryData,
  type UpdateEnquiryData,
} from "../repositories/enquiries.repository";
import { notifyEnquiry } from "../lib/mailer";

export interface EnquiryDto {
  id: number;
  source: "appointment" | "contact";
  name: string;
  phone: string;
  email: string | null;
  serviceInterest: string | null;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function toDto(row: EnquiryRow): EnquiryDto {
  return {
    id: row.id,
    source: row.source,
    name: row.name,
    phone: row.phone,
    email: row.email,
    serviceInterest: row.service_interest,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listEnquiries(filters: EnquiryFilters): Promise<EnquiryDto[]> {
  const rows = await findAllEnquiries(filters);
  return rows.map(toDto);
}

export async function getEnquiry(id: number): Promise<EnquiryDto | null> {
  const row = await findEnquiryById(id);
  return row ? toDto(row) : null;
}

export async function createEnquiry(data: CreateEnquiryData): Promise<EnquiryDto> {
  const id = await insertEnquiry(data);
  const row = await findEnquiryById(id);
  if (!row) throw new Error("Failed to load newly created enquiry");
  const dto = toDto(row);
  // Fire-and-forget so the form response isn't held up by SMTP.
  void notifyEnquiry(dto);
  return dto;
}

export async function editEnquiry(id: number, data: UpdateEnquiryData): Promise<EnquiryDto | null> {
  const existing = await findEnquiryById(id);
  if (!existing) return null;

  await updateEnquiry(id, data);
  const row = await findEnquiryById(id);
  return row ? toDto(row) : null;
}

export async function removeEnquiry(id: number): Promise<boolean> {
  const existing = await findEnquiryById(id);
  if (!existing) return false;

  await deleteEnquiry(id);
  return true;
}
