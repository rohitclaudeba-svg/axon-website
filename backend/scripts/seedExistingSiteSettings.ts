/**
 * One-off migration: copies the real address/phone/email/hours/lat-long that
 * used to be hardcoded in frontend/content/nap.ts into site_settings, so it
 * becomes fully admin-managed. Safe to re-run — always overwrites with the
 * same source data (this is a singleton row, unlike the other seed scripts).
 */
import "dotenv/config";
import crypto from "node:crypto";
import { pool } from "../src/config/db";
import { nap } from "../../frontend/content/nap";

function to24Hour(time: string): { opens: string; closes: string } | null {
  // "3:00 PM – 7:00 PM" -> { opens: "15:00", closes: "19:00" }
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;

  const to24 = (h: string, m: string, ap: string) => {
    let hour = Number(h) % 12;
    if (ap.toUpperCase() === "PM") hour += 12;
    return `${String(hour).padStart(2, "0")}:${m}`;
  };

  return {
    opens: to24(match[1], match[2], match[3]),
    closes: to24(match[4], match[5], match[6]),
  };
}

async function main() {
  const days = nap.hours.map((h) => {
    const parsed = h.closed ? null : to24Hour(h.time);
    return {
      day: h.day,
      opens: parsed?.opens ?? "",
      closes: parsed?.closes ?? "",
      closed: h.closed,
    };
  });

  // Collapse consecutive days sharing the same schedule into one group —
  // matches the admin's day-group editor instead of one row per day.
  const hours: { id: string; days: string[]; opens: string; closes: string; closed: boolean }[] = [];
  for (const d of days) {
    const last = hours[hours.length - 1];
    if (last && last.opens === d.opens && last.closes === d.closes && last.closed === d.closed) {
      last.days.push(d.day);
    } else {
      hours.push({ id: crypto.randomUUID(), days: [d.day], opens: d.opens, closes: d.closes, closed: d.closed });
    }
  }

  const phones = [{ id: crypto.randomUUID(), text: nap.phone }];
  const emails = [{ id: crypto.randomUUID(), text: nap.email }];

  await pool.query(
    `INSERT INTO site_settings
      (id, street_address, address_locality, address_region, postal_code, address_country, latitude, longitude, phones, emails, whatsapp_number, hours)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       street_address = VALUES(street_address),
       address_locality = VALUES(address_locality),
       address_region = VALUES(address_region),
       postal_code = VALUES(postal_code),
       address_country = VALUES(address_country),
       latitude = VALUES(latitude),
       longitude = VALUES(longitude),
       phones = VALUES(phones),
       emails = VALUES(emails),
       whatsapp_number = VALUES(whatsapp_number),
       hours = VALUES(hours)`,
    [
      nap.streetAddress,
      nap.addressLocality,
      nap.addressRegion,
      nap.postalCode,
      nap.addressCountry,
      nap.latitude,
      nap.longitude,
      JSON.stringify(phones),
      JSON.stringify(emails),
      nap.whatsappNumber,
      JSON.stringify(hours),
    ]
  );

  console.log("Seeded site_settings from content/nap.ts.");
  console.log(JSON.stringify({ phones, emails, hours }, null, 2));
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding site settings failed:", err);
  process.exit(1);
});
