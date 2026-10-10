import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { programs } from "@/content/programs";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { getPublishedSubcategoryPage, type HeroSectionData } from "@/lib/subcategoryPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Rehabilitation Programs",
    description:
      "AXON's coordinated rehabilitation programs for Pediatric, Neurological, Orthopedic & Musculoskeletal and Geriatric care.",
    path: "/rehabilitation",
  });
}

export default async function RehabilitationPage() {
  const page = await getPublishedSubcategoryPage("rehabilitation");
  const hero = page?.sections.find((s) => s.type === "hero" && s.enabled)?.data as HeroSectionData | undefined;

  const heroImage = hero?.imageUrl
    ? { src: hero.imageUrl, alt: "AXON Multi-Rehabilitation Centre" }
    : media.rehabilitationHeroImage;
  const heroMobileImage = hero?.mobileImageUrl
    ? { src: hero.mobileImageUrl, alt: "AXON Multi-Rehabilitation Centre" }
    : undefined;
  const heroTitle = hero?.heading?.trim() || "Coordinated care for every stage of life";
  const heroDescription =
    hero?.subtitle?.trim() ||
    "From early childhood development to healthy ageing, our programs bring the right specialities together around each individual.";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Rehabilitation Programs",
          description: "AXON's coordinated rehabilitation programs.",
          path: "/rehabilitation",
        })}
      />
      <PageHero
        eyebrow="Rehabilitation Programs"
        title={heroTitle}
        description={heroDescription}
        breadcrumbs={[{ name: "Rehabilitation Programs", path: "/rehabilitation" }]}
        image={heroImage}
        mobileImage={heroMobileImage}
        hideContent
      />
      <Section>
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <StaggerItem key={program.slug}>
              <ProgramCard program={program} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>
      <CTASection />
    </>
  );
}
