/**
 * One-off seed: creates the initial header-menu category structure so the
 * dynamic header has real data from day one. Matches what was previously
 * hardcoded in frontend/content/nav.ts (parents) and services.ts/programs.ts
 * (Services/Rehabilitation subcategories, real slugs matching live pages).
 * Safe to re-run — skips names already present under the same parent.
 */
import "dotenv/config";
import { pool } from "../src/config/db";

const parents = ["Home", "About Us", "Services", "Rehabilitation", "Media", "Career", "Contact"];

const subcategories: Record<string, string[]> = {
  Services: [
    "Speech Therapy",
    "Occupational Therapy",
    "Physiotherapy",
    "Special Education",
    "Behavioral Therapy",
    "Social & Communication Groups",
    "School Readiness",
    "Play Groups",
  ],
  Rehabilitation: [
    "Pediatric Rehabilitation",
    "Neurological Rehabilitation",
    "Orthopedic & Musculoskeletal Rehabilitation",
    "Geriatric Rehabilitation",
  ],
};

function slugify(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 150) || "category"
  );
}

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let suffix = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.query("SELECT id FROM categories WHERE slug = ?", [candidate]);
    if ((rows as unknown[]).length === 0) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

async function main() {
  let position = 0;
  for (const name of parents) {
    const [existing] = await pool.query("SELECT id FROM categories WHERE name = ? AND parent_id IS NULL", [name]);
    let parentId: number;

    if ((existing as { id: number }[]).length > 0) {
      parentId = (existing as { id: number }[])[0].id;
      console.log(`Skipping parent "${name}" — already exists.`);
    } else {
      const slug = await uniqueSlug(name);
      const [result] = await pool.query(
        "INSERT INTO categories (parent_id, name, slug, position) VALUES (NULL, ?, ?, ?)",
        [name, slug, position]
      );
      parentId = (result as { insertId: number }).insertId;
      console.log(`Created parent "${name}" -> ${slug}`);
    }
    position += 1;

    const children = subcategories[name] ?? [];
    let childPosition = 0;
    for (const childName of children) {
      const [existingChild] = await pool.query("SELECT id FROM categories WHERE name = ? AND parent_id = ?", [
        childName,
        parentId,
      ]);
      if ((existingChild as unknown[]).length > 0) {
        console.log(`  Skipping subcategory "${childName}" — already exists.`);
        childPosition += 1;
        continue;
      }
      const slug = await uniqueSlug(childName);
      await pool.query("INSERT INTO categories (parent_id, name, slug, position) VALUES (?, ?, ?, ?)", [
        parentId,
        childName,
        slug,
        childPosition,
      ]);
      console.log(`  Created subcategory "${childName}" -> ${slug}`);
      childPosition += 1;
    }
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding categories failed:", err);
  process.exit(1);
});
