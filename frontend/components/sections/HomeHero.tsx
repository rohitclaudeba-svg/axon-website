"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/content/media";
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

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-navy py-20 sm:min-h-[620px] lg:min-h-[720px]">
      {reduceMotion ? (
        <Image
          src={media.heroImage.src}
          alt={media.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/video/home-hero.mp4" type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="-mt-8 max-w-2xl sm:mt-0">
          <motion.span
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 hidden rounded-full bg-white/15 px-4 py-1.5 font-heading text-sm font-semibold text-white backdrop-blur-sm sm:inline-block"
          >
            {nap.tagline}
          </motion.span>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            <motion.span
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
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

          <p className="mt-6 max-w-xl text-lg text-white/85">
            <motion.span
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
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
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 2.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button href="/book-appointment" variant="primary">
              Book an Appointment
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
