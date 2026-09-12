import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./AnimatedReveal";

export type SectionTone = "default" | "tint" | "navy";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-off-white",
  tint: "bg-gradient-to-b from-light-blue to-soft-green/15",
  navy: "bg-gradient-to-br from-navy via-primary-dark to-primary text-white",
};

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-16 lg:py-20", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

const titleSizes = {
  default: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  size = "default",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  size?: keyof typeof titleSizes;
}) {
  return (
    <Reveal className={cn("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
          {eyebrow}
        </span>
      )}
      <h2 className={cn("font-bold", titleSizes[size], light ? "text-white" : "text-navy")}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-lg", light ? "text-white/70" : "text-navy/70")}>{description}</p>
      )}
    </Reveal>
  );
}
