/**
 * One-off migration: copies the dummy testimonials that used to be hardcoded
 * in frontend/content/testimonials.ts into the testimonials table, so they
 * become fully admin-managed. Safe to re-run — skips authors already present.
 */
import "dotenv/config";
import { pool } from "../src/config/db";
import { testimonials } from "../../frontend/content/testimonials";

async function main() {
  const [existingRows] = await pool.query("SELECT author FROM testimonials");
  const alreadySeeded = new Set((existingRows as { author: string }[]).map((r) => r.author));

  const [positionRows] = await pool.query("SELECT COALESCE(MAX(position), -1) + 1 AS position FROM testimonials");
  let nextPosition = (positionRows as { position: number }[])[0].position;

  for (const t of testimonials) {
    if (alreadySeeded.has(t.author)) {
      console.log(`Skipping ${t.author} — already seeded.`);
      continue;
    }

    await pool.query(
      "INSERT INTO testimonials (quote, author, context, rating, position) VALUES (?, ?, ?, ?, ?)",
      [t.quote, t.author, t.context ?? null, t.rating ?? null, nextPosition]
    );

    console.log(`Seeded testimonial from ${t.author}`);
    nextPosition += 1;
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding existing testimonials failed:", err);
  process.exit(1);
});
