import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/cn";
import type {
  SubcategoryPageData,
  HeroSectionData,
  AboutSectionData,
  HowItHelpsSectionData,
  ApproachSectionData,
  ApproachItem,
  BenefitsSectionData,
  WhyChooseUsSectionData,
  FaqsSectionData,
} from "@/lib/subcategoryPage";

// Rich-text content is authored by an authenticated admin via the CMS's own
// editor — same trust level as any other CMS body content — so rendering the
// stored HTML directly is safe here.
const richTextClass =
  "text-lg leading-relaxed text-navy/70 [&_p]:mb-4 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold [&_strong]:text-navy";

function RichText({ html }: { html: string }) {
  if (!html) return null;
  // eslint-disable-next-line react/no-danger
  return <div className={richTextClass} dangerouslySetInnerHTML={{ __html: html }} />;
}

function DotItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
      <span className="text-lg text-navy/75">{text}</span>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <span className="text-navy/75">{text}</span>
    </div>
  );
}

function TitleDescriptionCheckItem({ item }: { item: ApproachItem }) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <p className="text-navy/75">
        <span className="font-heading font-semibold text-navy">{item.title}</span>
        {item.description && <span> — {item.description}</span>}
      </p>
    </div>
  );
}

export function DynamicDetailTemplate({ page, breadcrumbs }: { page: SubcategoryPageData; breadcrumbs: Crumb[] }) {
  const enabledSections = page.sections.filter((s) => s.enabled).sort((a, b) => a.position - b.position);
  const hero = enabledSections.find((s) => s.type === "hero");
  const contentSections = enabledSections.filter((s) => s.type !== "hero");

  const toneFor = (index: number) => (index % 2 === 0 ? "default" : "tint");

  return (
    <>
      {hero && <HeroBanner data={hero.data as HeroSectionData} name={page.name} breadcrumbs={breadcrumbs} />}

      {contentSections.map((section, index) => {
        const tone = toneFor(index);

        if (section.type === "about") {
          const data = section.data as AboutSectionData;
          return (
            <Section key={section.type} tone={tone}>
              {data.imageUrl ? (
                <div
                  className={`grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14 ${
                    data.imagePosition === "left" ? "" : ""
                  }`}
                >
                  <Reveal className={data.imagePosition === "left" ? "lg:order-2" : ""}>
                    <h2 className="text-3xl font-bold text-navy">{data.heading}</h2>
                    <div className="mt-4">
                      <RichText html={data.content} />
                    </div>
                  </Reveal>
                  <Reveal delay={0.1} className={data.imagePosition === "left" ? "lg:order-1" : ""}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15">
                      <Image src={data.imageUrl} alt={data.heading} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                  </Reveal>
                </div>
              ) : (
                <Reveal>
                  <h2 className="text-3xl font-bold text-navy">{data.heading}</h2>
                  <div className="mt-4">
                    <RichText html={data.content} />
                  </div>
                </Reveal>
              )}
            </Section>
          );
        }

        if (section.type === "how_it_helps") {
          const data = section.data as HowItHelpsSectionData;
          return (
            <Section key={section.type} tone={tone}>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
                <Reveal>
                  <h2 className="text-3xl font-bold text-navy">{data.heading}</h2>
                  <div className="mt-4">
                    <RichText html={data.content} />
                    {data.additionalContent && <RichText html={data.additionalContent} />}
                  </div>
                </Reveal>
                {data.imageUrl && (
                  <Reveal delay={0.1}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15 lg:h-full lg:aspect-auto">
                      <Image src={data.imageUrl} alt={data.heading} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                  </Reveal>
                )}
              </div>
            </Section>
          );
        }

        if (section.type === "approach") {
          const data = section.data as ApproachSectionData;
          const scrollable = data.items.length > 8;
          return (
            <Section key={section.type} tone={tone}>
              <SectionHeading eyebrow="Our Approach" title={data.heading} description={data.subtitle} align="left" />
              <StaggerGroup
                className={cn(
                  "grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2",
                  scrollable && "scroll-thin max-h-[560px] overflow-y-auto pr-3"
                )}
              >
                {data.items.map((item) => (
                  <StaggerItem key={item.id}>
                    <TitleDescriptionCheckItem item={item} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Section>
          );
        }

        if (section.type === "benefits") {
          const data = section.data as BenefitsSectionData;
          return (
            <Section key={section.type} tone={tone}>
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
                <Reveal className={data.imageUrl ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold text-navy">{data.heading}</h2>
                  {data.description && <p className="mt-3 text-navy/65">{data.description}</p>}
                  <StaggerGroup className="mt-6 space-y-3">
                    {data.items.map((item) => (
                      <StaggerItem key={item.id}>
                        <DotItem text={item.text} />
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </Reveal>
                {data.imageUrl && (
                  <Reveal delay={0.1} className="hidden lg:order-1 lg:block">
                    <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15">
                      <Image src={data.imageUrl} alt={data.heading} fill sizes="45vw" className="object-cover" />
                    </div>
                  </Reveal>
                )}
              </div>
            </Section>
          );
        }

        if (section.type === "why_choose_us") {
          const data = section.data as WhyChooseUsSectionData;
          return (
            <Section key={section.type} tone={tone}>
              <div
                className={
                  data.imageUrl ? "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-14" : undefined
                }
              >
                <Reveal>
                  <h2 className="text-3xl font-bold text-navy">{data.heading}</h2>
                  {data.description && <p className="mt-3 text-navy/65">{data.description}</p>}
                  <div className="mt-4">
                    <RichText html={data.content} />
                  </div>
                  {data.points.length > 0 && (
                    <StaggerGroup className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {data.points.map((point) => (
                        <StaggerItem key={point.id}>
                          <CheckItem text={point.text} />
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  )}
                </Reveal>
                {data.imageUrl && (
                  <Reveal delay={0.1}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15">
                      <Image src={data.imageUrl} alt={data.heading} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    </div>
                  </Reveal>
                )}
              </div>
            </Section>
          );
        }

        if (section.type === "faqs") {
          const data = section.data as FaqsSectionData;
          const items = data.items.filter((item) => item.enabled);
          if (items.length === 0) return null;
          return (
            <Section key={section.type} tone={tone}>
              <JsonLd data={faqPageSchema(items)} />
              <SectionHeading eyebrow="FAQs" title="Frequently asked questions" align="left" />
              <FaqAccordion items={items} />
            </Section>
          );
        }

        return null;
      })}

      <CTASection />
    </>
  );
}

function HeroBanner({ data, name, breadcrumbs }: { data: HeroSectionData; name: string; breadcrumbs: Crumb[] }) {
  return (
    <section className="relative isolate flex min-h-[380px] items-center overflow-hidden py-14 sm:min-h-[440px]">
      {data.imageUrl ? (
        <>
          <Image src={data.imageUrl} alt={data.heading || name} fill priority sizes="100vw" className="absolute inset-0 -z-10 object-cover" />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/35 to-black/10"
            aria-hidden="true"
          />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-primary-dark to-primary" aria-hidden="true" />
      )}

      <Container className="relative">
        <Reveal>
          <Breadcrumbs items={breadcrumbs} light />
        </Reveal>
        <Reveal delay={0.05} className="mt-6 max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{data.heading || name}</h1>
          {data.subtitle && <p className="mt-5 text-lg text-white/85">{data.subtitle}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={data.buttonUrl || "/book-appointment"} variant="primary">
              {data.buttonText || "Book an Appointment"}
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
