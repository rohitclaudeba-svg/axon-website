"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatHoursTime, type HoursDay } from "@/lib/siteSettings";

export function HoursAccordion({ hours }: { hours: HoursDay[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="hours-list"
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-3.5">
          <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold text-navy">Hours</span>
        </span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-navy/50 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <div
        id="hours-list"
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out",
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <ul className="min-h-0 divide-y divide-navy/8 pl-8">
          {hours.map((h) => (
            <li key={h.day} className="flex items-center justify-between gap-4 py-2 text-sm">
              <span className="text-navy/70">{h.day}</span>
              <span className={cn("font-medium", h.closed ? "text-navy/40" : "text-primary")}>
                {formatHoursTime(h)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
