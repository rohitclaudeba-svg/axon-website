import { Icon } from "@/lib/icons";
import { Section } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
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

export function HowWeWork() {
  return (
    <Section tone="navy">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-soft-green">
          Our Process
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Work</h2>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
        {steps.map((step, index) => (
          <StaggerItem key={step.title}>
            <div className="flex gap-5 py-8 first:pt-0 last:pb-0 lg:flex-col lg:items-center lg:px-8 lg:py-0 lg:text-center lg:first:pl-0 lg:last:pr-0">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
                <Icon name={step.icon} className="h-6 w-6" />
              </div>
              <div>
                <span className="font-heading text-xs font-semibold uppercase tracking-wide text-soft-green">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-heading text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/65">{step.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
