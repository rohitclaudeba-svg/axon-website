import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteProgress } from "@/components/layout/RouteProgress";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";
import { ToastProvider } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { medicalBusinessSchema, websiteSchema } from "@/lib/schema";
import { nap } from "@/content/nap";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(nap.siteUrl),
  title: {
    default: `${nap.brandName} | ${nap.tagline}`,
    template: `%s | ${nap.brandName}`,
  },
  description:
    "AXON Multi-Rehabilitation Centre offers Speech Therapy, Occupational Therapy, Physiotherapy and Special Education with personalised, multidisciplinary rehabilitation programs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <ToastProvider>
          <JsonLd data={[medicalBusinessSchema(), websiteSchema()]} />
          <RouteProgress />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingContactButtons />
        </ToastProvider>
      </body>
    </html>
  );
}
