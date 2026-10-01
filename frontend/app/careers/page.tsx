import type { Metadata } from "next";
import { Heart, Users, TrendingUp, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CareerJobBoard } from "@/components/sections/CareerJobBoard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { getPublishedSubcategoryPage, type HeroSectionData } from "@/lib/subcategoryPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Careers",
    description:
      "Join the AXON Multi-Rehabilitation Centre team — explore open roles across speech therapy, occupational therapy, physiotherapy and special education.",
    path: "/careers",
  });
}

const values = [
  {
    icon: Users,
    title: "A Collaborative Team",
    description: "Work alongside specialists across every discipline, coordinating care as one team rather than in isolation.",
  },
  {
    icon: Heart,
    title: "Meaningful, Patient-Centred Work",
    description: "Every plan is built around the individual — your work directly shapes real progress for real people.",
  },
  {
    icon: TrendingUp,
    title: "Room to Grow",
    description: "Build your clinical skills across pediatric, neurological, orthopedic and geriatric caseloads.",
  },
  {
    icon: HeartHandshake,
    title: "A Supportive Environment",
    description: "A team culture that values collaboration, learning and genuine care for the people we support.",
  },
];

export default async function CareersPage() {
  const page = await getPublishedSubcategoryPage("career");
  const hero = page?.sections.find((s) => s.type === "hero" && s.enabled)?.data as HeroSectionData | undefined;

  const hasCustomBanner = Boolean(hero?.imageUrl);
  // See contact/page.tsx — anchor custom banners to the top so a logo/graphic
  // baked into the top of the image is never cropped out.
  const heroImage = hero?.imageUrl
    ? { src: hero.imageUrl, alt: "AXON Multi-Rehabilitation Centre", focal: "center top" }
    : media.careersImage;
  const heroMobileImage = hero?.mobileImageUrl
    ? { src: hero.mobileImageUrl, alt: "AXON Multi-Rehabilitation Centre", focal: "center top" }
    : undefined;
  const heroTitle = hero?.heading?.trim() || "Build a career that changes lives";
  const heroDescription =
    hero?.subtitle?.trim() ||
    "Join a multidisciplinary team helping children, adults and older adults move, communicate, learn and grow — under one roof.";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Careers",
          description: "Careers and open roles at AXON Multi-Rehabilitation Centre.",
          path: "/careers",
        })}
      />

      <PageHero
        eyebrow="Careers"
        title={heroTitle}
        description={heroDescription}
        breadcrumbs={[{ name: "Careers", path: "/careers" }]}
        image={heroImage}
        mobileImage={heroMobileImage}
        hideContent={hasCustomBanner}
      />

      <Section>
        <SectionHeading eyebrow="Why AXON" title="Why work with us" />
        <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <div className="flex h-full flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-sm shadow-navy/5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-light-blue text-primary">
                  <value.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-navy/65">{value.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Open Roles" title="Current opportunities" />
        <CareerJobBoard />
      </Section>
    </>
  );
}
