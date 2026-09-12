"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Icon } from "@/lib/icons";
import { cn } from "@/lib/cn";
import { media } from "@/content/media";
import type { IconName } from "@/content/types";

const orbitIcons: { icon: IconName; label: string; className: string; delay: string }[] = [
  { icon: "speech", label: "Speech Therapy", className: "left-4 top-6 sm:left-6 sm:top-8", delay: "0s" },
  { icon: "physiotherapy", label: "Physiotherapy", className: "right-4 top-10 sm:right-8 sm:top-12", delay: "0.6s" },
  { icon: "occupational", label: "Occupational Therapy", className: "left-6 bottom-10 sm:left-10 sm:bottom-14", delay: "1.1s" },
  { icon: "special-education", label: "Special Education", className: "right-6 bottom-6 sm:right-10 sm:bottom-10", delay: "1.6s" },
];

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-navy/5 shadow-xl shadow-navy/10">
      <Image
        src={media.heroImage.src}
        alt={media.heroImage.alt}
        fill
        priority
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/12 via-transparent to-transparent"
        aria-hidden="true"
      />

      {orbitIcons.map((item) => (
        <div
          key={item.label}
          className={cn(
            "absolute hidden items-center gap-2 rounded-xl bg-white/95 px-3 py-2.5 shadow-md shadow-navy/20 backdrop-blur-sm sm:flex",
            item.className,
            !reduceMotion && "animate-float"
          )}
          style={reduceMotion ? undefined : { animationDelay: item.delay }}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-light-blue text-primary">
            <Icon name={item.icon} className="h-4 w-4" />
          </span>
          <span className="font-heading text-xs font-semibold text-navy">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
