/**
 * One-off migration: copies the 4 job openings that used to be hardcoded in
 * frontend/content/careers.ts into career_openings, so they become fully
 * admin-managed instead of baked into the frontend. Safe to re-run — skips
 * slugs already seeded.
 */
import "dotenv/config";
import { pool } from "../src/config/db";
import { careerOpenings } from "../../frontend/content/careers";

async function main() {
  const [positionRows] = await pool.query("SELECT COALESCE(MAX(position), -1) + 1 AS position FROM career_openings");
  let nextPosition = (positionRows as { position: number }[])[0].position;

  for (const opening of careerOpenings) {
    const [existing] = await pool.query("SELECT id FROM career_openings WHERE slug = ?", [opening.slug]);
    if ((existing as unknown[]).length > 0) {
      console.log(`Skipping "${opening.title}" — already seeded.`);
      continue;
    }

    await pool.query(
      `INSERT INTO career_openings
        (slug, title, department, icon, type, location, summary, responsibilities, requirements, enabled, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      [
        opening.slug,
        opening.title,
        opening.department,
        opening.icon,
        opening.type,
        opening.location,
        opening.summary,
        JSON.stringify(opening.responsibilities),
        JSON.stringify(opening.requirements),
        nextPosition,
      ]
    );
    console.log(`Seeded "${opening.title}".`);
    nextPosition += 1;
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding existing career openings failed:", err);
  process.exit(1);
});
