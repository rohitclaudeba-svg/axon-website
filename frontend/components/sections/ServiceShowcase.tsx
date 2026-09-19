import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/content/media";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import type { ServiceEntry } from "@/content/types";

export function ServiceShowcase({ services }: { services: ServiceEntry[] }) {
  return (
    <StaggerGroup className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
      {services.map((service) => {
        const image = media.serviceShowcaseImages[service.slug as keyof typeof media.serviceShowcaseImages];

        return (
          <StaggerItem key={service.slug}>
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

              <div className="relative mt-auto p-3 sm:p-6">
                <h3 className="text-sm font-bold leading-snug text-white sm:text-lg lg:text-xl">{service.name}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] text-white/80 sm:mt-1.5 sm:text-sm">{service.shortDescription}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 font-heading text-[11px] font-semibold text-white sm:mt-3 sm:text-sm">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
