import { pool } from "../config/db";
import type { RowDataPacket } from "mysql2";

export interface PageVisibilityRow extends RowDataPacket {
  page_key: string;
  enabled: number;
  updated_at: string;
}

export async function findAllPageVisibility(): Promise<PageVisibilityRow[]> {
  const [rows] = await pool.query<PageVisibilityRow[]>("SELECT * FROM page_visibility");
  return rows;
}

export async function upsertPageVisibility(key: string, enabled: boolean): Promise<void> {
  await pool.query(
    `INSERT INTO page_visibility (page_key, enabled) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE enabled = VALUES(enabled)`,
    [key, enabled ? 1 : 0]
  );
}
