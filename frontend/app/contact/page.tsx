import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { QuickContactCards } from "@/components/sections/QuickContactCards";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/content/faqs";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, faqPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Contact Us",
    description: "Get in touch with AXON Multi-Rehabilitation Centre — visit us, call, or send an enquiry.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Contact Us",
          description: "Contact AXON Multi-Rehabilitation Centre.",
          path: "/contact",
        })}
      />
      <JsonLd data={faqPageSchema(faqs)} />

      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Reach out with any questions, or send an enquiry and our team will get back to you."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        image={media.contactImage}
      />

      <Section className="!pt-10">
        <QuickContactCards />
      </Section>

      <Section>
        <SectionHeading eyebrow="Get in Touch" title="Visit our centre or reach us directly" align="left" />
        <ContactDetails />
      </Section>

      <Section tone="tint">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
          <Reveal className="lg:col-span-2">
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
              Send Us a Message
            </span>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">Have a question? Just ask.</h2>
            <p className="mt-4 text-navy/70">
              Share a few details about what you&apos;re looking for and our team will get back to you to help
              match you with the right specialists — no obligation, just a conversation.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-light-blue to-soft-green/40 p-6 shadow-xl shadow-navy/10 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-soft-green/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <EnquiryForm variant="contact" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title="Common questions before you reach out" />
        <FaqAccordion items={faqs} />
      </Section>
    </>
  );
}
