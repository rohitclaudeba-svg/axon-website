import type { Metadata } from "next";
import { nap } from "@/content/nap";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Single source of truth for page-level SEO metadata (spec §1.1, §1.4).
 * Every page should call this from its `generateMetadata` export rather than
 * hand-rolling title/description/canonical/OG tags.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = "/brand/axon-logo.svg",
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, nap.siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: nap.brandName,
      images: [{ url: ogImage }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
