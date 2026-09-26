import type { Metadata } from "next";
import { VideoTestimonials } from "@/components/sections/VideoTestimonials";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Testimonials",
    description: "Video and written testimonials from families and clients of AXON Multi-Rehabilitation Centre.",
    path: "/testimonials",
  });
}

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Testimonials",
          description: "Testimonials from AXON Multi-Rehabilitation Centre.",
          path: "/testimonials",
        })}
      />
      <Section className="!pt-8 sm:!pt-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="Real stories from the families we support"
          description="Hear directly from the families and clients who've worked with our team."
        />
        <VideoTestimonials />
      </Section>

      <TestimonialSection />

      <CTASection />
    </>
  );
}
