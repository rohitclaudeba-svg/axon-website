/**
 * Clinic Name/Address/Phone + core business facts.
 * Address, map, phone, email and hours below are real, supplied by the
 * clinic — every page/schema reads from this single file, so nothing else
 * needs to change if any of these are updated again later.
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
  phone: "+91-94456-80838",
  // WhatsApp number, digits only with country code (no +, spaces or dashes) —
  // this is what wa.me links are built from.
  whatsappNumber: "919445680838",
  whatsappDefaultMessage: "Hi AXON Multi-Rehabilitation Centre, I'd like to know more about your services.",
  email: "axonmultirehabcentre@gmail.com",
  mapEmbedUrl: "https://www.google.com/maps?q=13.1341959,79.9108162&output=embed",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir//Axon+Multi-Rehabilitation+Centre,+Ground+floor,+No:+33%2F1A,+JJ+St,+Hariram+Nagar,+V.M+Nagar,+Tiruvallur,+Tiruvaloor,+Tamil+Nadu+602001/@13.1023416,79.908075,15z",
  /** AXON's real Google Business profile (reviews tab). */
  googleReviewsUrl:
    "https://www.google.com/maps/place/Axon+Multi-Rehabilitation+Centre/@13.1341959,79.9108162,17z/data=!4m8!3m7!1s0x3a5291d6240cec49:0xfd8fb4155497c18d!8m2!3d13.1341959!4d79.9108162!9m1!1b1!16s%2Fg%2F11xd1tbp2m?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D",
  hours: [
    { day: "Monday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Tuesday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Wednesday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Thursday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Friday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Saturday", time: "3:00 PM – 7:00 PM", closed: false },
    { day: "Sunday", time: "Closed", closed: true },
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
