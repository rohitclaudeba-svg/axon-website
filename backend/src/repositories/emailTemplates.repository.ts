import { pool } from "../config/db";
import type { RowDataPacket } from "mysql2";

export interface EmailTemplateRow extends RowDataPacket {
  template_key: string;
  subject: string;
  body: string;
  enabled: number;
  updated_at: string;
}

export async function findAllEmailTemplates(): Promise<EmailTemplateRow[]> {
  const [rows] = await pool.query<EmailTemplateRow[]>("SELECT * FROM email_templates");
  return rows;
}

export async function findEmailTemplateByKey(key: string): Promise<EmailTemplateRow | null> {
  const [rows] = await pool.query<EmailTemplateRow[]>(
    "SELECT * FROM email_templates WHERE template_key = ? LIMIT 1",
    [key]
  );
  return rows[0] ?? null;
}

export interface UpsertEmailTemplate {
  subject: string;
  body: string;
  enabled: boolean;
}

export async function upsertEmailTemplate(key: string, data: UpsertEmailTemplate): Promise<void> {
  await pool.query(
    `INSERT INTO email_templates (template_key, subject, body, enabled)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       subject = VALUES(subject),
       body = VALUES(body),
       enabled = VALUES(enabled)`,
    [key, data.subject, data.body, data.enabled ? 1 : 0]
  );
}
