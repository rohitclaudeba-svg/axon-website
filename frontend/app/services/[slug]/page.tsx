import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTemplate } from "@/components/sections/DetailTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, getServiceBySlug } from "@/content/services";
import { programs } from "@/content/programs";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const relatedServices = service.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const relatedPrograms = programs.filter((program) => service.relatedProgramSlugs.includes(program.slug));

  return (
    <>
      <JsonLd data={serviceSchema(service, `/services/${service.slug}`)} />
      <DetailTemplate
        entry={service}
        image={media.serviceShowcaseImages[service.slug as keyof typeof media.serviceShowcaseImages]}
        contentImage={media.serviceImages[service.slug as keyof typeof media.serviceImages]}
        secondaryImage={media.serviceWhoBenefitImages[service.slug as keyof typeof media.serviceWhoBenefitImages]}
        breadcrumbs={[{ name: service.name, path: `/services/${service.slug}` }]}
        relatedServices={relatedServices}
        relatedPrograms={relatedPrograms}
      />
    </>
  );
}
