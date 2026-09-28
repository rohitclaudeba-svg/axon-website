// Mirrors frontend/content/types.ts's IconName union (minus "gallery" and
// "testimonials", which are page-specific, not therapy/role icons) — kept in
// sync manually since the two projects don't share a types package.
export const CAREER_OPENING_ICONS = [
  "briefcase",
  "speech",
  "occupational",
  "physiotherapy",
  "special-education",
  "behavioral-therapy",
  "social-groups",
  "school-readiness",
  "play-groups",
  "pediatric",
  "neurological",
  "orthopedic",
  "geriatric",
  "assessment",
  "plan",
  "therapy",
  "progress",
] as const;

export type CareerOpeningIcon = (typeof CAREER_OPENING_ICONS)[number];
