"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import { nap } from "@/content/nap";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { cn } from "@/lib/cn";

const CARDS_PER_PAGE = 3;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface FetchedTestimonial {
  quote: string;
  author: string;
  context: string | null;
  rating: number | null;
}

export function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/reviews`)
      .then((res) => res.json())
      .then((json: { ok: boolean; data: FetchedTestimonial[] }) => {
        if (json.ok) {
          setTestimonials(
            json.data.map((item) => ({
              quote: item.quote,
              author: item.author,
              context: item.context ?? undefined,
              rating: item.rating ?? undefined,
            }))
          );
        }
      })
      .catch(() => {
        // Backend unreachable — section simply stays empty.
      });
  }, []);

  const pageCount = Math.ceil(testimonials.length / CARDS_PER_PAGE);

  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, 10000);
    return () => clearInterval(timer);
  }, [pageCount]);

  if (testimonials.length === 0) return null;

  const visible = testimonials.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <Section tone="tint">
      <SectionHeading eyebrow="Reviews" title="What families say about AXON" />

      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((testimonial, i) => (
          <StaggerItem key={testimonial.author}>
            <TestimonialCard testimonial={testimonial} colorIndex={page * CARDS_PER_PAGE + i} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Show testimonials page ${index + 1}`}
              aria-current={index === page}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === page ? "w-6 bg-primary" : "w-2.5 bg-navy/15 hover:bg-navy/30"
              )}
            />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <a
          href={nap.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-sm font-semibold text-primary hover:underline"
        >
          View more reviews →
        </a>
      </div>
    </Section>
  );
}
