/**
 * One-off backfill: provisions a subcategory_pages row + the 7 default
 * sections for every existing subcategory that doesn't have one yet. New
 * subcategories created from now on are provisioned automatically by
 * categories.service.ts — this script only covers ones seeded before this
 * module existed. Safe to re-run — provisionPage() is idempotent.
 */
import "dotenv/config";
import { pool } from "../src/config/db";
import { provisionPage } from "../src/repositories/subcategoryPages.repository";

async function main() {
  const [rows] = await pool.query("SELECT id, name FROM categories WHERE parent_id IS NOT NULL");
  for (const row of rows as { id: number; name: string }[]) {
    await provisionPage(row.id);
    console.log(`Provisioned page for "${row.name}"`);
  }
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
