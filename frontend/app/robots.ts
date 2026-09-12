import type { MetadataRoute } from "next";
import { nap } from "@/content/nap";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: new URL("/sitemap.xml", nap.siteUrl).toString(),
  };
}
