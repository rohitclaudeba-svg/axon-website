import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicDetailTemplate } from "@/components/sections/DynamicDetailTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedSubcategoryPage } from "@/lib/subcategoryPage";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

// No generateStaticParams — services are fully admin-managed now (see the
// Categories/Subcategory Pages modules in /admin), so a new service the admin
// creates works at /services/<slug> immediately without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPublishedSubcategoryPage(params.slug);
  if (!page || page.parentSlug !== "services") return {};

  return buildMetadata({
    title: page.seoTitle || page.name,
    description: page.seoDescription || page.name,
    path: `/services/${page.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const page = await getPublishedSubcategoryPage(params.slug);
  if (!page || page.parentSlug !== "services") notFound();

  const hero = page.sections.find((s) => s.type === "hero");
  const heroSummary = hero && "subtitle" in hero.data ? (hero.data as { subtitle: string }).subtitle : page.seoDescription;

  return (
    <>
      <JsonLd data={serviceSchema({ name: page.name, heroSummary }, `/services/${page.slug}`)} />
      <DynamicDetailTemplate page={page} breadcrumbs={[{ name: page.name, path: `/services/${page.slug}` }]} />
    </>
  );
}
