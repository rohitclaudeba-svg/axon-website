/**
 * One-off migration: copies the 9 photos that used to be hardcoded in
 * frontend/public/Gallery into backend/uploads/gallery and inserts matching
 * gallery_items rows, so they become fully admin-managed (editable/deletable)
 * instead of baked into the frontend. Safe to re-run — skips files already
 * present by original filename.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pool } from "../src/config/db";
import { galleryDir } from "../src/middleware/upload";

const sourceDir = path.resolve(__dirname, "../../frontend/public/Gallery");

const photos: { file: string; description: string }[] = [
  {
    file: "gallery-1.webp",
    description: "Sensory integration and gross motor therapy room with a climbing wall, therapy swing and gym mats",
  },
  {
    file: "gallery-2.webp",
    description: "Treatment room set up with a therapy bed and electrotherapy equipment",
  },
  {
    file: "gallery-3.webp",
    description: "Signboard outside AXON Multi-Rehabilitation Centre listing our services and contact details",
  },
  {
    file: "gallery-4.webp",
    description: "Consultation room used for assessments and one-on-one sessions",
  },
  {
    file: "gallery-5.webp",
    description: "Children engaging in a play-based therapy session in our activity room",
  },
  {
    file: "gallery-6.webp",
    description: "Waiting area for families before their session",
  },
  {
    file: "gallery-7.webp",
    description: "Entrance signage directing visitors to AXON Multi-Rehabilitation Centre",
  },
  {
    file: "gallery-8.webp",
    description: "Another view of our treatment room with a therapy bed and equipment",
  },
  {
    file: "gallery-9.webp",
    description: "A wider view of our sensory gym with a climbing wall, swing, tunnel and balance beam",
  },
];

async function main() {
  fs.mkdirSync(galleryDir, { recursive: true });

  const [existingRows] = await pool.query(
    "SELECT original_filename FROM gallery_items WHERE type = 'image' AND original_filename IS NOT NULL"
  );
  const alreadySeeded = new Set((existingRows as { original_filename: string }[]).map((r) => r.original_filename));

  const [positionRows] = await pool.query("SELECT COALESCE(MAX(position), -1) + 1 AS position FROM gallery_items");
  let nextPosition = (positionRows as { position: number }[])[0].position;

  for (const photo of photos) {
    if (alreadySeeded.has(photo.file)) {
      console.log(`Skipping ${photo.file} — already seeded.`);
      continue;
    }

    const sourcePath = path.join(sourceDir, photo.file);
    const ext = path.extname(photo.file);
    const storedFilename = `${crypto.randomUUID()}${ext}`;
    const destPath = path.join(galleryDir, storedFilename);

    fs.copyFileSync(sourcePath, destPath);

    await pool.query(
      `INSERT INTO gallery_items (type, filename, original_filename, description, position)
       VALUES ('image', ?, ?, ?, ?)`,
      [storedFilename, photo.file, photo.description, nextPosition]
    );

    console.log(`Seeded ${photo.file} -> ${storedFilename}`);
    nextPosition += 1;
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding existing gallery photos failed:", err);
  process.exit(1);
});
