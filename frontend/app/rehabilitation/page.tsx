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

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Rehabilitation Programs",
    description:
      "AXON's coordinated rehabilitation programs for Pediatric, Neurological, Orthopedic & Musculoskeletal and Geriatric care.",
    path: "/rehabilitation",
  });
}

export default function RehabilitationPage() {
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
        title="Coordinated care for every stage of life"
        description="From early childhood development to healthy ageing, our programs bring the right specialities together around each individual."
        breadcrumbs={[{ name: "Rehabilitation Programs", path: "/rehabilitation" }]}
        image={media.rehabilitationHeroImage}
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
