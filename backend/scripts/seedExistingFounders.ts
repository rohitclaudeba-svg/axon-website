/**
 * One-off migration: copies the 2 founder photos that used to be hardcoded in
 * frontend/content/team.ts + frontend/public/team into backend/uploads/founders
 * and inserts matching founders rows, so they become fully admin-managed
 * instead of baked into the frontend. Safe to re-run — skips names already seeded.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pool } from "../src/config/db";
import { foundersDir } from "../src/middleware/upload";

const sourceDir = path.resolve(__dirname, "../../frontend/public/team");

const founders: { file: string; name: string; credentials: string; role: string; bio: string }[] = [
  {
    file: "Divya.jpeg",
    name: "D. Divya",
    credentials: "BASLP, MSc Psychology",
    role: "Founder & Consultant — Speech-Language Pathologist",
    bio: [
      "Divya D. (BASLP, MSc Psychology) is a Speech-Language Pathologist and the founder and consultant at AXON Multi-Rehabilitation Centre, Tiruvallur. She has 5+ years of experience in the field of speech, language, and communication.",
      "She has worked with 100+ paediatric and adult clients, including neurodivergent individuals and those with various speech, language, developmental, and communication needs.",
      "Divya has also conducted multiple school-readiness sessions and has interacted with and supported 100+ families throughout her professional journey.",
      "With a background in both Speech-Language Pathology and Psychology, she believes in providing personalised, child- and family-friendly care. Her focus is on helping individuals communicate better, build confidence, and participate meaningfully in everyday life.",
    ].join("\n\n"),
  },
  {
    file: "sharan.jpeg",
    name: "K. M. Sharan Kumar",
    credentials: "B.O.T., M.O.T. (Orthopaedics), (PhD)",
    role: "Founder & Consultant Occupational Therapist",
    bio: [
      "K. M. Sharan Kumar is the Founder and Consultant Occupational Therapist with over 5 years of clinical experience in paediatric and rehabilitation settings. He holds a Master's degree in Occupational Therapy (Orthopaedics) and he is certified in Behaviour Modification Techniques.",
      "He has worked with approximately 500 children with diverse developmental, neurological, behavioural, sensory, and functional needs, providing individualised and goal-oriented occupational therapy interventions.",
      "He currently serves as an Assistant Professor at Saveetha College of Occupational Therapy, SIMATS, Chennai and is pursuing his PhD in Occupational Therapy as a Research Scholar, with a focus on advancing evidence-based clinical practice.",
      "His clinical interests include Developmental Paediatrics, Neurorehabilitation, Behaviour Modification, Sensory Integration, and Functional Skill Development. His approach is child-centred, family-focused, and evidence-informed, with the goal of promoting greater independence, participation, and quality of life.",
    ].join("\n\n"),
  },
];

async function main() {
  fs.mkdirSync(foundersDir, { recursive: true });

  const [existingRows] = await pool.query("SELECT name FROM founders");
  const alreadySeeded = new Set((existingRows as { name: string }[]).map((r) => r.name));

  const [positionRows] = await pool.query("SELECT COALESCE(MAX(position), -1) + 1 AS position FROM founders");
  let nextPosition = (positionRows as { position: number }[])[0].position;

  for (const founder of founders) {
    if (alreadySeeded.has(founder.name)) {
      console.log(`Skipping ${founder.name} — already seeded.`);
      continue;
    }

    const sourcePath = path.join(sourceDir, founder.file);
    const ext = path.extname(founder.file);
    const storedFilename = `${crypto.randomUUID()}${ext}`;
    const destPath = path.join(foundersDir, storedFilename);

    fs.copyFileSync(sourcePath, destPath);

    await pool.query(
      `INSERT INTO founders (name, credentials, role, bio, photo_filename, photo_original_filename, position)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [founder.name, founder.credentials, founder.role, founder.bio, storedFilename, founder.file, nextPosition]
    );

    console.log(`Seeded ${founder.name} -> ${storedFilename}`);
    nextPosition += 1;
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding existing founders failed:", err);
  process.exit(1);
});
