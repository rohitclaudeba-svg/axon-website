"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * These used to gate their entrance animation behind an IntersectionObserver
 * (fading in only once scrolled into view). That observer re-fires on every
 * scroll-position recalculation near a section boundary — combined with
 * layout shifts elsewhere on the page (header height, images loading), it
 * produced a visible flicker right at section transitions, on both mobile
 * and desktop. Animating once on mount instead removes the observer
 * entirely, so there's nothing left to mis-fire.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial="hidden" animate="visible" variants={staggerContainer}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
