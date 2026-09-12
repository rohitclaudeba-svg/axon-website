import { Quote } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimatedReveal";

export function TestimonialSection() {
  if (testimonials.length === 0) return null;

  return (
    <Section tone="tint">
      <SectionHeading eyebrow="Testimonials" title="What families say about AXON" />
      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.author}>
            <figure className="h-full rounded-2xl bg-white p-6">
              <Quote className="h-6 w-6 text-teal" aria-hidden="true" />
              <blockquote className="mt-4 text-sm text-navy/75">{testimonial.quote}</blockquote>
              <figcaption className="mt-4 font-heading text-sm font-semibold text-navy">
                {testimonial.author}
                {testimonial.context && (
                  <span className="block font-normal text-navy/50">{testimonial.context}</span>
                )}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
