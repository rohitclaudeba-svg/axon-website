import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading, type SectionTone } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

const reasons = [
  {
    title: "Multidisciplinary care under one roof",
    description: "Speech, occupational, physio and special education — coordinated, not scattered across providers.",
  },
  {
    title: "Personalised care plans",
    description: "Every plan is built around the individual's assessment, goals and progress — not a one-size-fits-all program.",
  },
  {
    title: "Experienced, collaborative therapists",
    description: "Our team works together across specialities so care stays consistent and coordinated.",
  },
  {
    title: "Support across every life stage",
    description: "From pediatric development to geriatric independence, we support individuals and families at every stage.",
  },
];

export function WhyChooseAxon({ tone = "default" }: { tone?: SectionTone }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow="Why Choose AXON" title="Care built around you, not the other way around" />
      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {reasons.map((reason) => (
          <StaggerItem key={reason.title}>
            <div className="flex h-full gap-4 rounded-2xl border border-navy/8 bg-white p-6">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-teal" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-base font-semibold text-navy">{reason.title}</h3>
                <p className="mt-1.5 text-sm text-navy/65">{reason.description}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
