import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface EnquiryRow extends RowDataPacket {
  id: number;
  source: "appointment" | "contact";
  name: string;
  phone: string;
  email: string | null;
  service_interest: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EnquiryFilters {
  source?: "appointment" | "contact";
  status?: string;
  q?: string;
  month?: string; // YYYY-MM
}

export async function findAllEnquiries(filters: EnquiryFilters): Promise<EnquiryRow[]> {
  const clauses: string[] = [];
  const params: unknown[] = [];

  if (filters.source) {
    clauses.push("source = ?");
    params.push(filters.source);
  }
  if (filters.status) {
    clauses.push("status = ?");
    params.push(filters.status);
  }
  if (filters.q) {
    clauses.push("(name LIKE ? OR phone LIKE ? OR email LIKE ?)");
    const like = `%${filters.q}%`;
    params.push(like, like, like);
  }
  if (filters.month) {
    clauses.push("DATE_FORMAT(created_at, '%Y-%m') = ?");
    params.push(filters.month);
  }

  const where = clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "";

  const [rows] = await pool.query<EnquiryRow[]>(
    `SELECT * FROM enquiries ${where} ORDER BY created_at DESC, id DESC`,
    params
  );
  return rows;
}

export async function findEnquiryById(id: number): Promise<EnquiryRow | null> {
  const [rows] = await pool.query<EnquiryRow[]>("SELECT * FROM enquiries WHERE id = ? LIMIT 1", [id]);
  return rows[0] ?? null;
}

export interface CreateEnquiryData {
  source: "appointment" | "contact";
  name: string;
  phone: string;
  email?: string | null;
  serviceInterest?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  message?: string | null;
}

export async function insertEnquiry(data: CreateEnquiryData): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO enquiries
      (source, name, phone, email, service_interest, preferred_date, preferred_time, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.source,
      data.name,
      data.phone,
      data.email || null,
      data.serviceInterest || null,
      data.preferredDate || null,
      data.preferredTime || null,
      data.message || null,
    ]
  );
  return result.insertId;
}

export interface UpdateEnquiryData {
  name: string;
  phone: string;
  email?: string | null;
  serviceInterest?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  message?: string | null;
  status: string;
}

export async function updateEnquiry(id: number, data: UpdateEnquiryData): Promise<void> {
  await pool.query(
    `UPDATE enquiries SET
      name = ?, phone = ?, email = ?, service_interest = ?, preferred_date = ?,
      preferred_time = ?, message = ?, status = ?
     WHERE id = ?`,
    [
      data.name,
      data.phone,
      data.email || null,
      data.serviceInterest || null,
      data.preferredDate || null,
      data.preferredTime || null,
      data.message || null,
      data.status,
      id,
    ]
  );
}

export async function deleteEnquiry(id: number): Promise<void> {
  await pool.query("DELETE FROM enquiries WHERE id = ?", [id]);
}
