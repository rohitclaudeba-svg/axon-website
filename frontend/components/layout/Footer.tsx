import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerServiceLinks, footerCompanyLinks } from "@/content/nav";
import { nap } from "@/content/nap";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-sm text-white/70">{nap.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-soft-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              AXON
            </h3>
            <ul className="space-y-2.5">
              {footerCompanyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-soft-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white/90">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-soft-green" aria-hidden="true" />
                <span>
                  {nap.streetAddress}, {nap.addressLocality}, {nap.addressRegion} {nap.postalCode}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-soft-green" aria-hidden="true" />
                <a href={`tel:${nap.phone}`} className="hover:text-soft-green">
                  {nap.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-soft-green" aria-hidden="true" />
                <a href={`mailto:${nap.email}`} className="hover:text-soft-green">
                  {nap.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-soft-green" aria-hidden="true" />
                <span>
                  {nap.hoursSummary.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {nap.brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-soft-green">
              Contact
            </Link>
            <Link href="/faqs" className="hover:text-soft-green">
              FAQs
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
