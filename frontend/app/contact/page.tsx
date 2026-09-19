import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Clock, MessageCircle, ShieldCheck } from "lucide-react";
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

const whatToExpect = [
  {
    icon: Clock,
    title: "A quick response",
    description: "Our team typically responds within 24 hours on working days.",
  },
  {
    icon: MessageCircle,
    title: "No pressure, just guidance",
    description: "We'll talk through your needs first — there's no obligation to book anything.",
  },
  {
    icon: ShieldCheck,
    title: "The right specialist",
    description: "We match you with the therapist best suited to your goals before you visit.",
  },
];

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

      <Section className="!pt-10" tone="tint">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-2">
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
              Send Us a Message
            </span>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">Have a question? Just ask.</h2>
            <p className="mt-4 text-navy/70">
              Share a few details about what you&apos;re looking for and our team will get back to you to help
              match you with the right specialists — no obligation, just a conversation.
            </p>
            <div className="mt-8 space-y-6">
              {whatToExpect.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm shadow-navy/10">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-semibold text-navy">{item.title}</p>
                    <p className="mt-1 text-sm text-navy/65">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-light-blue to-soft-green/40 p-6 shadow-xl shadow-navy/10 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-soft-green/25 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <EnquiryForm variant="appointment" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Get in Touch" title="Visit our centre or reach us directly" align="left" />
        <ContactDetails />
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQs" title="Common questions before you reach out" />
        <FaqAccordion items={faqs} />
      </Section>
    </>
  );
}
