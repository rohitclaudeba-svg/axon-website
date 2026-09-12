import type { Metadata } from "next";
import Image from "next/image";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { nap } from "@/content/nap";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Book an Appointment",
    description: "Book an appointment at AXON Multi-Rehabilitation Centre — our team will help match you with the right specialists.",
    path: "/book-appointment",
  });
}

export default function BookAppointmentPage() {
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
        <Reveal className="-mt-2 mb-8 text-center">
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
            Book an Appointment
          </span>
          <h1 className="text-3xl font-bold text-navy sm:text-4xl">Let&apos;s build your personalised plan</h1>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15 sm:aspect-[16/10] lg:aspect-auto lg:h-[560px]">
              <Image
                src={media.heroImage.src}
                alt={media.heroImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  {nap.brandName}
                </span>
                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{nap.tagline}</h2>
                <p className="mt-3 text-white/80">
                  Our team will match you with the right specialists and confirm a time that works for you.
                </p>
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
