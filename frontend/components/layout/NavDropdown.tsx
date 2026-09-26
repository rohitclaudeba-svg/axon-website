"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import type { IconName } from "@/content/types";

export interface NavDropdownItem {
  label: string;
  href: string;
  icon: IconName;
}

export function NavDropdown({
  label,
  href,
  items,
  active,
  light = false,
}: {
  label: string;
  href: string;
  items: NavDropdownItem[];
  active: boolean;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative flex items-center" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <Link
        href={href}
        className={cn(
          "font-heading text-sm font-medium transition-colors duration-300",
          light
            ? cn("hover:text-white", active ? "text-white" : "text-white/80")
            : cn("hover:text-primary", active ? "text-primary" : "text-navy")
        )}
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Toggle ${label} menu`}
        className={cn(
          "ml-1 flex items-center p-1 transition-colors duration-300",
          light
            ? cn("hover:text-white", active ? "text-white" : "text-white/80")
            : cn("hover:text-primary", active ? "text-primary" : "text-navy")
        )}
      >
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 mt-4 w-60 rounded-xl border border-navy/8 bg-white p-2 shadow-xl shadow-navy/15"
          >
            <span
              className="absolute -top-1.5 left-5 h-2.5 w-2.5 rotate-45 rounded-[2px] border-l border-t border-navy/8 bg-white"
              aria-hidden="true"
            />
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors duration-200 hover:bg-light-blue"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-light-blue text-primary">
                  <Icon name={item.icon} className="h-3.5 w-3.5" />
                </span>
                <span className="font-heading text-xs font-medium text-navy">{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
