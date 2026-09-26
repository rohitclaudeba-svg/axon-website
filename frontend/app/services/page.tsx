import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Services",
    description:
      "AXON's therapy services — Speech Therapy, Occupational Therapy, Physiotherapy, Special Education and more, all under one roof.",
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Services",
          description: "AXON's therapy services.",
          path: "/services",
        })}
      />
      <PageHero
        eyebrow="Services"
        title="Therapy services under one roof"
        description="One coordinated team across speech, movement, learning and behaviour — built around each individual's goals."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        image={media.servicesHeroImage}
      />
      <Section>
        <ServiceShowcase services={services} />
      </Section>
      <CTASection />
    </>
  );
}
