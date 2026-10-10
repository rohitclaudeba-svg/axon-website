import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WhyChooseAxon } from "@/components/sections/WhyChooseAxon";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Why Choose AXON",
    description: "What makes AXON Multi-Rehabilitation Centre's coordinated model of care different.",
    path: "/about/why-choose-axon",
  });
}

export default function WhyChooseAxonPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Why Choose AXON",
          description: "Why families choose AXON Multi-Rehabilitation Centre.",
          path: "/about/why-choose-axon",
        })}
      />
      <PageHero
        eyebrow="Why Choose AXON"
        title="A coordinated care team, not a checklist of services"
        breadcrumbs={[
          { name: "About", path: "/about" },
          { name: "Why Choose AXON", path: "/about/why-choose-axon" },
        ]}
        image={media.whyChooseImage}
        hideContent
      />
      <WhyChooseAxon />
      <CTASection />
    </>
  );
}
