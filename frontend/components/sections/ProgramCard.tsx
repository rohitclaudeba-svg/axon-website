import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { media } from "@/content/media";
import type { ProgramEntry } from "@/content/types";

export function ProgramCard({ program }: { program: ProgramEntry }) {
  const image = media.programImages[program.slug as keyof typeof media.programImages];

  return (
    <Link
      href={`/rehabilitation/${program.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-navy/5 ring-1 ring-navy/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-teal/10 hover:ring-teal/30"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-soft-green/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <h3 className="relative font-heading text-lg font-semibold text-navy">{program.name}</h3>
        <p className="relative mt-2 flex-1 text-sm text-navy/65">{program.shortDescription}</p>
        <span className="relative mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-teal">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
