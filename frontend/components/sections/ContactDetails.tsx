import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { nap } from "@/content/nap";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { HoursAccordion } from "@/components/sections/HoursAccordion";

export function ContactDetails() {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <StaggerItem>
        <div className="rounded-2xl border border-navy/8 bg-white p-6 sm:p-8">
          <ul className="space-y-5">
            <li className="flex items-start gap-3.5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Address</p>
                <p className="text-sm text-navy/70">
                  {nap.streetAddress}, {nap.addressLocality}, {nap.addressRegion} {nap.postalCode}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Phone</p>
                <a href={`tel:${nap.phone}`} className="text-sm text-navy/70 hover:text-primary">
                  {nap.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3.5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-sm font-semibold text-navy">Email</p>
                <a href={`mailto:${nap.email}`} className="text-sm text-navy/70 hover:text-primary">
                  {nap.email}
                </a>
              </div>
            </li>
          </ul>
          <div className="mt-5 border-t border-navy/8 pt-5">
            <HoursAccordion />
          </div>
          <div className="mt-6">
            <Button href={nap.mapDirectionsUrl} variant="ghost">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </Button>
          </div>
        </div>
      </StaggerItem>

      <StaggerItem>
        <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-navy/8">
          <iframe
            src={nap.mapEmbedUrl}
            title={`Map showing the location of ${nap.brandName}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[280px] w-full"
          />
        </div>
      </StaggerItem>
    </StaggerGroup>
  );
}
