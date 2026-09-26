/**
 * One-off cleanup: drops tables from the original broad schema plan that no
 * backend module ever ended up using (all verified empty — 0 rows — before
 * running this). Keeps exactly the tables the live code queries:
 * admin_users, enquiries, gallery_items, testimonials, video_testimonials.
 */
import "dotenv/config";
import { pool } from "../src/config/db";

const unusedTables = [
  "career_opening_requirements",
  "career_opening_responsibilities",
  "career_openings",
  "condition_group_items",
  "condition_groups",
  "faqs",
  "media_placements",
  "media_assets",
  "program_faqs",
  "program_process_steps",
  "program_support_areas",
  "program_who_may_benefit",
  "programs",
  "service_approach_section_items",
  "service_approach_sections",
  "service_faqs",
  "service_process_steps",
  "service_support_areas",
  "service_who_may_benefit",
  "services",
  "business_hours",
  "site_settings",
  "team_member_bio_paragraphs",
  "team_members",
];

async function main() {
  await pool.query("SET FOREIGN_KEY_CHECKS = 0");
  for (const table of unusedTables) {
    await pool.query(`DROP TABLE IF EXISTS \`${table}\``);
    console.log(`Dropped ${table}`);
  }
  await pool.query("SET FOREIGN_KEY_CHECKS = 1");
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
