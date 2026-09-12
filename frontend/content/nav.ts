import type { NavLink } from "./types";

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Rehabilitation", href: "/rehabilitation" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Speech Therapy", href: "/services/speech-therapy" },
  { label: "Occupational Therapy", href: "/services/occupational-therapy" },
  { label: "Physiotherapy", href: "/services/physiotherapy" },
  { label: "Special Education", href: "/services/special-education" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About AXON", href: "/about" },
  { label: "Our Approach", href: "/about/approach" },
  { label: "Why Choose AXON", href: "/about/why-choose-axon" },
  { label: "Our Team", href: "/our-team" },
  { label: "Conditions We Support", href: "/conditions" },
  { label: "Patient Resources", href: "/patient-resources" },
  { label: "FAQs", href: "/faqs" },
  { label: "Gallery", href: "/gallery" },
];
