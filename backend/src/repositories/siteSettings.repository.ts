import { pool } from "../config/db";
import type { RowDataPacket } from "mysql2";

export interface SiteSettingsRow extends RowDataPacket {
  id: number;
  street_address: string;
  address_locality: string;
  address_region: string;
  postal_code: string;
  address_country: string;
  latitude: string | null;
  longitude: string | null;
  phones: unknown; // mysql2 auto-parses JSON columns
  emails: unknown;
  whatsapp_number: string | null;
  hours: unknown;
  updated_at: string;
}

export async function findSiteSettings(): Promise<SiteSettingsRow | null> {
  const [rows] = await pool.query<SiteSettingsRow[]>("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
  return rows[0] ?? null;
}

export interface UpdateSiteSettings {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  phones: unknown;
  emails: unknown;
  whatsappNumber: string;
  hours: unknown;
}

export async function upsertSiteSettings(data: UpdateSiteSettings): Promise<void> {
  await pool.query(
    `INSERT INTO site_settings (id, street_address, address_locality, address_region, postal_code, phones, emails, whatsapp_number, hours)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       street_address = VALUES(street_address),
       address_locality = VALUES(address_locality),
       address_region = VALUES(address_region),
       postal_code = VALUES(postal_code),
       phones = VALUES(phones),
       emails = VALUES(emails),
       whatsapp_number = VALUES(whatsapp_number),
       hours = VALUES(hours)`,
    [
      data.streetAddress,
      data.addressLocality,
      data.addressRegion,
      data.postalCode,
      JSON.stringify(data.phones),
      JSON.stringify(data.emails),
      data.whatsappNumber || null,
      JSON.stringify(data.hours),
    ]
  );
}
