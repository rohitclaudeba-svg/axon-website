import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Gallery",
    description: "A look inside AXON Multi-Rehabilitation Centre.",
    path: "/gallery",
  });
}

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Gallery",
          description: "Photos from AXON Multi-Rehabilitation Centre.",
          path: "/gallery",
        })}
      />
      <PageHero
        eyebrow="Gallery"
        title="A look inside AXON"
        description="Photography placeholders below will be replaced with authentic AXON clinic photography."
        breadcrumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <Section>
        <GalleryGrid />
      </Section>
      <CTASection />
    </>
  );
}
