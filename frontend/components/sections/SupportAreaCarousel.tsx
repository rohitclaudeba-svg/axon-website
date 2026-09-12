"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { SupportArea } from "@/content/types";

const PER_PAGE = 4;
const AUTO_ADVANCE_MS = 5000;

export function SupportAreaCarousel({ areas }: { areas: SupportArea[] }) {
  const pageCount = Math.ceil(areas.length / PER_PAGE);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || paused || pageCount <= 1) return;
    const timer = setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, paused, pageCount]);

  const currentAreas = areas.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative min-h-[280px] sm:min-h-[220px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={reduceMotion ? undefined : { opacity: 0, x: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {currentAreas.map((area, index) => (
              <div
                key={area.title}
                className="flex h-full gap-4 rounded-2xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light-blue font-heading text-sm font-semibold text-primary">
                  {String(page * PER_PAGE + index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-navy">{area.title}</h3>
                  <p className="mt-1.5 text-sm text-navy/65">{area.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pageCount > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Areas of support pages">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === page}
              aria-label={`Show areas of support, page ${index + 1} of ${pageCount}`}
              onClick={() => setPage(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === page ? "w-7 bg-primary" : "w-2.5 bg-navy/15 hover:bg-navy/25"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
