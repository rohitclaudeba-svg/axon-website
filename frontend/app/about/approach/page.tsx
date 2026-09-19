import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Our Approach",
    description: "How AXON builds a coordinated, personalised rehabilitation plan for every individual.",
    path: "/about/approach",
  });
}

export default function ApproachPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Our Approach",
          description: "AXON's approach to multidisciplinary rehabilitation.",
          path: "/about/approach",
        })}
      />
      <PageHero
        eyebrow="Our Approach"
        title="Personalised, multidisciplinary and progress-driven"
        description="Every plan at AXON starts with the individual — not a fixed program."
        breadcrumbs={[
          { name: "About", path: "/about" },
          { name: "Our Approach", path: "/about/approach" },
        ]}
        image={media.approachImage}
      />

      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-lg text-navy/70">
            We start by understanding the whole person — their needs, goals and circumstances —
            before recommending a plan. Where more than one speciality is relevant, our therapists
            coordinate directly so care stays consistent, rather than leaving families to connect
            the dots between separate providers.
          </p>
        </Reveal>
      </Section>

      <HowWeWork />
      <CTASection />
    </>
  );
}
