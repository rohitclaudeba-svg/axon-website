const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

/** Whole pages the admin can unpublish (Admin → Reviews / Video Testimonials). */
export interface PageVisibility {
  testimonials: boolean;
}

// If the backend is unreachable, keep every page published rather than
// hiding real content.
export const DEFAULT_PAGE_VISIBILITY: PageVisibility = { testimonials: true };

// Links to these paths are dropped from the header, footer and sitemap while
// the matching page is unpublished.
export const togglablePagePaths: Record<keyof PageVisibility, string> = {
  testimonials: "/testimonials",
};

export function hiddenPagePaths(visibility: PageVisibility): string[] {
  return (Object.keys(togglablePagePaths) as (keyof PageVisibility)[])
    .filter((key) => !visibility[key])
    .map((key) => togglablePagePaths[key]);
}

/** Fetches fresh on every request so an admin unpublish takes effect immediately. */
export async function getPageVisibility(): Promise<PageVisibility> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/page-visibility`, { cache: "no-store" });
    if (!res.ok) return DEFAULT_PAGE_VISIBILITY;
    const json = (await res.json()) as { ok: boolean; data: Partial<PageVisibility> };
    return json.ok ? { ...DEFAULT_PAGE_VISIBILITY, ...json.data } : DEFAULT_PAGE_VISIBILITY;
  } catch {
    return DEFAULT_PAGE_VISIBILITY;
  }
}
