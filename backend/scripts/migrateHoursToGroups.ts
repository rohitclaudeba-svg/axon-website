/**
 * One-off migration: converts site_settings.hours from the old shape (one
 * row per individual day) to the new shape (admin-defined day-groups, e.g.
 * "Monday–Saturday" as a single entry) — collapses consecutive days that
 * already share the same opens/closes/closed into one group, so existing
 * data (and any admin-added phones/emails) is preserved exactly, just
 * reshaped. Safe to run once; running it again on already-grouped data is a
 * no-op (detects the new shape via the "days" field and skips).
 */
import "dotenv/config";
import crypto from "node:crypto";
import { pool } from "../src/config/db";

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface OldDay {
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
}

interface NewGroup {
  id: string;
  days: string[];
  opens: string;
  closes: string;
  closed: boolean;
}

function toGroups(days: OldDay[]): NewGroup[] {
  const sorted = [...days].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
  const groups: NewGroup[] = [];

  for (const d of sorted) {
    const last = groups[groups.length - 1];
    if (last && last.opens === d.opens && last.closes === d.closes && last.closed === d.closed) {
      last.days.push(d.day);
    } else {
      groups.push({ id: crypto.randomUUID(), days: [d.day], opens: d.opens, closes: d.closes, closed: d.closed });
    }
  }

  return groups;
}

async function main() {
  const [rows] = await pool.query("SELECT id, hours FROM site_settings WHERE id = 1");
  const row = (rows as { id: number; hours: unknown }[])[0];
  if (!row) {
    console.log("No site_settings row yet — nothing to migrate.");
    await pool.end();
    return;
  }

  const hours = typeof row.hours === "string" ? JSON.parse(row.hours) : row.hours;
  if (!Array.isArray(hours) || hours.length === 0) {
    console.log("No hours data — nothing to migrate.");
    await pool.end();
    return;
  }
  if ("days" in hours[0]) {
    console.log("Hours already in the new grouped shape — nothing to do.");
    await pool.end();
    return;
  }

  const groups = toGroups(hours as OldDay[]);
  await pool.query("UPDATE site_settings SET hours = ? WHERE id = 1", [JSON.stringify(groups)]);

  console.log("Migrated hours to groups:");
  console.log(JSON.stringify(groups, null, 2));
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
