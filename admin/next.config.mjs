/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.axonrehabilitation.com",
      },
    ],
    // Uploaded images can be any format, including SVG — next/image blocks
    // SVGs by default since they can carry embedded scripts. Safe here since
    // uploads only ever come from an authenticated admin; the CSP still
    // prevents any embedded script from running.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
