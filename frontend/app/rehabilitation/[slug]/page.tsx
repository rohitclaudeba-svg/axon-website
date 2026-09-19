import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/DetailTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { programs, getProgramBySlug } from "@/content/programs";
import { services } from "@/content/services";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const program = getProgramBySlug(params.slug);
  if (!program) return {};

  return buildMetadata({
    title: program.seo.title,
    description: program.seo.description,
    path: `/rehabilitation/${program.slug}`,
  });
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = getProgramBySlug(params.slug);
  if (!program) notFound();

  const relatedServices = services.filter((service) => program.relatedServiceSlugs.includes(service.slug));

  return (
    <>
      <JsonLd data={serviceSchema(program, `/rehabilitation/${program.slug}`)} />
      <DetailTemplate
        entry={program}
        image={media.programImages[program.slug as keyof typeof media.programImages]}
        contentImage={media.programContentImages[program.slug as keyof typeof media.programContentImages]}
        secondaryImage={media.programWhoBenefitImages[program.slug as keyof typeof media.programWhoBenefitImages]}
        breadcrumbs={[
          { name: "Rehabilitation Programs", path: "/rehabilitation" },
          { name: program.name, path: `/rehabilitation/${program.slug}` },
        ]}
        relatedServices={relatedServices}
        relatedPrograms={[]}
      />
    </>
  );
}
