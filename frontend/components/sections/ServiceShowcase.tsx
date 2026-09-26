import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/content/media";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import type { ServiceEntry } from "@/content/types";

export function ServiceShowcase({
  services,
  maxMobile,
}: {
  services: ServiceEntry[];
  /** Hides items beyond this count below the lg breakpoint; all items still show at lg+. */
  maxMobile?: number;
}) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      {services.map((service, index) => {
        const image = media.serviceShowcaseImages[service.slug as keyof typeof media.serviceShowcaseImages];
        const hiddenOnMobile = maxMobile !== undefined && index >= maxMobile;

        return (
          <StaggerItem key={service.slug} className={hiddenOnMobile ? "hidden lg:block" : undefined}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15"
            >
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/85"
                aria-hidden="true"
              />

              <div className="relative mt-auto p-6">
                <h3 className="text-lg font-bold leading-snug text-white lg:text-xl">{service.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-white/80">{service.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-white">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
