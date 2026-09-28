"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { nap } from "@/content/nap";
import { FALLBACK_SITE_SETTINGS, type SiteSettingsData } from "@/lib/siteSettings";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.82 14.15c-.24.68-1.42 1.32-1.96 1.4-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36h.55c.18 0 .42-.03.65.5.24.55.81 1.9.88 2.04.07.14.12.3.02.49-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.14.14-.29.29-.13.58.17.29.75 1.24 1.62 2.02 1.12 1 2.06 1.31 2.35 1.46.29.14.46.12.63-.07.17-.19.72-.83.91-1.12.19-.29.38-.24.63-.14.26.09 1.63.77 1.9.91.28.14.46.21.53.32.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

export function FloatingContactButtons() {
  const reduceMotion = useReducedMotion();
  const [settings, setSettings] = useState<SiteSettingsData>(FALLBACK_SITE_SETTINGS);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/site-settings`)
      .then((res) => res.json())
      .then((json: { ok: boolean; data: SiteSettingsData }) => {
        if (json.ok && json.data.phones.length > 0) setSettings(json.data);
      })
      .catch(() => {
        // Backend unreachable — keep the static fallback numbers.
      });
  }, []);

  const phone = settings.phones[0]?.text ?? "";
  const whatsappHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(nap.whatsappDefaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3 sm:right-6">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-navy/25 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        {!reduceMotion && (
          <span
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60"
            aria-hidden="true"
          />
        )}
        <WhatsAppIcon className="h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 font-heading text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>

      <a
        href={`tel:${phone}`}
        aria-label="Call us"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-navy/25 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 font-heading text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
          Call Us
        </span>
      </a>
    </div>
  );
}
