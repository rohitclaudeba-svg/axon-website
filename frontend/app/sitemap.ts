import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { programs } from "@/content/programs";
import { nap } from "@/content/nap";

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
  "/contact",
  "/book-appointment",
  "/careers",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicRoutes = [
    ...services.map((service) => `/services/${service.slug}`),
    ...programs.map((program) => `/rehabilitation/${program.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: new URL(path, nap.siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
