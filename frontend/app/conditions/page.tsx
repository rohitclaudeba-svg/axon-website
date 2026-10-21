import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ConditionGroups } from "@/components/sections/ConditionGroups";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";
import { getPublishedSubcategoryPage, type HeroSectionData } from "@/lib/subcategoryPage";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: "Conditions We Support",
    description:
      "AXON supports a wide range of developmental, neurological, orthopedic and age-related conditions across every stage of life.",
    path: "/conditions",
  });
}

export default async function ConditionsPage() {
  const page = await getPublishedSubcategoryPage("conditions");
  const hero = page?.sections.find((s) => s.type === "hero" && s.enabled)?.data as HeroSectionData | undefined;

  const heroImage = hero?.imageUrl ? { src: hero.imageUrl, alt: "AXON Multi-Rehabilitation Centre" } : media.conditionsImage;
  const heroMobileImage = hero?.mobileImageUrl
    ? { src: hero.mobileImageUrl, alt: "AXON Multi-Rehabilitation Centre" }
    : undefined;
  const heroTitle = hero?.heading?.trim() || "Care across every stage of life";
  const heroDescription =
    hero?.subtitle?.trim() ||
    "From early childhood development to healthy ageing, our team supports a wide range of conditions and concerns.";

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Conditions We Support",
          description: "Conditions and areas supported by AXON Multi-Rehabilitation Centre.",
          path: "/conditions",
        })}
      />
      <PageHero
        eyebrow="Conditions We Support"
        title={heroTitle}
        description={heroDescription}
        breadcrumbs={[{ name: "Conditions We Support", path: "/conditions" }]}
        image={heroImage}
        mobileImage={heroMobileImage}
        hideContent
      />
      <Section>
        <ConditionGroups detailed />
      </Section>
      <CTASection />
    </>
  );
}
