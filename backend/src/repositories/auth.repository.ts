import { pool } from "../config/db";
import type { RowDataPacket } from "mysql2";

export interface AdminUserRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
}

export async function findAdminByEmail(email: string): Promise<AdminUserRow | null> {
  const [rows] = await pool.query<AdminUserRow[]>(
    "SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] ?? null;
}
