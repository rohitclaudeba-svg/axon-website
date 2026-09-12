"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { media } from "@/content/media";
import { cn } from "@/lib/cn";
import type { ServiceEntry } from "@/content/types";

function ShowcaseRow({ service, index }: { service: ServiceEntry; index: number }) {
  const imageFirst = index % 2 === 0;
  const image = media.serviceShowcaseImages[service.slug as keyof typeof media.serviceShowcaseImages];
  const reduceMotion = useReducedMotion();

  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : -28, reduceMotion ? 0 : 28]);

  // Debounce the raw intersection signal so a scroll that stalls right on the
  // trigger boundary doesn't flap the animation state (visible "flicker").
  const rawInView = useInView(rowRef, { amount: 0.3 });
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setInView(rawInView), 120);
    return () => clearTimeout(timeout);
  }, [rawInView]);

  return (
    <div ref={rowRef} className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, x: imageFirst ? -90 : 90 }}
        animate={reduceMotion ? undefined : { opacity: inView ? 1 : 0, x: inView ? 0 : imageFirst ? -90 : 90 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={cn("relative", imageFirst ? "lg:order-1" : "lg:order-2")}
      >
        <div
          className={cn(
            "pointer-events-none absolute -z-10 h-40 w-40 rounded-full bg-soft-green/40 blur-3xl",
            imageFirst ? "-left-8 -top-8" : "-right-8 -top-8"
          )}
          aria-hidden="true"
        />
        <motion.div
          style={{ y: parallaxY }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-navy/10 lg:aspect-auto lg:h-[380px]"
        >
          {image && (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, x: imageFirst ? 90 : -90 }}
        animate={reduceMotion ? undefined : { opacity: inView ? 1 : 0, x: inView ? 0 : imageFirst ? 90 : -90 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: inView ? 0.12 : 0 }}
        className={cn("flex flex-col justify-center", imageFirst ? "lg:order-2" : "lg:order-1")}
      >
        <h3 className="text-3xl font-bold text-navy sm:text-4xl">{service.name}</h3>
        <p className="mt-4 text-lg text-navy/70">{service.heroSummary}</p>
        <ul className="mt-6 space-y-3">
          {service.whoMayBenefit.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              <span className="text-navy/75">{item}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="group mt-7 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary hover:underline"
        >
          Learn more about {service.name}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  );
}

export function ServiceShowcase({ services }: { services: ServiceEntry[] }) {
  return (
    <div className="space-y-16 lg:space-y-20">
      {services.map((service, index) => (
        <ShowcaseRow key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}
