import type { Metadata } from "next";
import { FileText, HelpCircle, ClipboardCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Patient Resources",
    description: "Helpful information for individuals and families preparing for therapy and rehabilitation at AXON.",
    path: "/patient-resources",
  });
}

const resources = [
  {
    icon: ClipboardCheck,
    title: "Preparing for your first visit",
    description:
      "Bring any relevant medical records, referral letters and a list of current medications or concerns to your first appointment.",
  },
  {
    icon: FileText,
    title: "Understanding your care plan",
    description:
      "After your initial assessment, your therapist will walk you through your personalised plan, goals and expected next steps.",
  },
  {
    icon: HelpCircle,
    title: "Frequently asked questions",
    description: "Answers to common questions about our services, appointments and process.",
  },
];

export default function PatientResourcesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Patient Resources",
          description: "Resources for individuals and families at AXON.",
          path: "/patient-resources",
        })}
      />
      <PageHero
        eyebrow="Patient Resources"
        title="Helpful information for your care journey"
        breadcrumbs={[{ name: "Patient Resources", path: "/patient-resources" }]}
      />
      <Section>
        <SectionHeading title="What to know before you visit" />
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {resources.map((resource) => (
            <StaggerItem key={resource.title}>
              <div className="h-full rounded-2xl border border-navy/8 bg-white p-6">
                <resource.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-base font-semibold text-navy">{resource.title}</h3>
                <p className="mt-2 text-sm text-navy/65">{resource.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
      <CTASection />
    </>
  );
}
