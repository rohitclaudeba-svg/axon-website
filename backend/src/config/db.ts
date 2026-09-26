import mysql from "mysql2/promise";
import { env } from "./env";

export const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: "utf8mb4_unicode_ci",
  // Return DATE columns as plain "YYYY-MM-DD" strings instead of JS Date
  // objects — otherwise mysql2 applies local-timezone conversion on
  // serialization and a stored date can shift to the previous day.
  dateStrings: ["DATE"],
});

export async function checkDbConnection(): Promise<boolean> {
  const connection = await pool.getConnection();
  try {
    await connection.query("SELECT 1");
    return true;
  } finally {
    connection.release();
  }
}
