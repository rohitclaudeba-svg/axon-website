import type { Metadata } from "next";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
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
      <Section className="!pt-8 sm:!pt-12">
        <SectionHeading
          eyebrow="Gallery"
          title="A look inside AXON"
          description="A look at our centre, our team and our therapy spaces."
        />
        <GalleryGrid />
      </Section>
      <CTASection />
    </>
  );
}
