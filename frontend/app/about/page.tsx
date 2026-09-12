import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, ClipboardList, ListChecks, Flag, TrendingUp, Users, Handshake } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ConditionGroups } from "@/components/sections/ConditionGroups";
import { WhyChooseAxon } from "@/components/sections/WhyChooseAxon";
import { CTASection } from "@/components/sections/CTASection";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { nap } from "@/content/nap";
import { services } from "@/content/services";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "About AXON",
    description:
      "Learn about AXON Multi-Rehabilitation Centre — who we are, our mission and vision, our approach to care, our specialities and who we support.",
    path: "/about",
  });
}

const approachPoints = [
  {
    icon: ClipboardList,
    title: "Individualised Assessment",
    description: "Every plan begins with a thorough assessment of each individual's needs, strengths and goals.",
  },
  {
    icon: ListChecks,
    title: "Personalised Therapy Plans",
    description: "No two plans are the same — therapy is built around the individual, not a fixed program.",
  },
  {
    icon: Flag,
    title: "Goal-Oriented Treatment",
    description: "Therapy is guided by clear, meaningful goals set together with the individual and family.",
  },
  {
    icon: TrendingUp,
    title: "Progress Monitoring",
    description: "We regularly review progress and adjust the plan as needs evolve.",
  },
  {
    icon: Users,
    title: "Family & Caregiver Involvement",
    description: "Families are involved wherever appropriate, with guidance to support progress at home.",
  },
  {
    icon: Handshake,
    title: "Collaboration Between Specialists",
    description: "Our therapists work together across specialities so care stays consistent and coordinated.",
  },
];

const aboutLinks = [
  {
    href: "/about/approach",
    title: "Our Approach",
    description: "A closer look at how we build a personalised, multidisciplinary plan for every individual.",
  },
  {
    href: "/about/why-choose-axon",
    title: "Why Choose AXON",
    description: "What makes AXON's coordinated model of care different.",
  },
  {
    href: "/our-team",
    title: "Our Team",
    description: "Meet the therapists and specialists behind AXON's care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "About AXON",
          description: "About AXON Multi-Rehabilitation Centre.",
          path: "/about",
        })}
      />
      <PageHero
        eyebrow="About Us"
        title="Comprehensive rehabilitation, under one roof"
        description={nap.tagline}
        breadcrumbs={[{ name: "About", path: "/about" }]}
        image={media.aboutImage}
      />

      <Section>
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block font-heading text-sm font-semibold uppercase tracking-wide text-teal">
            Who We Are
          </span>
          <p className="text-lg text-navy/70">
            {nap.brandName} is a multi-specialty rehabilitation and therapy centre offering comprehensive
            rehabilitation and therapy care under one roof. Rather than navigating multiple separate
            providers, individuals and families work with one coordinated team across speech therapy,
            occupational therapy, physiotherapy and special education, alongside dedicated pediatric,
            neurological, orthopedic and geriatric rehabilitation programs — supporting people across
            every stage of life.
          </p>
        </Reveal>
      </Section>

      <Section tone="tint">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-light-blue text-primary">
                <Target className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-navy">Our Mission</h2>
              <p className="mt-3 text-navy/70">
                To help every individual we support improve their ability to communicate, move, learn
                and live independently — through personalised, coordinated care built around their
                specific goals.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-soft-green/30 text-teal">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-navy">Our Vision</h2>
              <p className="mt-3 text-navy/70">
                To be a trusted, accessible centre for personalised, evidence-informed rehabilitation —
                where every individual and family feels supported, understood and empowered to reach
                their goals.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Our Approach" title="How we build every plan" />
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {approachPoints.map((point) => (
            <StaggerItem key={point.title}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue text-primary">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy">{point.title}</h3>
                <p className="mt-2 text-sm text-navy/65">{point.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Our Specialities" title="Care across four core disciplines" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Who We Support" title="Care across every stage of life" />
        <ConditionGroups linkToFullPage />
      </Section>

      <WhyChooseAxon tone="tint" />

      <Section>
        <SectionHeading title="Explore more about AXON" />
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {aboutLinks.map((link) => (
            <StaggerItem key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
              >
                <h3 className="font-heading text-lg font-semibold text-navy">{link.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy/65">{link.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <CTASection />
    </>
  );
}
