import type { nap } from "@/content/nap";

/** Collapses consecutive days with the same hours into a range, e.g. "Monday – Saturday". */
export function groupHours(hours: typeof nap.hours) {
  const groups: { label: string; time: string }[] = [];
  for (const { day, time } of hours) {
    const last = groups[groups.length - 1];
    if (last && last.time === time) {
      const [firstDay] = last.label.split(" – ");
      last.label = `${firstDay} – ${day}`;
    } else {
      groups.push({ label: day, time });
    }
  }
  return groups;
}
