import Link from "next/link";
import { Phone, Mail, MapPin, CalendarCheck, type LucideIcon } from "lucide-react";
import { nap } from "@/content/nap";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

interface QuickContactCard {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  internal?: boolean;
}

const cards: QuickContactCard[] = [
  { icon: Phone, label: "Call Us", value: nap.phone, href: `tel:${nap.phone}` },
  { icon: Mail, label: "Email Us", value: nap.email, href: `mailto:${nap.email}` },
  {
    icon: MapPin,
    label: "Visit Us",
    value: `${nap.addressLocality}, ${nap.addressRegion}`,
    href: nap.mapDirectionsUrl,
  },
  {
    icon: CalendarCheck,
    label: "Book Appointment",
    value: "Schedule your visit",
    href: "/book-appointment",
    internal: true,
  },
];

export function QuickContactCards() {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {cards.map((card) => {
        const content = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-blue text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <card.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="mt-4 font-heading text-sm font-semibold text-navy">{card.label}</span>
            <span className="mt-1 truncate text-xs text-navy/60">{card.value}</span>
          </>
        );
        const className =
          "group flex h-full flex-col items-start rounded-2xl border border-navy/8 bg-white p-5 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10";

        return (
          <StaggerItem key={card.label} className="h-full">
            {card.internal ? (
              <Link href={card.href} className={className}>
                {content}
              </Link>
            ) : (
              <a href={card.href} className={className}>
                {content}
              </a>
            )}
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
