export interface Testimonial {
  quote: string;
  author: string;
  context?: string;
  rating?: number;
}

// Testimonials are fully admin-managed now (see the Testimonials module in
// /admin) — TestimonialSection fetches them from the backend directly. This
// file only keeps the shared `Testimonial` type used by TestimonialCard.
