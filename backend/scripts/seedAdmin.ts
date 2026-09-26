/**
 * Creates (or updates the password of) the single admin user from
 * ADMIN_EMAIL / ADMIN_INITIAL_PASSWORD in backend/.env. Run manually with
 * `npm run seed:admin` — never auto-run on server boot, so restarting the API
 * never silently resets credentials.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { pool } from "../src/config/db";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_INITIAL_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD in backend/.env first.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
    [email, passwordHash]
  );

  console.log(`Admin user ready: ${email}`);
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding admin failed:", err);
  process.exit(1);
});
