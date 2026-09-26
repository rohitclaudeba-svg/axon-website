/**
 * One-off migration: copies the 3 real YouTube Shorts that used to be
 * hardcoded in frontend/content/videoTestimonials.ts into the
 * video_testimonials table, so they become fully admin-managed. Safe to
 * re-run — skips videos already present by youtube_id.
 */
import "dotenv/config";
import { pool } from "../src/config/db";

const realVideos = [
  { youtubeId: "dlNfJAWnu40", title: "Benefits of Group Therapy — Grow Together, Learn Together" },
  { youtubeId: "IvWCj9JjYrY", title: "AXON Client Testimonial" },
  { youtubeId: "62fGnl85c14", title: "Tunnel Walks Combined with Sensory Mats" },
];

async function main() {
  const [existingRows] = await pool.query("SELECT youtube_id FROM video_testimonials");
  const alreadySeeded = new Set((existingRows as { youtube_id: string }[]).map((r) => r.youtube_id));

  const [positionRows] = await pool.query(
    "SELECT COALESCE(MAX(position), -1) + 1 AS position FROM video_testimonials"
  );
  let nextPosition = (positionRows as { position: number }[])[0].position;

  for (const video of realVideos) {
    if (alreadySeeded.has(video.youtubeId)) {
      console.log(`Skipping ${video.youtubeId} — already seeded.`);
      continue;
    }

    await pool.query("INSERT INTO video_testimonials (youtube_id, title, position) VALUES (?, ?, ?)", [
      video.youtubeId,
      video.title,
      nextPosition,
    ]);

    console.log(`Seeded video ${video.youtubeId}`);
    nextPosition += 1;
  }

  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding existing video testimonials failed:", err);
  process.exit(1);
});
