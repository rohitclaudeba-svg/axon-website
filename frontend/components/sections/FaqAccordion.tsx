"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/AnimatedReveal";

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Reveal className="mx-auto max-w-3xl divide-y divide-navy/10 rounded-2xl border border-navy/8 bg-white">
      {items.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="font-heading text-base font-semibold text-navy">{faq.question}</span>
                <ChevronDown
                  className={cn("h-5 w-5 shrink-0 text-primary transition-transform duration-300", open && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="px-5 pb-5 text-sm text-navy/70 sm:px-6">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
