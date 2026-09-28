"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Icon } from "@/lib/icons";
import { CareerApplicationForm } from "@/components/sections/CareerApplicationForm";
import { cn } from "@/lib/cn";
import type { IconName } from "@/content/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface CareerOpening {
  slug: string;
  title: string;
  department: string;
  icon: IconName;
  type: string;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

export function CareerJobBoard() {
  const [careerOpenings, setCareerOpenings] = useState<CareerOpening[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [mode, setMode] = useState<"details" | "apply">("details");
  const [step, setStep] = useState<"list" | "detail">("list");
  const reduceMotion = useReducedMotion();
  const active = careerOpenings.find((opening) => opening.slug === activeSlug) ?? careerOpenings[0];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/career-openings`)
      .then((res) => res.json())
      .then((json: { ok: boolean; data: CareerOpening[] }) => {
        if (json.ok && json.data.length > 0) {
          setCareerOpenings(json.data);
          setActiveSlug(json.data[0].slug);
        }
      })
      .catch(() => {
        // Backend unreachable — the job board just stays empty.
      });
  }, []);

  const selectOpening = (slug: string) => {
    setActiveSlug(slug);
    setMode("details");
    setStep("detail");
  };

  const backToList = () => {
    setStep("list");
  };

  if (!active) {
    return <p className="text-sm text-navy/60">No open roles right now — check back soon.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start">
      <div className={cn("flex-col gap-3 lg:col-span-2 lg:flex", step === "list" ? "flex" : "hidden")}>
        <p className="px-1 font-heading text-xs font-semibold uppercase tracking-wide text-navy/45">
          {careerOpenings.length} open roles
        </p>
        {careerOpenings.map((opening) => {
          const isActive = opening.slug === activeSlug;
          return (
            <button
              key={opening.slug}
              type="button"
              onClick={() => selectOpening(opening.slug)}
              aria-pressed={isActive}
              className={cn(
                "flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300",
                isActive
                  ? "border-primary bg-white shadow-md shadow-primary/10"
                  : "border-navy/8 bg-white/60 hover:border-primary/25 hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                  isActive ? "bg-primary text-white" : "bg-light-blue text-primary"
                )}
              >
                <Icon name={opening.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-base font-semibold text-navy">{opening.title}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-teal">{opening.department}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-navy/55">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" aria-hidden="true" />
                    {opening.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {opening.location}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "lg:sticky lg:top-28 lg:col-span-3 lg:block",
          step === "list" ? "hidden" : "block"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mode === "details" ? (
            <motion.div
              key={`details-${active.slug}`}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5 sm:p-8"
            >
              <button
                type="button"
                onClick={backToList}
                className="group mb-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-navy/60 transition-colors hover:text-primary lg:hidden"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                Back to open roles
              </button>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary">
                    <Icon name={active.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy">{active.title}</h3>
                    <p className="text-sm font-medium text-teal">{active.department}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-green/25 px-3 py-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Hiring Now
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-y border-navy/8 py-4 text-sm text-navy/65">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  {active.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {active.location}
                </span>
              </div>

              <p className="mt-5 text-navy/70">{active.summary}</p>

              <div className="mt-6">
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wide text-navy/45">
                  Responsibilities
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {active.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-navy/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-heading text-xs font-semibold uppercase tracking-wide text-navy/45">
                  Requirements
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {active.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-navy/75">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setMode("apply")}
                className="group mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-6 py-3 font-heading text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
              >
                Apply for this role
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`apply-${active.slug}`}
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5 sm:p-8"
            >
              <button
                type="button"
                onClick={() => setMode("details")}
                className="group inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-navy/60 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                Back to description
              </button>

              <div className="mt-5 flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary">
                  <Icon name={active.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold text-navy">Apply — {active.title}</h3>
                  <p className="text-sm text-navy/60">{active.department}</p>
                </div>
              </div>

              <div className="mt-6">
                <CareerApplicationForm defaultPosition={active.title} openings={careerOpenings} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
