import type { NavLink } from "./types";

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Rehabilitation", href: "/rehabilitation" },
  { label: "Media", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Speech Therapy", href: "/services/speech-therapy" },
  { label: "Occupational Therapy", href: "/services/occupational-therapy" },
  { label: "Physiotherapy", href: "/services/physiotherapy" },
  { label: "Special Education", href: "/services/special-education" },
  { label: "Behavioral Therapy", href: "/services/behavioral-therapy" },
  { label: "Social & Communication Groups", href: "/services/social-communication-groups" },
  { label: "School Readiness", href: "/services/school-readiness" },
  { label: "Play Groups", href: "/services/play-groups" },
];

export const footerProgramLinks: NavLink[] = [
  { label: "Pediatric Rehabilitation", href: "/rehabilitation/pediatric-rehabilitation" },
  { label: "Neurological Rehabilitation", href: "/rehabilitation/neurological-rehabilitation" },
  { label: "Orthopedic & Musculoskeletal Rehabilitation", href: "/rehabilitation/orthopedic-musculoskeletal-rehabilitation" },
  { label: "Geriatric Rehabilitation", href: "/rehabilitation/geriatric-rehabilitation" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Approach", href: "/about/approach" },
  { label: "Why Choose AXON", href: "/about/why-choose-axon" },
  { label: "Our Team", href: "/our-team" },
  { label: "Conditions We Support", href: "/conditions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Careers", href: "/careers" },
];
