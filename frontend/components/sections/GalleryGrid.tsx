"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { cn } from "@/lib/cn";

type GalleryItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; youtubeId: string; title: string };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

// Photos and videos are both fully admin-managed now (see the Gallery module
// in /admin) — no hardcoded static list here anymore, so add/delete in the
// admin panel actually changes the live site. This is deliberately separate
// from the Video Testimonials module — those videos only appear on the
// Testimonials page, not here.
interface UploadedGalleryItem {
  id: number;
  type: "image" | "video";
  src: string | null;
  youtubeId: string | null;
  title: string | null;
  description: string;
}

type Filter = "all" | "image" | "video";

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Photos", value: "image" },
  { label: "Videos", value: "video" },
];

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [uploadedItems, setUploadedItems] = useState<UploadedGalleryItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then((res) => res.json())
      .then((json: { ok: boolean; data: UploadedGalleryItem[] }) => {
        if (json.ok) setUploadedItems(json.data);
      })
      .catch(() => {
        // Backend unreachable — the grid just stays empty.
      });
  }, []);

  const galleryItems = useMemo<GalleryItem[]>(() => {
    const allImages: GalleryItem[] = uploadedItems
      .filter((item) => item.type === "image" && item.src)
      .map((item) => ({
        type: "image",
        src: item.src as string,
        alt: item.description || "AXON Multi-Rehabilitation Centre — photo",
      }));
    const allVideos: GalleryItem[] = uploadedItems
      .filter((item) => item.type === "video" && item.youtubeId)
      .map((item) => ({
        type: "video",
        youtubeId: item.youtubeId as string,
        title: item.title || "AXON video",
      }));

    // Videos are placed after the first half of the photos, so they sit in the middle of the grid.
    const midpoint = Math.ceil(allImages.length / 2);
    return [...allImages.slice(0, midpoint), ...allVideos, ...allImages.slice(midpoint)];
  }, [uploadedItems]);

  const visibleItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.type === filter);

  const showPrev = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length));
  const showNext = () =>
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % visibleItems.length));

  const active = activeIndex !== null ? visibleItems[activeIndex] : null;

  return (
    <>
      <div className="mb-6 flex justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => {
              setFilter(f.value);
              setActiveIndex(null);
            }}
            className={cn(
              "rounded-full px-4 py-2 font-heading text-sm font-semibold transition-colors duration-200",
              filter === f.value
                ? "bg-primary text-white"
                : "bg-white text-navy/60 border border-navy/10 hover:border-primary/30 hover:text-primary"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleItems.map((item, index) => (
          <StaggerItem key={item.type === "image" ? item.src : item.youtubeId}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-navy/8 bg-light-blue"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <>
                  <Image
                    src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/40" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden="true" />
                    </span>
                  </span>
                </>
              )}
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
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-4"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-4"
            aria-label="Next item"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {active.type === "image" ? (
            <div className="relative h-[80vh] w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
              <Image src={active.src} alt={active.alt} fill sizes="100vw" className="object-contain" />
            </div>
          ) : (
            <div
              className="relative aspect-[9/16] h-[80vh] max-h-[720px] max-w-full overflow-hidden rounded-2xl bg-black"
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
          )}
        </div>
      )}
    </>
  );
}
