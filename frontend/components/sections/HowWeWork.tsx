import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";
import type { IconName } from "@/content/types";

const steps: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Assessment",
    description: "A thorough evaluation to understand individual needs, strengths and goals.",
    icon: "assessment",
  },
  {
    title: "Personalised Plan",
    description: "A care plan built around the individual, coordinated across relevant specialities.",
    icon: "plan",
  },
  {
    title: "Therapy & Intervention",
    description: "Structured, engaging sessions delivered by experienced therapists.",
    icon: "therapy",
  },
  {
    title: "Progress Monitoring",
    description: "Ongoing review so the plan evolves as progress is made.",
    icon: "progress",
  },
];

// The connector's own box is inset by exactly one box-height (h-16) from the
// top and bottom of the column, so 0/100 here always line up with the real
// box edges no matter how much taller a sibling column's text makes the row.
const pathDown = "M0,0 C50,0 50,100 100,100";
const pathUp = "M0,100 C50,100 50,0 100,0";

export function HowWeWork() {
  return (
    <Section tone="default">
      <SectionHeading eyebrow="Our Process" title="How We Work" />

      {/* Desktop: staggered zigzag with connecting lines anchored to each box */}
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-10 lg:items-stretch">
        {steps.map((step, index) => (
          <Reveal
            key={step.title}
            className={cn("relative flex flex-col gap-6 text-left", index % 2 === 1 && "flex-col-reverse")}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-teal font-heading text-xl font-bold text-white shadow-md shadow-primary/20">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-navy/65">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="pointer-events-none absolute left-16 -right-10 top-16 bottom-16" aria-hidden="true">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full text-navy/30">
                  <path
                    d={index % 2 === 0 ? pathDown : pathUp}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="0.5 5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx="2" cy={index % 2 === 0 ? 0 : 100} r="1.8" fill="currentColor" />
                  <circle cx="98" cy={index % 2 === 0 ? 100 : 0} r="1.8" fill="currentColor" />
                </svg>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Mobile / tablet: connected vertical timeline */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-6 left-6 top-6 w-px bg-navy/12" aria-hidden="true" />
        <StaggerGroup className="space-y-8">
          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="relative flex items-start gap-5">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal font-heading text-sm font-bold text-white shadow-md shadow-primary/20">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-navy/65">{step.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
