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
import { getPublishedSubcategoryPage, type HeroSectionData } from "@/lib/subcategoryPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Services",
    description:
      "AXON's therapy services — Speech Therapy, Occupational Therapy, Physiotherapy, Special Education and more, all under one roof.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const page = await getPublishedSubcategoryPage("services");
  const hero = page?.sections.find((s) => s.type === "hero" && s.enabled)?.data as HeroSectionData | undefined;

  const heroImage = hero?.imageUrl ? { src: hero.imageUrl, alt: "AXON Multi-Rehabilitation Centre" } : media.servicesHeroImage;
  const heroMobileImage = hero?.mobileImageUrl
    ? { src: hero.mobileImageUrl, alt: "AXON Multi-Rehabilitation Centre" }
    : undefined;
  const heroTitle = hero?.heading?.trim() || "Therapy services under one roof";
  const heroDescription =
    hero?.subtitle?.trim() ||
    "One coordinated team across speech, movement, learning and behaviour — built around each individual's goals.";

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
        title={heroTitle}
        description={heroDescription}
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        image={heroImage}
        mobileImage={heroMobileImage}
        hideContent
      />
      <Section>
        <ServiceShowcase services={services} />
      </Section>
      <CTASection />
    </>
  );
}
