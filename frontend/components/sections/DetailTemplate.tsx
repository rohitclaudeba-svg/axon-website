import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { SupportAreaCarousel } from "@/components/sections/SupportAreaCarousel";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/lib/icons";
import { faqPageSchema } from "@/lib/schema";
import type { ProgramEntry, ServiceEntry } from "@/content/types";

interface DetailTemplateProps {
  entry: ServiceEntry | ProgramEntry;
  eyebrow: string;
  breadcrumbs: Crumb[];
  image: { src: string; alt: string };
  relatedServices: ServiceEntry[];
  relatedPrograms: ProgramEntry[];
}

export function DetailTemplate({
  entry,
  eyebrow,
  breadcrumbs,
  image,
  relatedServices,
  relatedPrograms,
}: DetailTemplateProps) {
  // The hero uses a custom light-tint background, so every section below it
  // must alternate default/tint starting from "default" — otherwise adjacent
  // sections using the same tone (e.g. two "tint" bands in a row) blend into
  // one another with no visible boundary.
  const slots = [
    "areas",
    "whoProcess",
    ...(relatedServices.length > 0 ? ["relatedServices"] : []),
    ...(relatedPrograms.length > 0 ? ["relatedPrograms"] : []),
    ...(entry.faqs.length > 0 ? ["faq"] : []),
  ] as const;
  const toneFor = (slot: (typeof slots)[number]) => (slots.indexOf(slot) % 2 === 0 ? "default" : "tint");

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-light-blue via-light-blue to-soft-green/25 pb-16 pt-8 sm:pb-20">
        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15 lg:aspect-auto lg:h-[520px]">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 shadow-sm backdrop-blur-sm">
                  <Icon name={entry.icon} className="h-4 w-4 text-primary" />
                  <span className="font-heading text-xs font-semibold uppercase tracking-wide text-navy">
                    {eyebrow}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col lg:justify-center">
              <h1 className="text-4xl font-bold leading-tight text-navy sm:text-5xl">
                {entry.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="bg-gradient-to-r from-primary to-teal bg-clip-text text-transparent">
                  {entry.name.split(" ").slice(-1)}
                </span>
              </h1>
              <p className="mt-5 text-lg text-navy/70">{entry.heroSummary}</p>

              <div className="mt-7 rounded-2xl border border-primary/15 bg-white/80 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                  <p className="text-sm text-navy/75">{entry.whatItIs}</p>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 border-t border-navy/8 pt-4 sm:grid-cols-2">
                  {entry.supportAreas.map((area) => (
                    <li key={area.title} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="font-heading text-sm font-medium text-navy">{area.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/book-appointment" variant="primary">
                  Book an Appointment
                </Button>
                <Button href="/contact" variant="ghost">
                  Contact Us
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone={toneFor("areas")}>
        <SectionHeading eyebrow="Areas of Support" title="What this covers" />
        <SupportAreaCarousel areas={entry.supportAreas} />
      </Section>

      <Section tone={toneFor("whoProcess")}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy">Who may benefit</h2>
            <StaggerGroup className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {entry.whoMayBenefit.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex h-full items-start gap-2.5 rounded-xl border border-navy/8 bg-white p-4 shadow-sm shadow-navy/5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />
                    <span className="text-sm text-navy/75">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">What the process can involve</h2>
            <div className="relative mt-5">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-navy/10" aria-hidden="true" />
              <StaggerGroup className="space-y-5">
                {entry.processSteps.map((step, index) => (
                  <StaggerItem key={step}>
                    <div className="relative flex items-start gap-4 pl-0">
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-navy/75">{step}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </Section>

      {relatedServices.length > 0 && (
        <Section tone={toneFor("relatedServices")}>
          <SectionHeading eyebrow="Related" title="Related Services" align="left" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      )}

      {relatedPrograms.length > 0 && (
        <Section tone={toneFor("relatedPrograms")}>
          <SectionHeading eyebrow="Related" title="Related Rehabilitation Programs" align="left" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPrograms.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>
        </Section>
      )}

      {entry.faqs.length > 0 && (
        <>
          <JsonLd data={faqPageSchema(entry.faqs)} />
          <Section tone={toneFor("faq")}>
            <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
            <FaqAccordion items={entry.faqs} />
          </Section>
        </>
      )}

      <CTASection />
    </>
  );
}
