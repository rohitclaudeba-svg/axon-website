import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep-green theme. Every value below points at the palette-* swatches
        // defined once in globals.css :root — change the theme by editing
        // *only* those swatches, not the names/roles here.
        //
        // The rgb(var(--x) / <alpha-value>) form (rather than a bare var())
        // is required so opacity modifiers work: text-navy/70, from-navy/95,
        // border-primary/20, etc. Tailwind substitutes <alpha-value> with the
        // requested opacity at build time; a plain var(--x) reference can't
        // be decomposed, so those modifiers would otherwise silently no-op.
        background: "rgb(var(--palette-bg) / <alpha-value>)",
        foreground: "rgb(var(--palette-deep) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--palette-forest) / <alpha-value>)", // #163832 — main CTA / brand color
          dark: "rgb(var(--palette-dark) / <alpha-value>)", // #0B2B26 — primary hover state
        },
        teal: "rgb(var(--palette-mid) / <alpha-value>)", // #235347 — secondary interactive accent
        "soft-green": "rgb(var(--palette-sage) / <alpha-value>)", // #8EB69B — soft backgrounds/badges, never white-text buttons
        navy: "rgb(var(--palette-deep) / <alpha-value>)", // #051F20 — headings / body text
        "light-blue": "rgb(var(--palette-mint) / <alpha-value>)", // #DAF1DE — tint section backgrounds
        "off-white": "rgb(var(--palette-bg) / <alpha-value>)", // #F5FAF7 — main page background
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "route-progress": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(250%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "route-progress": "route-progress 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
