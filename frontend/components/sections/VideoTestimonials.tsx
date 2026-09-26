"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Video, X } from "lucide-react";
import { videoTestimonials } from "@/content/videoTestimonials";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

export function VideoTestimonials() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (videoTestimonials.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-navy/15 bg-white/60 px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-light-blue text-primary">
          <Video className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-4 font-heading text-base font-semibold text-navy">Video testimonials coming soon</p>
        <p className="mt-2 max-w-md text-sm text-navy/60">
          We&apos;re collecting real video stories from families and clients — check back soon.
        </p>
      </div>
    );
  }

  const active = activeIndex !== null ? videoTestimonials[activeIndex] : null;

  return (
    <>
      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {videoTestimonials.map((video, index) => (
          <StaggerItem key={`${video.youtubeId}-${index}`}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-navy/8 bg-navy shadow-sm shadow-navy/5"
            >
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, 40vw"
                  className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden="true" />
                  </span>
                </span>
              </div>
              <p className="absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-left text-xs font-medium text-white">
                {video.title}
              </p>
            </button>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div
            className="relative h-[85vh] max-h-[720px] aspect-[9/16] max-w-full overflow-hidden rounded-2xl bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
