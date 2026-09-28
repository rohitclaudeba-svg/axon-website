import { pool } from "../config/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface CertificateFile {
  filename: string;
  originalFilename: string;
}

export interface CareerApplicationRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string | null;
  message: string | null;
  resume_filename: string;
  resume_original_filename: string;
  certificates: unknown; // mysql2 auto-parses the JSON column
  created_at: string;
  updated_at: string;
}

export async function findAllCareerApplications(): Promise<CareerApplicationRow[]> {
  const [rows] = await pool.query<CareerApplicationRow[]>(
    "SELECT * FROM career_applications ORDER BY created_at DESC, id DESC"
  );
  return rows;
}

export async function findCareerApplicationById(id: number): Promise<CareerApplicationRow | null> {
  const [rows] = await pool.query<CareerApplicationRow[]>(
    "SELECT * FROM career_applications WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export interface NewCareerApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  resumeFilename: string;
  resumeOriginalFilename: string;
  certificates: CertificateFile[];
}

export async function insertCareerApplication(data: NewCareerApplication): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO career_applications
      (name, email, phone, position, message, resume_filename, resume_original_filename, certificates)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.name,
      data.email,
      data.phone,
      data.position || null,
      data.message || null,
      data.resumeFilename,
      data.resumeOriginalFilename,
      JSON.stringify(data.certificates),
    ]
  );
  return result.insertId;
}

export async function deleteCareerApplication(id: number): Promise<void> {
  await pool.query("DELETE FROM career_applications WHERE id = ?", [id]);
}
