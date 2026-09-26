export interface Testimonial {
  quote: string;
  author: string;
  context?: string;
  rating?: number;
}

/**
 * Placeholder testimonials (added at the user's explicit request as dummy
 * content) — swap in genuine, approved reviews from AXON's Google Business
 * profile when available. See nap.googleReviewsUrl for the real reviews link.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "The team at AXON really took the time to understand our son's needs. From the very first assessment, they explained things clearly and set realistic goals instead of making big promises. We've seen steady, real progress since we started — small wins every few weeks that add up. The therapists always keep us in the loop, send us simple home exercises we can actually manage, and are patient with our questions. It genuinely feels like they care about our son's long-term progress, not just filling an appointment slot.",
    author: "Priya",
    context: "Speech Therapy",
    rating: 5,
  },
  {
    quote:
      "Having physiotherapy and occupational therapy under one roof made a huge difference for us — no more running between different clinics for every appointment.",
    author: "Karthik",
    context: "Physiotherapy & Occupational Therapy",
    rating: 5,
  },
  {
    quote:
      "Every session felt personalised, not routine. The therapists genuinely listen and adjust the plan as my child grows and improves.",
    author: "Meena",
    context: "Special Education",
    rating: 5,
  },
  {
    quote:
      "The staff are patient, warm and professional. It's clear they care about real progress, not just ticking boxes.",
    author: "Suresh",
    context: "Geriatric Rehabilitation",
    rating: 4,
  },
  {
    quote:
      "Our daughter looks forward to her sessions every week. The team makes therapy feel like play, and we've noticed real improvement in her confidence.",
    author: "Divya",
    context: "Behavioral Therapy",
    rating: 5,
  },
  {
    quote:
      "Booking appointments and getting updates has been simple and hassle-free. The therapists are skilled and genuinely friendly with the kids.",
    author: "Ramesh",
    context: "School Readiness",
    rating: 5,
  },
];
