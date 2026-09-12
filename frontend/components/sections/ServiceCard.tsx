import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/content/media";
import type { ServiceEntry } from "@/content/types";

export function ServiceCard({ service }: { service: ServiceEntry }) {
  const image = media.serviceImages[service.slug as keyof typeof media.serviceImages];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
    >
      {image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col overflow-hidden p-6">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-light-blue to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <h3 className="relative font-heading text-lg font-semibold text-navy">{service.name}</h3>
        <p className="relative mt-2 flex-1 text-sm text-navy/65">{service.shortDescription}</p>
        <span className="relative mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
