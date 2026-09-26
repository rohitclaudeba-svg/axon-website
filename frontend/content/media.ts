/**
 * Placeholder photography — free-license stock photos (Pexels License: free for
 * commercial use, no attribution required) used until AXON supplies real clinic
 * photography (spec §18). Swap `src` for a real, hosted AXON photo when available;
 * no other code needs to change.
 *
 * Every photo ID below is used in exactly one place across the whole site —
 * pages that show more than one image (a hero, a "how it helps" box and a
 * "who can benefit" box, for instance) each pull from a different pool so no
 * two images on the same page — or anywhere else on the site — repeat.
 */
export const media = {
  heroImage: {
    src: "https://images.pexels.com/photos/5793895/pexels-photo-5793895.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A physiotherapist guiding a patient through a supported leg stretch during a rehabilitation session",
  },
  careersImage: {
    src: "https://images.pexels.com/photos/29807423/pexels-photo-29807423.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Two physiotherapists providing treatment together at a modern clinic",
    focal: "center 35%",
  },
  contactImage: {
    src: "https://images.pexels.com/photos/8101355/pexels-photo-8101355.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A smiling woman in an office taking a phone call",
    focal: "center 30%",
  },
  conditionsImage: {
    src: "https://images.pexels.com/photos/7447263/pexels-photo-7447263.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A therapist reviewing a drawing with a child and her parents during a family session",
  },
  aboutImage: {
    src: "https://images.pexels.com/photos/7108332/pexels-photo-7108332.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A clinician consulting with a family in a calm, modern clinic room",
  },
  approachImage: {
    src: "https://images.pexels.com/photos/7176291/pexels-photo-7176291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A therapist taking notes on a clipboard while talking with a client",
    focal: "center 30%",
  },
  whyChooseImage: {
    src: "https://images.pexels.com/photos/5710927/pexels-photo-5710927.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A diverse group taking part in a supportive team discussion",
    focal: "center 35%",
  },
  teamImage: {
    src: "https://images.pexels.com/photos/9064316/pexels-photo-9064316.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Three colleagues in a supportive discussion, reflecting mentorship and teamwork",
    focal: "center 30%",
  },
  servicesHeroImage: {
    src: "https://images.pexels.com/photos/5794054/pexels-photo-5794054.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A therapist applying kinesiology tape during a treatment session",
    focal: "center 35%",
  },
  rehabilitationHeroImage: {
    src: "https://images.pexels.com/photos/20860617/pexels-photo-20860617.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A physiotherapist exercising with a patient in a modern clinic setting",
    focal: "center 35%",
  },
  /** Detail-page hero banners (also reused as the homepage services grid tile). */
  serviceShowcaseImages: {
    "speech-therapy": {
      src: "https://images.pexels.com/photos/7447264/pexels-photo-7447264.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A therapist talking warmly with a child during a speech therapy session",
      focal: "center 30%",
    },
    "occupational-therapy": {
      src: "https://images.pexels.com/photos/11170468/pexels-photo-11170468.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Close-up of hands practising a grip exercise with a textured therapy ball",
      focal: "center 40%",
    },
    physiotherapy: {
      src: "https://images.pexels.com/photos/5793713/pexels-photo-5793713.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A physiotherapist guiding a patient's arm and shoulder through a stretching movement",
      focal: "center 35%",
    },
    "special-education": {
      src: "https://images.pexels.com/photos/8535598/pexels-photo-8535598.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A teacher engaging children in a learning activity in a spacious classroom",
      focal: "center 40%",
    },
    "behavioral-therapy": {
      src: "https://images.pexels.com/photos/8653974/pexels-photo-8653974.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "Children engaging in a therapy session with a therapist in a modern office",
      focal: "center 30%",
    },
    "social-communication-groups": {
      src: "https://images.pexels.com/photos/8535602/pexels-photo-8535602.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A small group of children in a kindergarten class playing and learning with a tutor",
      focal: "center 35%",
    },
    "school-readiness": {
      src: "https://images.pexels.com/photos/8088099/pexels-photo-8088099.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A colourful kindergarten classroom set up with chairs, tables and learning materials",
      focal: "center 40%",
    },
    "play-groups": {
      src: "https://images.pexels.com/photos/11163617/pexels-photo-11163617.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A toddler standing indoors surrounded by toys and playmates",
      focal: "center 30%",
    },
  },
  /** "How it helps" box images on each service's detail page. */
  serviceImages: {
    "speech-therapy": {
      src: "https://images.pexels.com/photos/7447266/pexels-photo-7447266.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A therapist using emotion cards with a child during a speech therapy session",
    },
    "occupational-therapy": {
      src: "https://images.pexels.com/photos/30483024/pexels-photo-30483024.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A child practising fine motor skills with therapy putty",
    },
    physiotherapy: {
      src: "https://images.pexels.com/photos/5793803/pexels-photo-5793803.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A physiotherapist guiding a patient through a supported side-stretch exercise",
    },
    "special-education": {
      src: "https://images.pexels.com/photos/8541882/pexels-photo-8541882.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A teacher engaging a child in a hands-on learning activity",
    },
    "behavioral-therapy": {
      src: "https://images.pexels.com/photos/8654102/pexels-photo-8654102.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A child in a therapy session with a therapist holding a clipboard",
    },
    "social-communication-groups": {
      src: "https://images.pexels.com/photos/8613366/pexels-photo-8613366.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A group of diverse children sitting in a circle, engaging in play and learning together",
    },
    "school-readiness": {
      src: "https://images.pexels.com/photos/8422132/pexels-photo-8422132.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Children in a kindergarten classroom engaging with letters during a learning session",
    },
    "play-groups": {
      src: "https://images.pexels.com/photos/11163601/pexels-photo-11163601.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A teacher engaging children in an activity in a cosy nursery environment",
    },
  },
  /** "Who can benefit" box images on each service's detail page. */
  serviceWhoBenefitImages: {
    "speech-therapy": {
      src: "https://images.pexels.com/photos/7447271/pexels-photo-7447271.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A child holding a plush toy while listening during a therapy session",
    },
    "occupational-therapy": {
      src: "https://images.pexels.com/photos/30483031/pexels-photo-30483031.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Children engaging in sensory play with clay, focusing on tactile stimulation",
    },
    physiotherapy: {
      src: "https://images.pexels.com/photos/5793917/pexels-photo-5793917.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A patient receiving hands-on therapy from a physiotherapist",
    },
    "special-education": {
      src: "https://images.pexels.com/photos/8537196/pexels-photo-8537196.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A teacher helping a child with a clay-molding activity in a kindergarten classroom",
    },
    "behavioral-therapy": {
      src: "https://images.pexels.com/photos/8653945/pexels-photo-8653945.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A young boy sitting comfortably during a therapy session",
    },
    "social-communication-groups": {
      src: "https://images.pexels.com/photos/8087941/pexels-photo-8087941.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A group of children interacting with their teacher, building social skills together",
    },
    "school-readiness": {
      src: "https://images.pexels.com/photos/35290755/pexels-photo-35290755.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A teacher assisting a child with an educational activity",
    },
    "play-groups": {
      src: "https://images.pexels.com/photos/10498532/pexels-photo-10498532.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Three young children playing creatively together indoors",
    },
  },
  /** Rehabilitation program hero banners. */
  programImages: {
    "pediatric-rehabilitation": {
      src: "https://images.pexels.com/photos/16873404/pexels-photo-16873404.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A smiling therapist holding therapy balls in a bright, colourful therapy studio",
      focal: "center 40%",
    },
    "neurological-rehabilitation": {
      src: "https://images.pexels.com/photos/6111585/pexels-photo-6111585.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A therapist supporting a patient with a prosthetic leg through a balance exercise",
      focal: "center 35%",
    },
    "orthopedic-musculoskeletal-rehabilitation": {
      src: "https://images.pexels.com/photos/30483049/pexels-photo-30483049.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A knee undergoing guided physiotherapy treatment",
      focal: "center 40%",
    },
    "geriatric-rehabilitation": {
      src: "https://images.pexels.com/photos/6922187/pexels-photo-6922187.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "An elderly man assisted by a trainer during a workout session in a gym setting",
      focal: "center 40%",
    },
  },
  /**
   * Per-program overrides for the homepage "Rehabilitation Programs" card —
   * falls back to programImages when a program has no override here, so most
   * programs share their hero photo while a few get a distinct one.
   */
  programOverviewImages: {
    "pediatric-rehabilitation": {
      src: "https://images.pexels.com/photos/6340559/pexels-photo-6340559.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A child receiving a gentle, soothing foot massage during a therapy session",
      focal: "center 40%",
    },
  },
  /** "How it helps" box images on each program's detail page. */
  programContentImages: {
    "pediatric-rehabilitation": {
      src: "https://images.pexels.com/photos/33607469/pexels-photo-33607469.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A young child involved in an arts and crafts session",
    },
    "neurological-rehabilitation": {
      src: "https://images.pexels.com/photos/20860622/pexels-photo-20860622.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A physiotherapist assisting a patient with stretching exercises",
    },
    "orthopedic-musculoskeletal-rehabilitation": {
      src: "https://images.pexels.com/photos/20860625/pexels-photo-20860625.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A physiotherapist helping a patient stretch their leg in a modern clinic",
    },
    "geriatric-rehabilitation": {
      src: "https://images.pexels.com/photos/7551631/pexels-photo-7551631.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "An older adult practising balance with a therapist in a bright room",
    },
  },
  /** "Who can benefit" box images on each program's detail page. */
  programWhoBenefitImages: {
    "pediatric-rehabilitation": {
      src: "https://images.pexels.com/photos/36713062/pexels-photo-36713062.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A mother and child drawing a colourful picture together",
    },
    "neurological-rehabilitation": {
      src: "https://images.pexels.com/photos/24193871/pexels-photo-24193871.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A senior patient using crutches to walk down a hospital corridor",
    },
    "orthopedic-musculoskeletal-rehabilitation": {
      src: "https://images.pexels.com/photos/13538710/pexels-photo-13538710.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A physiotherapist adjusting a leg strap on a patient in a clinical setting",
    },
    "geriatric-rehabilitation": {
      src: "https://images.pexels.com/photos/6922123/pexels-photo-6922123.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A fitness coach helping a senior man stretch on an exercise mat",
    },
  },
  /** Homepage/About "Conditions We Support" card images — distinct from the program hero photos. */
  conditionGroupImages: {
    "developmental-and-learning": {
      src: "https://images.pexels.com/photos/8653951/pexels-photo-8653951.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A therapist engaging with a child during a developmental support session",
    },
    neurological: {
      src: "https://images.pexels.com/photos/6975791/pexels-photo-6975791.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A caregiver assisting a person through a stretching exercise at home",
    },
    "orthopedic-and-musculoskeletal": {
      src: "https://images.pexels.com/photos/4506166/pexels-photo-4506166.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A clinician supporting a patient's shoulder and arm with a resistance band",
    },
    geriatric: {
      src: "https://images.pexels.com/photos/7551622/pexels-photo-7551622.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A caregiver helping an elderly man with arm exercises",
    },
  },
} as const;
