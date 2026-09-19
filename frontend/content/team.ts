import type { TeamMember } from "./types";

/**
 * AXON is founder-led. Divya's name, credentials and bio below are the real,
 * supplied details. Sharan's are still illustrative editorial content
 * (drafted for the site, not confirmed biographical facts) — swap in his
 * approved details whenever they're ready. Photos are real (see
 * content/media.ts teamImages).
 */
export const team: TeamMember[] = [
  {
    slug: "divya",
    name: "Divya D.",
    role: "Founder & Consultant — Speech-Language Pathologist",
    bio: "Divya D. (BASLP, MSc Psychology) is a Speech-Language Pathologist and the founder and consultant at AXON Multi-Rehabilitation Centre, Tiruvallur. She has 5+ years of experience in speech, language and communication, having worked with 100+ pediatric and adult clients — including neurodivergent individuals and those with a range of speech, language, developmental and communication needs. Divya has also conducted multiple school-readiness sessions and supported 100+ families throughout her professional journey. With a background in both Speech-Language Pathology and Psychology, she believes in personalised, child- and family-friendly care, focused on helping individuals communicate better, build confidence and participate meaningfully in everyday life.",
    photoPlaceholder: "Placeholder portrait",
  },
  {
    slug: "sharan",
    name: "Sharan",
    role: "Co-Founder & Clinical Director — Physiotherapy",
    bio: "Sharan holds a Bachelor's in Physiotherapy (BPT) and a Master's in Orthopedic & Sports Physiotherapy (MPT), with over 12 years of clinical experience in orthopedic, neurological and sports injury rehabilitation. He co-founded AXON to give patients a single, coordinated home for recovery instead of navigating multiple clinics, and leads the centre's physiotherapy and rehabilitation programs.",
    photoPlaceholder: "Placeholder portrait",
  },
];
