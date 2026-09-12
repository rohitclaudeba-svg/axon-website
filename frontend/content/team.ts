import type { TeamMember } from "./types";

/**
 * AXON is founder-led — two co-founders, not a generic multi-person roster.
 * Names, degrees and bios are illustrative editorial content (drafted for the
 * site, not confirmed biographical facts) — swap in AXON's approved details
 * whenever they're ready; photos remain stock placeholders until real photos
 * are supplied.
 */
export const team: TeamMember[] = [
  {
    slug: "divya",
    name: "Divya",
    role: "Co-Founder & Clinical Director — Speech & Developmental Therapy",
    bio: "Divya holds a Master's in Speech-Language Pathology (M.Sc. SLP) and a Bachelor's in Audiology & Speech-Language Pathology, with over 10 years of experience supporting children and adults with communication, language and feeding difficulties. She co-founded AXON to bring speech therapy, occupational therapy and special education together under one coordinated plan, and leads the centre's speech therapy and pediatric development programs.",
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
