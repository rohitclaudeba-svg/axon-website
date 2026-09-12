"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Raw IntersectionObserver-backed `useInView` can flap true/false several
 * times a frame when scrolling stalls right on the trigger boundary — that
 * flapping is what shows up as "flickering" text. Debouncing the boolean by
 * a small delay collapses that noise into one clean state change, while
 * still replaying the animation every time the element actually enters or
 * leaves the viewport (scrolling down AND back up).
 */
export function useStableInView<T extends HTMLElement>(margin: string, amount: number) {
  const ref = useRef<T>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawInView = useInView(ref, { margin: margin as any, amount });
  const [stableInView, setStableInView] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStableInView(rawInView), 120);
    return () => clearTimeout(timeout);
  }, [rawInView]);

  return { ref, inView: stableInView };
}

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
  const { ref, inView } = useStableInView<HTMLDivElement>("-40px", 0.2);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useStableInView<HTMLDivElement>("-40px", 0.2);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
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
