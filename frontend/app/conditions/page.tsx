import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ConditionGroups } from "@/components/sections/ConditionGroups";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Conditions We Support",
    description:
      "AXON supports a wide range of developmental, neurological, orthopedic and age-related conditions across every stage of life.",
    path: "/conditions",
  });
}

export default function ConditionsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Conditions We Support",
          description: "Conditions and areas supported by AXON Multi-Rehabilitation Centre.",
          path: "/conditions",
        })}
      />
      <PageHero
        eyebrow="Conditions We Support"
        title="Care across every stage of life"
        description="From early childhood development to healthy ageing, our team supports a wide range of conditions and concerns."
        breadcrumbs={[{ name: "Conditions We Support", path: "/conditions" }]}
        image={media.conditionsImage}
        hideContent
      />
      <Section>
        <ConditionGroups detailed />
      </Section>
      <CTASection />
    </>
  );
}
