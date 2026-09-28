import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicDetailTemplate } from "@/components/sections/DynamicDetailTemplate";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPublishedSubcategoryPage } from "@/lib/subcategoryPage";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

// No generateStaticParams — programs are fully admin-managed now (see the
// Categories/Subcategory Pages modules in /admin), so a new program the admin
// creates works at /rehabilitation/<slug> immediately without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPublishedSubcategoryPage(params.slug);
  if (!page || page.parentSlug !== "rehabilitation") return {};

  return buildMetadata({
    title: page.seoTitle || page.name,
    description: page.seoDescription || page.name,
    path: `/rehabilitation/${page.slug}`,
  });
}

export default async function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const page = await getPublishedSubcategoryPage(params.slug);
  if (!page || page.parentSlug !== "rehabilitation") notFound();

  const hero = page.sections.find((s) => s.type === "hero");
  const heroSummary = hero && "subtitle" in hero.data ? (hero.data as { subtitle: string }).subtitle : page.seoDescription;

  return (
    <>
      <JsonLd data={serviceSchema({ name: page.name, heroSummary }, `/rehabilitation/${page.slug}`)} />
      <DynamicDetailTemplate
        page={page}
        breadcrumbs={[
          { name: "Rehabilitation Programs", path: "/rehabilitation" },
          { name: page.name, path: `/rehabilitation/${page.slug}` },
        ]}
      />
    </>
  );
}
