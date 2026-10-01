import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { groupHours, type HourGroup } from "@/lib/siteSettings";

export function HoursAccordion({ hours }: { hours: HourGroup[] }) {
  return (
    <div>
      <span className="flex items-center gap-3.5">
        <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <span className="font-heading text-sm font-semibold text-navy">Hours</span>
      </span>

      <ul className="mt-3 divide-y divide-navy/8 pl-8">
        {groupHours(hours).map((h) => (
          <li key={h.label} className="flex items-center justify-between gap-4 py-2 text-sm">
            <span className="text-navy/70">{h.label}</span>
            <span className={cn("font-medium", h.time === "Closed" ? "text-navy/40" : "text-primary")}>
              {h.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
