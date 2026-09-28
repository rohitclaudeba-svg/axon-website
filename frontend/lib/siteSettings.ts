const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export interface HoursDay {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  opens: string;
  closes: string;
  closed: boolean;
}

export interface SiteSettingsData {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: number | null;
  longitude: number | null;
  phones: { id: string; text: string }[];
  emails: { id: string; text: string }[];
  whatsappNumber: string;
  hours: HoursDay[];
}

// Real, supplied values — used only if the backend is unreachable, so the
// site never renders with blank contact info.
export const FALLBACK_SITE_SETTINGS: SiteSettingsData = {
  streetAddress: "Ground Floor, No. 33/1A, JJ Street, Hariram Nagar, V.M Nagar",
  addressLocality: "Tiruvallur",
  addressRegion: "Tamil Nadu",
  postalCode: "602001",
  addressCountry: "IN",
  latitude: 13.1341959,
  longitude: 79.9108162,
  phones: [{ id: "fallback-phone", text: "+91-94456-80838" }],
  emails: [{ id: "fallback-email", text: "axonmultirehabcentre@gmail.com" }],
  whatsappNumber: "919445680838",
  hours: [
    { day: "Monday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Tuesday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Wednesday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Thursday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Friday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Saturday", opens: "15:00", closes: "19:00", closed: false },
    { day: "Sunday", opens: "", closes: "", closed: true },
  ],
};

/**
 * Server-side fetch — used from Server Components (layout, pages). Address/
 * phone/hours change rarely, unlike admin content like gallery or page
 * sections, so this revalidates every 5 minutes (ISR) instead of no-store —
 * that keeps every page statically generated (fast) rather than forcing the
 * whole site dynamic just because the root layout reads this once for SEO.
 */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/site-settings`, { next: { revalidate: 300 } });
    if (!res.ok) return FALLBACK_SITE_SETTINGS;
    const json = (await res.json()) as { ok: boolean; data: SiteSettingsData };
    if (!json.ok || json.data.phones.length === 0) return FALLBACK_SITE_SETTINGS;
    return json.data;
  } catch {
    return FALLBACK_SITE_SETTINGS;
  }
}

function to12Hour(time: string): string {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m} ${period}`;
}

/** "15:00"/"19:00" -> "3:00 PM – 7:00 PM", or "Closed". */
export function formatHoursTime(day: HoursDay): string {
  if (day.closed || !day.opens || !day.closes) return "Closed";
  return `${to12Hour(day.opens)} – ${to12Hour(day.closes)}`;
}

/** Collapses consecutive days with the same hours into a range, e.g. "Monday – Saturday". */
export function groupHours(hours: HoursDay[]): { label: string; time: string }[] {
  const groups: { label: string; time: string }[] = [];
  for (const day of hours) {
    const time = formatHoursTime(day);
    const last = groups[groups.length - 1];
    if (last && last.time === time) {
      const [firstDay] = last.label.split(" – ");
      last.label = `${firstDay} – ${day.day}`;
    } else {
      groups.push({ label: day.day, time });
    }
  }
  return groups;
}
