/**
 * Applies every .sql file in database/migrations, in filename order, against
 * the database configured in backend/.env. Safe to re-run — every migration
 * uses CREATE TABLE IF NOT EXISTS. Run with: npm run migrate
 *
 * This is a dev convenience for applying schema changes; the .sql files
 * themselves remain the source of truth and can be reviewed/run by hand in
 * MySQL Workbench too.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

async function main() {
  const migrationsDir = path.resolve(__dirname, "../../database/migrations");
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      console.log(`Applying ${file}...`);
      await connection.query(sql);
    }
    console.log(`Done — applied ${files.length} migration file(s).`);
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
