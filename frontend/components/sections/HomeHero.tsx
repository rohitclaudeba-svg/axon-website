"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { useStableInView } from "@/components/ui/AnimatedReveal";
import { nap } from "@/content/nap";

const heroParagraph =
  "AXON Multi-Rehabilitation Centre brings Speech Therapy, Occupational Therapy, Physiotherapy and Special Education together under one roof — with a personalised plan for every individual we support.";

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const wordDrop: Variants = {
  hidden: { opacity: 0, y: -50, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const paragraphContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.022, delayChildren: 1.6 },
  },
};

const paragraphWordDrop: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const headingWords = nap.emotionalTagline.split(" ");
  const paragraphWords = heroParagraph.split(" ");
  const { ref, inView } = useStableInView<HTMLElement>("0px", 0.3);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-light-blue via-light-blue to-soft-green/30"
    >
      <div
        className={reduceMotion ? "" : "animate-float"}
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-teal/20 blur-3xl" />
      </div>
      <div
        className={reduceMotion ? "" : "animate-float"}
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-12 py-14 sm:py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 font-heading text-sm font-semibold text-primary shadow-sm"
          >
            {nap.tagline}
          </motion.span>

          <h1 className="text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
            <motion.span
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
              variants={headingContainer}
              className="inline-block"
            >
              {headingWords.map((word, index) => (
                <motion.span key={index} variants={wordDrop} className="mr-[0.28em] inline-block last:mr-0">
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-navy/70">
            <motion.span
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : inView ? "visible" : "hidden"}
              variants={paragraphContainer}
              className="inline"
            >
              {paragraphWords.map((word, index) => (
                <motion.span key={index} variants={paragraphWordDrop} className="mr-[0.25em] inline-block last:mr-0">
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: inView ? 2.5 : 0 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="/book-appointment" variant="primary">
              Book an Appointment
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? undefined : inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: inView ? 0.15 : 0 }}
          className="relative"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
