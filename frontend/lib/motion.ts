import type { Variants } from "framer-motion";

/** Shared animation variants (spec §6, §24.6). Keep durations/easing consistent site-wide. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Scroll-reveal trigger — replays every time an element crosses in/out of
 * view (scrolling down AND back up), rather than firing only once. Shared
 * by Reveal/StaggerGroup/StaggerItem so every scroll animation site-wide
 * behaves consistently.
 */
export const scrollViewport = { once: false, amount: 0.2, margin: "-40px" };
