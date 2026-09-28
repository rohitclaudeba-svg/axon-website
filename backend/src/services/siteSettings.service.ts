import { findSiteSettings, upsertSiteSettings } from "../repositories/siteSettings.repository";
import { DAYS } from "../validators/siteSettings";

export interface ListItem {
  id: string;
  text: string;
}

export interface HoursDay {
  day: (typeof DAYS)[number];
  opens: string;
  closes: string;
  closed: boolean;
}

export interface SiteSettingsDto {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: number | null;
  longitude: number | null;
  phones: ListItem[];
  emails: ListItem[];
  whatsappNumber: string;
  hours: HoursDay[];
  updatedAt: string | null;
}

function parseJson<T>(raw: unknown, fallback: T): T {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
  return raw !== null && raw !== undefined ? (raw as T) : fallback;
}

function defaultHours(): HoursDay[] {
  return DAYS.map((day) => ({ day, opens: "", closes: "", closed: true }));
}

export async function getSiteSettings(): Promise<SiteSettingsDto> {
  const row = await findSiteSettings();

  if (!row) {
    return {
      streetAddress: "",
      addressLocality: "",
      addressRegion: "",
      postalCode: "",
      addressCountry: "IN",
      latitude: null,
      longitude: null,
      phones: [],
      emails: [],
      whatsappNumber: "",
      hours: defaultHours(),
      updatedAt: null,
    };
  }

  return {
    streetAddress: row.street_address,
    addressLocality: row.address_locality,
    addressRegion: row.address_region,
    postalCode: row.postal_code,
    addressCountry: row.address_country,
    latitude: row.latitude !== null ? Number(row.latitude) : null,
    longitude: row.longitude !== null ? Number(row.longitude) : null,
    phones: parseJson(row.phones, []),
    emails: parseJson(row.emails, []),
    whatsappNumber: row.whatsapp_number ?? "",
    hours: parseJson(row.hours, defaultHours()),
    updatedAt: row.updated_at,
  };
}

export interface UpdateSiteSettingsInput {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  phones: ListItem[];
  emails: ListItem[];
  whatsappNumber: string;
  hours: HoursDay[];
}

export async function updateSiteSettings(input: UpdateSiteSettingsInput): Promise<SiteSettingsDto> {
  await upsertSiteSettings({
    streetAddress: input.streetAddress,
    addressLocality: input.addressLocality,
    addressRegion: input.addressRegion,
    postalCode: input.postalCode,
    phones: input.phones,
    emails: input.emails,
    whatsappNumber: input.whatsappNumber,
    hours: input.hours,
  });
  return getSiteSettings();
}
