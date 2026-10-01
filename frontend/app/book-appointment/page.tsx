import type { Metadata } from "next";
import { Clock, Phone, Mail } from "lucide-react";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings, groupHours } from "@/lib/siteSettings";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Book an Appointment",
    description: "Book an appointment at AXON Multi-Rehabilitation Centre — our team will help match you with the right specialists.",
    path: "/book-appointment",
  });
}

export default async function BookAppointmentPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Book an Appointment",
          description: "Book an appointment at AXON Multi-Rehabilitation Centre.",
          path: "/book-appointment",
        })}
      />
      <Section className="!pt-6 sm:!pt-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal className="lg:pt-4">
            <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
              Appointment
            </span>
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">Let&apos;s build your personalised plan</h1>
            <p className="mt-4 text-lg text-navy/70">
              Book a session with our specialists to support your recovery, development or everyday independence.
              Choose a suitable time and let us help you get started.
            </p>

            <div className="mt-8 flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-blue text-primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Call Us</p>
                {settings.phones.map((p) => (
                  <a
                    key={p.id}
                    href={`tel:${p.text}`}
                    className="block text-navy/70 transition-colors hover:text-primary"
                  >
                    {p.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="my-6 border-t border-navy/10" aria-hidden="true" />

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-blue text-primary">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Email Us</p>
                {settings.emails.map((e) => (
                  <a
                    key={e.id}
                    href={`mailto:${e.text}`}
                    className="block text-navy/70 transition-colors hover:text-primary"
                  >
                    {e.text}
                  </a>
                ))}
              </div>
            </div>

            <div className="my-6 border-t border-navy/10" aria-hidden="true" />

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-blue text-primary">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Working Hours</p>
                {groupHours(settings.hours).map((h) => (
                  <p key={h.label} className="whitespace-nowrap text-sm text-navy/70 sm:text-base">
                    {h.label}: {h.time}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-light-blue to-soft-green/40 p-6 shadow-xl shadow-navy/10 sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-soft-green/40 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <EnquiryForm variant="appointment" />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
