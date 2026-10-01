const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

const DAY_ORDER: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** An admin-defined set of days sharing one schedule, e.g. "Monday–Saturday" — not one row per day. */
export interface HourGroup {
  id: string;
  days: DayName[];
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
  hours: HourGroup[];
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
    {
      id: "fallback-weekdays",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "15:00",
      closes: "19:00",
      closed: false,
    },
    { id: "fallback-sunday", days: ["Sunday"], opens: "", closes: "", closed: true },
  ],
};

/**
 * Server-side fetch — used from Server Components (layout, pages). Admin
 * edits here should show up immediately (same expectation as every other
 * admin-managed module in the project), so this always fetches fresh rather
 * than relying on Next's cache.
 */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/site-settings`, { cache: "no-store" });
    if (!res.ok) return FALLBACK_SITE_SETTINGS;
    const json = (await res.json()) as { ok: boolean; data: SiteSettingsData };
    if (!json.ok || json.data.phones.length === 0) return FALLBACK_SITE_SETTINGS;
    // Hours still in the pre-migration per-day shape (no `days` array) would
    // crash the layout and 500 every page — fall back rather than break the site.
    const hoursValid =
      Array.isArray(json.data.hours) && json.data.hours.every((g) => Array.isArray(g?.days));
    if (!hoursValid) return { ...json.data, hours: FALLBACK_SITE_SETTINGS.hours };
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
export function formatHoursTime(group: Pick<HourGroup, "opens" | "closes" | "closed">): string {
  if (group.closed || !group.opens || !group.closes) return "Closed";
  return `${to12Hour(group.opens)} – ${to12Hour(group.closes)}`;
}

/** "Monday" for a single day, "Monday – Saturday" for a contiguous run, or a comma list otherwise. */
export function formatDaysLabel(days: DayName[]): string {
  if (days.length === 0) return "";
  if (days.length === 1) return days[0];

  const sorted = [...days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
  const indices = sorted.map((d) => DAY_ORDER.indexOf(d));
  const isContiguous = indices.every((idx, i) => i === 0 || idx === indices[i - 1] + 1);

  return isContiguous ? `${sorted[0]} – ${sorted[sorted.length - 1]}` : sorted.join(", ");
}

/** Maps each admin-defined hour group to its display row — no more collapsing needed, groups already are the display unit. */
export function groupHours(hours: HourGroup[]): { label: string; time: string }[] {
  return hours.map((group) => ({ label: formatDaysLabel(group.days), time: formatHoursTime(group) }));
}
