import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema, webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about AXON Multi-Rehabilitation Centre's services, appointments and process.",
    path: "/faqs",
  });
}

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: "Frequently Asked Questions",
            description: "Common questions about AXON Multi-Rehabilitation Centre.",
            path: "/faqs",
          }),
          faqPageSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        breadcrumbs={[{ name: "FAQs", path: "/faqs" }]}
      />
      <Section>
        <FaqAccordion items={faqs} />
      </Section>
      <CTASection />
    </>
  );
}
