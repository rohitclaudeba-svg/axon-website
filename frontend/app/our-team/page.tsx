import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Founders } from "@/components/sections/Founders";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Our Founders",
    description: "Meet the co-founders behind AXON Multi-Rehabilitation Centre's coordinated care.",
    path: "/our-team",
  });
}

export default function OurTeamPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Our Founders",
          description: "AXON's co-founders.",
          path: "/our-team",
        })}
      />
      <PageHero
        eyebrow="Our Founders"
        title="Built by people who care"
        description="Meet the co-founders leading AXON's coordinated, multidisciplinary care."
        breadcrumbs={[{ name: "Our Team", path: "/our-team" }]}
      />
      <Section>
        <Founders variant="detailed" />
      </Section>
      <CTASection />
    </>
  );
}
