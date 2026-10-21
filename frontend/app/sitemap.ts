import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { programs } from "@/content/programs";
import { nap } from "@/content/nap";
import { getPageVisibility, hiddenPagePaths } from "@/lib/pageVisibility";

const staticRoutes = [
  "",
  "/about",
  "/about/approach",
  "/about/why-choose-axon",
  "/our-team",
  "/services",
  "/rehabilitation",
  "/conditions",
  "/gallery",
  "/testimonials",
  "/contact",
  "/book-appointment",
  "/careers",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = [
    ...services.map((service) => `/services/${service.slug}`),
    ...programs.map((program) => `/rehabilitation/${program.slug}`),
  ];
  const hiddenPaths = hiddenPagePaths(await getPageVisibility());

  return [...staticRoutes, ...dynamicRoutes].filter((path) => !hiddenPaths.includes(path)).map((path) => ({
    url: new URL(path, nap.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
