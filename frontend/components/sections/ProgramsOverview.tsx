"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, HeartHandshake, Sparkle, Target, TrendingUp, Users } from "lucide-react";
import { Icon } from "@/lib/icons";
import { media } from "@/content/media";
import { cn } from "@/lib/cn";
import type { ProgramEntry } from "@/content/types";

const featureIcons = [Target, Users, TrendingUp, HeartHandshake];

export function ProgramsOverview({ programs }: { programs: ProgramEntry[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const program = programs[active];
  const image = media.programImages[program.slug as keyof typeof media.programImages];
  const features = program.supportAreas.slice(0, 4);
  const topRef = useRef<HTMLDivElement>(null);

  const goToProgram = (direction: 1 | -1) => {
    setActive((current) => (current + direction + programs.length) % programs.length);
    topRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-20 grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr] lg:gap-8">
      <div
        className="sticky top-[60px] z-20 grid grid-cols-2 gap-2.5 rounded-2xl bg-off-white/95 py-2 backdrop-blur-sm sm:top-[64px] lg:static lg:z-auto lg:flex lg:flex-col lg:gap-3 lg:self-start lg:bg-transparent lg:py-0 lg:backdrop-blur-0"
        role="tablist"
        aria-label="Rehabilitation programs"
      >
        {programs.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className={cn(
                "flex items-center gap-2.5 rounded-2xl border p-3 text-left font-heading text-xs font-semibold shadow-sm transition-all duration-300 sm:text-sm lg:w-full lg:gap-3.5 lg:p-4 lg:text-sm",
                isActive
                  ? "border-primary bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/25"
                  : "border-navy/8 bg-white shadow-navy/5 hover:border-primary/25 hover:shadow-md hover:shadow-navy/8"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 lg:h-11 lg:w-11",
                  isActive ? "bg-white text-primary" : "bg-light-blue text-primary"
                )}
              >
                <Icon name={item.icon} className="h-4 w-4 lg:h-5 lg:w-5" />
              </span>
              <span className={cn("flex-1 leading-snug", isActive ? "text-white" : "text-navy/70")}>{item.name}</span>
              <ChevronRight
                className={cn(
                  "hidden h-4 w-4 shrink-0 transition-transform duration-300 lg:block",
                  isActive ? "translate-x-0.5 text-white" : "text-navy/30"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={program.slug}
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-9 rounded-3xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5 sm:p-9 lg:grid-cols-[1fr_1.25fr_0.9fr] lg:gap-10 lg:min-h-[540px]"
        >
          <div className="relative h-56 overflow-hidden rounded-2xl sm:h-64 lg:h-full lg:min-h-[320px]">
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 100vw"
                className="object-cover"
              />
            )}
          </div>

          <div>
            <span className="font-heading text-xs font-semibold uppercase tracking-wide text-teal">
              Rehabilitation Program
            </span>
            <h3 className="mt-2.5 font-heading text-2xl font-bold text-navy">{program.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-navy/65">{program.whatItIs}</p>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              {features.map((feature, index) => {
                const FeatureIcon = featureIcons[index % featureIcons.length];
                return (
                  <div key={feature.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-light-blue text-primary">
                      <FeatureIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block font-heading text-sm font-semibold text-navy">{feature.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-navy/55">{feature.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-light-blue/60 p-6 sm:p-7">
            <h4 className="font-heading text-base font-bold text-navy">Who Can Benefit?</h4>
            <ul className="mt-4 space-y-3.5">
              {program.whoMayBenefit.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy/70">
                  <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/rehabilitation/${program.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
            >
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 lg:col-start-2">
        <button
          type="button"
          onClick={() => goToProgram(-1)}
          aria-label="Previous program"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy/60 shadow-sm transition-colors duration-200 hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <span className="font-heading text-xs font-semibold text-navy/50">
          {active + 1} / {programs.length}
        </span>

        <button
          type="button"
          onClick={() => goToProgram(1)}
          aria-label="Next program"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/15 bg-white text-navy/60 shadow-sm transition-colors duration-200 hover:border-primary/40 hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
