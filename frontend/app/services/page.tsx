import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
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
      />
      <Section>
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
      <CTASection />
    </>
  );
}
