/**
 * Clinic Name/Address/Phone + core business facts.
 * Address, map, phone and hours below are real, supplied by the clinic.
 * Email is still PLACEHOLDER pending approved details (spec §1.3, §20) —
 * replace the remaining "[...]" value; nothing else needs to change since
 * every page/schema reads from this single file.
 */
export const nap = {
  brandName: "AXON Multi-Rehabilitation Centre",
  legalName: "AXON Multi-Rehabilitation Centre",
  tagline: "One Centre. Multiple Specialities. Personalised Care.",
  emotionalTagline: "Together, We Build Your Strength.",
  streetAddress: "Ground Floor, No. 33/1A, JJ Street, Hariram Nagar, V.M Nagar",
  addressLocality: "Tiruvallur",
  addressRegion: "Tamil Nadu",
  postalCode: "602001",
  addressCountry: "IN",
  latitude: 13.1341959,
  longitude: 79.9108162,
  // Phone/email are used inside tel:/mailto: hrefs, so placeholders here must
  // stay URL-safe (no brackets) — Next's <Link> parses "[...]" as a dynamic route segment.
  phone: "+91-98989-87654",
  // WhatsApp number, digits only with country code (no +, spaces or dashes) —
  // this is what wa.me links are built from.
  whatsappNumber: "919445680838",
  whatsappDefaultMessage: "Hi AXON Multi-Rehabilitation Centre, I'd like to know more about your services.",
  email: "info@axon-placeholder.example",
  mapEmbedUrl: "https://www.google.com/maps?q=13.1341959,79.9108162&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir//Axon+Multi-Rehabilitation+Centre,+Ground+floor,+No:+33%2F1A,+JJ+St,+Hariram+Nagar,+V.M+Nagar,+Tiruvallur,+Tiruvaloor,+Tamil+Nadu+602001/@13.1023416,79.908075,15z",
  hours: [
    { day: "Monday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Tuesday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Wednesday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Thursday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Friday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Saturday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Sunday", time: "Closed", closed: true },
  ],
  /** Condensed form for tight spaces (footer). */
  hoursSummary: [
    { day: "Monday – Saturday", time: "3:00 PM – 7:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  /** Machine-readable hours for JSON-LD (schema.org OpeningHoursSpecification). */
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "15:00",
      closes: "19:00",
    },
  ],
  siteUrl: "https://www.axon-placeholder.example",
  socials: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
} as const;
