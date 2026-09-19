import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProgramCard } from "@/components/sections/ProgramCard";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { nap } from "@/content/nap";
import type { ApproachSection, ProgramEntry, ServiceEntry } from "@/content/types";

interface DetailImage {
  src: string;
  alt: string;
  focal?: string;
}

interface DetailTemplateProps {
  entry: ServiceEntry | ProgramEntry;
  breadcrumbs: Crumb[];
  image: DetailImage;
  contentImage?: DetailImage;
  secondaryImage?: DetailImage;
  relatedServices: ServiceEntry[];
  relatedPrograms: ProgramEntry[];
}

function CheckItem({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-navy/75">
        <span className="font-heading font-semibold text-navy">{title}</span>
        {description && <span> — {description}</span>}
      </p>
    </div>
  );
}

export function DetailTemplate({
  entry,
  breadcrumbs,
  image,
  contentImage = image,
  secondaryImage = image,
  relatedServices,
  relatedPrograms,
}: DetailTemplateProps) {
  // Every section below the plain intro hero must alternate default/tint
  // starting from "default" — otherwise adjacent sections using the same
  // tone (e.g. two "tint" bands in a row) blend into one another with no
  // visible boundary.
  const slots = [
    "whatIs",
    "howHelps",
    "approach",
    "whoBenefit",
    "whyChoose",
    ...(relatedServices.length > 0 ? ["relatedServices"] : []),
    ...(relatedPrograms.length > 0 ? ["relatedPrograms"] : []),
    ...(entry.faqs.length > 0 ? ["faq"] : []),
  ] as const;
  const toneFor = (slot: (typeof slots)[number]) => (slots.indexOf(slot) % 2 === 0 ? "default" : "tint");

  const approachSections: ApproachSection[] | undefined = "approachSections" in entry ? entry.approachSections : undefined;
  const [primaryAreas, restAreas] = approachSections && approachSections.length > 0
    ? [entry.supportAreas, []]
    : [entry.supportAreas.slice(0, 5), entry.supportAreas.slice(5)];

  return (
    <>
      <section className="relative isolate flex min-h-[380px] items-center overflow-hidden py-14 sm:min-h-[440px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          style={image.focal ? { objectPosition: image.focal } : undefined}
          className="absolute inset-0 -z-10 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/10"
          aria-hidden="true"
        />

        <Container className="relative">
          <Reveal>
            <Breadcrumbs items={breadcrumbs} light />
          </Reveal>
          <Reveal delay={0.05} className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{entry.name}</h1>
            <p className="mt-5 text-lg text-white/85">{entry.heroSummary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-appointment" variant="primary">
                Book an Appointment
              </Button>
              <Button href="/contact" variant="ghost">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section tone={toneFor("whatIs")}>
        <Reveal>
          <h2 className="text-3xl font-bold text-navy">What is {entry.name}?</h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/70">{entry.whatItIs}</p>
        </Reveal>
      </Section>

      <Section tone={toneFor("howHelps")}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <Reveal>
            <h2 className="text-3xl font-bold text-navy">How {entry.name} Helps</h2>
            <p className="mt-3 text-navy/65">Individuals we support may face:</p>
            <div className="mt-6 space-y-5">
              {primaryAreas.map((area) => (
                <CheckItem key={area.title} title={area.title} description={area.description} />
              ))}
            </div>
            <p className="mt-6 text-navy/70">
              Our {entry.name.toLowerCase()} at {nap.brandName} supports individuals in working through these
              challenges, building confidence and everyday skills.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15 lg:h-full lg:aspect-auto">
              <Image
                src={contentImage.src}
                alt={contentImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                style={contentImage.focal ? { objectPosition: contentImage.focal } : undefined}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {approachSections && approachSections.length > 0 ? (
        <Section tone={toneFor("approach")}>
          <SectionHeading eyebrow="Our Approach" title={`Our Approach to ${entry.name} at ${nap.brandName}`} align="left" />
          <div className="space-y-12">
            {approachSections.map((section) => (
              <Reveal key={section.title}>
                <h3 className="text-xl font-bold text-navy">{section.title}</h3>
                <p className="mt-2 text-navy/65">{section.intro}</p>
                <div className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
                  {section.items.map((item) => (
                    <CheckItem key={item.title} title={item.title} description={item.description} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : (
        restAreas.length > 0 && (
          <Section tone={toneFor("approach")}>
            <SectionHeading eyebrow="Our Approach" title={`Our approach to ${entry.name} at AXON`} align="left" />
            <StaggerGroup className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {restAreas.map((area) => (
                <StaggerItem key={area.title}>
                  <CheckItem title={area.title} description={area.description} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Section>
        )
      )}

      <Section tone={toneFor("whoBenefit")}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <Reveal className="lg:order-2">
            <h2 className="text-3xl font-bold text-navy">Who Can Benefit from {entry.name}?</h2>
            <StaggerGroup className="mt-6 space-y-3">
              {entry.whoMayBenefit.map((item) => (
                <StaggerItem key={item}>
                  <div className="flex items-start gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="text-lg text-navy/75">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <p className="mt-6 text-navy/70">
              Through structured, individualised therapy, we help build emotional regulation, social interaction and
              everyday behaviour, step by step.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:order-1 lg:block">
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15">
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                sizes="45vw"
                style={secondaryImage.focal ? { objectPosition: secondaryImage.focal } : undefined}
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone={toneFor("whyChoose")}>
        <Reveal>
          <h2 className="text-3xl font-bold text-navy">Why Choose {nap.brandName} for {entry.name}?</h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/70">
            Our therapists coordinate {entry.name.toLowerCase()} alongside {nap.brandName}&apos;s wider team where
            needed, so your plan stays consistent, personalised and focused on measurable progress — not delivered
            in isolation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-navy/70">
            If you&apos;re looking for {entry.name.toLowerCase()} to help build confidence and everyday independence,
            get in touch with {nap.brandName} today to take the first step.
          </p>
        </Reveal>
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
            <SectionHeading eyebrow="FAQs" title="Frequently asked questions" align="left" />
            <FaqAccordion items={entry.faqs} />
          </Section>
        </>
      )}

      <CTASection />
    </>
  );
}
