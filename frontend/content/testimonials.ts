export interface Testimonial {
  quote: string;
  author: string;
  context?: string;
}

/**
 * Empty until AXON supplies genuine, approved testimonials (spec §4, §16 — never fabricate reviews).
 * TestimonialSection renders nothing while this stays empty.
 */
export const testimonials: Testimonial[] = [];
