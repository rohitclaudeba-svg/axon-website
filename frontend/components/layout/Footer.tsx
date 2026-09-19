import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { footerServiceLinks, footerProgramLinks, footerCompanyLinks } from "@/content/nav";
import { nap } from "@/content/nap";

/** Collapses consecutive days with the same hours into a range, e.g. "Monday – Saturday". */
function groupHours(hours: typeof nap.hours) {
  const groups: { label: string; time: string }[] = [];
  for (const { day, time } of hours) {
    const last = groups[groups.length - 1];
    if (last && last.time === time) {
      const [firstDay] = last.label.split(" – ");
      last.label = `${firstDay} – ${day}`;
    } else {
      groups.push({ label: day, time });
    }
  }
  return groups;
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
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
              Rehabilitation
            </h3>
            <ul className="space-y-2.5">
              {footerProgramLinks.map((link) => (
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
              Quick Links
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
                  {groupHours(nap.hours).map((h) => (
                    <span key={h.label} className="block">
                      {h.label}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} {nap.brandName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
