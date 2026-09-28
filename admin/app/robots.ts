import type { MetadataRoute } from "next";

// The admin panel is an internal tool, not a page meant for search results —
// disallow crawling entirely. See also middleware.ts (X-Robots-Tag header)
// and layout.tsx (robots meta tag) for defense in depth.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
