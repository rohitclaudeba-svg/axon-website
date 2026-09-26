import type { Metadata } from "next";
import Link from "next/link";
import { HomeHero } from "@/components/sections/HomeHero";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { ProgramsOverview } from "@/components/sections/ProgramsOverview";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ConditionGroups } from "@/components/sections/ConditionGroups";
import { Founders } from "@/components/sections/Founders";
import { WhyChooseAxon } from "@/components/sections/WhyChooseAxon";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { programs } from "@/content/programs";
import { nap } from "@/content/nap";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: `${nap.brandName} | ${nap.tagline}`,
    description:
      "AXON Multi-Rehabilitation Centre offers Speech Therapy, Occupational Therapy, Physiotherapy and Special Education with personalised, multidisciplinary rehabilitation programs.",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: nap.brandName,
          description: nap.tagline,
          path: "/",
        })}
      />

      <HomeHero />

      <Section>
        <SectionHeading eyebrow="What We Offer" title="Our Services" size="lg" />
        <ServiceShowcase services={services} maxMobile={4} />
        <div className="mt-10 text-center lg:hidden">
          <Link href="/services" className="font-heading text-sm font-semibold text-primary hover:underline">
            View all services →
          </Link>
        </div>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Who We Help" title="Rehabilitation Programs" />
        <ProgramsOverview programs={programs} />
      </Section>

      <HowWeWork />

      <Section tone="tint">
        <SectionHeading eyebrow="Conditions We Support" title="Care across every stage of life" />
        <ConditionGroups linkToFullPage />
      </Section>

      <Section className="!pb-0">
        <SectionHeading eyebrow="Our Founders" title="Built by people who care" />
        <Founders variant="compact" />
        <div className="mt-10 text-center">
          <Link href="/our-team" className="font-heading text-sm font-semibold text-primary hover:underline">
            Meet our founders →
          </Link>
        </div>
      </Section>

      <WhyChooseAxon />

      <TestimonialSection />
      <CTASection />

      <Section>
        <SectionHeading eyebrow="Visit Us" title="Get in touch with AXON" />
        <ContactDetails />
      </Section>
    </>
  );
}
