import { findAllPageVisibility, upsertPageVisibility } from "../repositories/pageVisibility.repository";

// Public pages that can be switched off as a whole from the admin panel.
export const toggleablePageKeys = ["testimonials"] as const;
export type ToggleablePageKey = (typeof toggleablePageKeys)[number];

export type PageVisibilityDto = Record<ToggleablePageKey, boolean>;

export function isToggleablePageKey(value: string): value is ToggleablePageKey {
  return (toggleablePageKeys as readonly string[]).includes(value);
}

export async function getPageVisibility(): Promise<PageVisibilityDto> {
  const rows = await findAllPageVisibility();
  const result = {} as PageVisibilityDto;
  for (const key of toggleablePageKeys) {
    const row = rows.find((r) => r.page_key === key);
    // No row yet = never toggled = published.
    result[key] = row ? Boolean(row.enabled) : true;
  }
  return result;
}

export async function setPageVisibility(key: ToggleablePageKey, enabled: boolean): Promise<PageVisibilityDto> {
  await upsertPageVisibility(key, enabled);
  return getPageVisibility();
}
