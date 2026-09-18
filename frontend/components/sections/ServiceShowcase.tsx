import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/content/media";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import type { ServiceEntry } from "@/content/types";

export function ServiceShowcase({ services }: { services: ServiceEntry[] }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {services.map((service) => {
        const image = media.serviceShowcaseImages[service.slug as keyof typeof media.serviceShowcaseImages];

        return (
          <StaggerItem key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-xl shadow-navy/15 sm:aspect-[4/3]"
            >
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-navy/5 transition-colors duration-300 group-hover:from-navy/95"
                aria-hidden="true"
              />

              <div className="relative mt-auto p-6 sm:p-7">
                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-white/80">{service.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-white">
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
