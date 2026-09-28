/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
      {
        protocol: "https",
        hostname: "api.axonrehabilitation.com",
      },
    ],
    // Admin-uploaded banners/photos can be any image format, including SVG —
    // next/image blocks SVGs by default (they can carry embedded scripts).
    // These uploads only ever come from an authenticated admin, so it's safe
    // to allow them; the CSP still prevents any embedded script from running
    // and forces the browser to download rather than navigate to the file.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
