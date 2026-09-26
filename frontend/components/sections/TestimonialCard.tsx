import { Star } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

const avatarColors = [
  "bg-primary text-white",
  "bg-teal text-white",
  "bg-soft-green text-navy",
  "bg-light-blue text-primary",
];

const LONG_QUOTE_THRESHOLD = 160;

export function TestimonialCard({ testimonial, colorIndex }: { testimonial: Testimonial; colorIndex: number }) {
  const isLong = testimonial.quote.length > LONG_QUOTE_THRESHOLD;

  return (
    <div className="relative flex h-full flex-col gap-5 rounded-3xl bg-white p-8 text-left shadow-sm shadow-navy/5">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-xl font-bold",
            avatarColors[colorIndex % avatarColors.length]
          )}
        >
          {testimonial.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <figcaption className="font-heading text-base font-semibold text-navy">{testimonial.author}</figcaption>
          <div className="mt-1 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < (testimonial.rating ?? 5) ? "fill-amber-400 text-amber-400" : "fill-navy/10 text-navy/10"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className={cn(isLong && "group relative inline-block cursor-help")}>
          <blockquote className={cn("text-navy/75", isLong && "line-clamp-4")}>
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          {isLong && (
            <div className="pointer-events-none absolute left-full top-0 z-20 ml-3 w-72 max-w-[80vw] rounded-xl border border-navy/10 bg-white p-4 text-left text-sm text-navy/80 opacity-0 shadow-xl shadow-navy/15 transition-opacity duration-200 group-hover:opacity-100">
              &ldquo;{testimonial.quote}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
