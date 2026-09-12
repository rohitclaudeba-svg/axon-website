/**
 * Placeholder photography — free-license stock photos (Pexels License: free for
 * commercial use, no attribution required) used until AXON supplies real clinic
 * photography (spec §18). Swap `src` for a real, hosted AXON photo when available;
 * no other code needs to change.
 */
export const media = {
  heroImage: {
    src: "https://images.pexels.com/photos/5793895/pexels-photo-5793895.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A physiotherapist guiding a patient through a supported leg stretch during a rehabilitation session",
  },
  careersImage: {
    src: "https://images.pexels.com/photos/5452190/pexels-photo-5452190.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Three clinical team members in discussion during a workday at the centre",
  },
  contactImage: {
    src: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A smiling team member wearing a headset at her desk, ready to help with a call",
    focal: "50% 25%",
  },
  conditionsImage: {
    src: "https://images.pexels.com/photos/7447263/pexels-photo-7447263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A therapist reviewing a drawing with a child and her parents during a family session",
  },
  serviceImages: {
    "speech-therapy": {
      src: "https://images.pexels.com/photos/7447266/pexels-photo-7447266.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A therapist using emotion cards with a child during a speech therapy session",
    },
    "occupational-therapy": {
      src: "https://images.pexels.com/photos/30483024/pexels-photo-30483024.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A child practising fine motor skills with therapy putty",
    },
    physiotherapy: {
      src: "https://images.pexels.com/photos/5793803/pexels-photo-5793803.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A physiotherapist guiding a patient through a supported side-stretch exercise",
    },
    "special-education": {
      src: "https://images.pexels.com/photos/8541882/pexels-photo-8541882.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A teacher engaging a child in a hands-on learning activity",
    },
  },
  /** Larger, distinct images for the homepage's alternating services showcase. */
  serviceShowcaseImages: {
    "speech-therapy": {
      src: "https://images.pexels.com/photos/7447264/pexels-photo-7447264.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "A therapist talking warmly with a child during a speech therapy session",
    },
    "occupational-therapy": {
      src: "https://images.pexels.com/photos/11170468/pexels-photo-11170468.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "Close-up of hands practising a grip exercise with a textured therapy ball",
    },
    physiotherapy: {
      src: "https://images.pexels.com/photos/5793713/pexels-photo-5793713.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "A physiotherapist guiding a patient's arm and shoulder through a stretching movement",
    },
    "special-education": {
      src: "https://images.pexels.com/photos/8923081/pexels-photo-8923081.jpeg?auto=compress&cs=tinysrgb&w=1000",
      alt: "A teacher smiling while working through a writing activity with a child",
    },
  },
  programImages: {
    "pediatric-rehabilitation": {
      src: "https://images.pexels.com/photos/8535145/pexels-photo-8535145.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A therapist guiding a child through a hands-on developmental activity",
    },
    "neurological-rehabilitation": {
      src: "https://images.pexels.com/photos/6111585/pexels-photo-6111585.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A therapist supporting a patient with a prosthetic leg through a balance exercise",
    },
    "orthopedic-musculoskeletal-rehabilitation": {
      src: "https://images.pexels.com/photos/30483049/pexels-photo-30483049.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A knee undergoing guided physiotherapy treatment",
    },
    "geriatric-rehabilitation": {
      src: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "A therapist guiding an older adult through an arm-raising mobility exercise",
    },
  },
  /**
   * Generic placeholder portraits — NOT real photos of AXON's founders (no
   * photos have been supplied). Swap each `src` for the real founder's photo
   * once available; alt text should then name that person.
   */
  teamImages: {
    sharan: {
      src: "https://images.pexels.com/photos/32254658/pexels-photo-32254658.jpeg?auto=compress&cs=tinysrgb&w=700",
      alt: "Placeholder portrait of a co-founder",
      focal: "center 32%",
    },
    divya: {
      src: "https://images.pexels.com/photos/5998480/pexels-photo-5998480.jpeg?auto=compress&cs=tinysrgb&w=700",
      alt: "Placeholder portrait of a co-founder",
      focal: "center 12%",
    },
  },
} as const;
