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
  const image = media.conditionGroupImages[group.slug as keyof typeof media.conditionGroupImages];

  if (!detailed) {
    return (
      <div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {conditionGroups.map((item) => {
            const cardImage = media.conditionGroupImages[item.slug as keyof typeof media.conditionGroupImages];
            const displayItems = item.items
              .filter((conditionItem) => conditionItem.title !== "Dementia/Alzheimer's-related rehabilitation")
              .slice(0, 6);
            return (
              <div key={item.slug} className="relative flex h-full flex-col rounded-3xl border border-navy/8 bg-white pt-6 shadow-sm shadow-navy/5">
                <span className="absolute left-6 top-0 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border-4 border-white bg-primary text-white shadow-md shadow-primary/20">
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>

                <div className="relative mx-4 h-32 overflow-hidden rounded-2xl sm:h-36">
                  {cardImage && (
                    <Image
                      src={cardImage.src}
                      alt={cardImage.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-navy/65">{item.description}</p>
                  <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                    {displayItems.map((conditionItem) => (
                      <span
                        key={conditionItem.title}
                        className="rounded-full bg-light-blue px-3 py-1.5 text-xs font-medium text-primary"
                      >
                        {conditionItem.title}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/conditions"
                    className="group mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {linkToFullPage && (
          <div className="mt-10 text-center">
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
            className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch"
          >
            <div className="relative h-64 sm:h-80 lg:col-span-2 lg:h-auto">
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:col-span-3">
              <h3 className="font-heading text-2xl font-bold text-navy">{group.title}</h3>
              <p className="mt-3 text-lg text-navy/70">{group.description}</p>
              <div className="mt-7">
                <SupportAreaCarousel areas={group.items} />
              </div>
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
