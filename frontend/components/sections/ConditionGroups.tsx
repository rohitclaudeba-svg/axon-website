"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/lib/icons";
import { conditionGroups } from "@/content/conditions";
import { media } from "@/content/media";
import { SupportAreaCarousel } from "@/components/sections/SupportAreaCarousel";
import { cn } from "@/lib/cn";

const conditionImageKey: Record<string, keyof typeof media.programImages> = {
  "developmental-and-learning": "pediatric-rehabilitation",
  neurological: "neurological-rehabilitation",
  "orthopedic-and-musculoskeletal": "orthopedic-musculoskeletal-rehabilitation",
  geriatric: "geriatric-rehabilitation",
};

export function ConditionGroups({
  linkToFullPage = false,
  detailed = false,
}: {
  linkToFullPage?: boolean;
  detailed?: boolean;
}) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const group = conditionGroups[active];
  const image = media.programImages[conditionImageKey[group.slug]];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3" role="tablist" aria-label="Condition categories">
        {conditionGroups.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2.5 font-heading text-sm font-semibold transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/20"
                  : "border-navy/15 bg-white text-navy/70 hover:border-primary/40 hover:text-primary"
              )}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.title}
            </button>
          );
        })}
      </div>

      <div className="relative mt-10 overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-sm shadow-navy/5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={group.slug}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-5 lg:items-start"
          >
            <div
              className={cn(
                "relative h-64 sm:h-80 lg:col-span-2",
                detailed ? "lg:h-[380px]" : "lg:h-[300px]"
              )}
            >
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/95 text-primary shadow-sm backdrop-blur-sm">
                <Icon name={group.icon} className="h-6 w-6" />
              </div>
            </div>

            <div
              className={cn(
                "px-6 py-10 sm:px-10 lg:col-span-3",
                !detailed && "lg:flex lg:flex-col lg:justify-center lg:self-center"
              )}
            >
              <h3 className="font-heading text-2xl font-bold text-navy">{group.title}</h3>
              <p className="mt-3 text-lg text-navy/70">{group.description}</p>
              {detailed ? (
                <div className="mt-7">
                  <SupportAreaCarousel areas={group.items} />
                </div>
              ) : (
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {group.items.map((conditionItem) => (
                    <span
                      key={conditionItem.title}
                      className="rounded-full bg-light-blue px-4 py-2 text-sm font-medium text-primary"
                    >
                      {conditionItem.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {linkToFullPage && (
        <div className="mt-8 text-center">
          <Link
            href="/conditions"
            className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
          >
            View all conditions we support
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
