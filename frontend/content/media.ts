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
    src: "https://images.pexels.com/photos/5452190/pexels-photo-5452190.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Three clinical team members in discussion during a workday at the centre",
  },
  contactImage: {
    src: "https://images.pexels.com/photos/33812025/pexels-photo-33812025.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "A warm, contemporary clinic reception area with wood panel accents",
    focal: "center 40%",
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
      src: "https://images.pexels.com/photos/8923081/pexels-photo-8923081.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A teacher smiling while working through a writing activity with a child",
      focal: "center 30%",
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
      src: "https://images.pexels.com/photos/8535145/pexels-photo-8535145.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A therapist guiding a child through a hands-on developmental activity",
      focal: "center 30%",
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
      src: "https://images.pexels.com/photos/7551627/pexels-photo-7551627.jpeg?auto=compress&cs=tinysrgb&w=1200",
      alt: "A therapist guiding an older adult through an arm-raising mobility exercise",
      focal: "center 30%",
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
      src: "https://images.pexels.com/photos/8422162/pexels-photo-8422162.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "A group of children of different ages focused on an activity indoors",
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
  /** Founder portraits — both are real supplied photos. */
  teamImages: {
    sharan: {
      src: "/team/sharan.jpeg",
      alt: "Sharan, Co-Founder & Clinical Director — Physiotherapy",
      focal: "center 25%",
    },
    divya: {
      src: "/team/Divya.jpeg",
      alt: "Divya D., Founder & Consultant — Speech-Language Pathologist",
      focal: "center 38%",
    },
  },
} as const;
