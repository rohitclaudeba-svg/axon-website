import type { ProgramEntry } from "./types";

export const programs: ProgramEntry[] = [
  {
    slug: "pediatric-rehabilitation",
    name: "Pediatric Rehabilitation",
    shortDescription: "Multidisciplinary support for children's development and growth.",
    icon: "pediatric",
    heroSummary:
      "Multidisciplinary rehabilitation that helps children build the skills to communicate, move, learn and grow.",
    whatItIs:
      "Our pediatric program brings speech therapy, occupational therapy, physiotherapy and special education together into one coordinated plan for each child.",
    supportAreas: [
      {
        title: "Early Development",
        description: "Supporting motor, communication and social milestones in early childhood.",
      },
      {
        title: "Multidisciplinary Coordination",
        description: "Speech, occupational therapy and physiotherapy working together on one coordinated plan.",
      },
      {
        title: "School Readiness",
        description: "Preparing children with the skills needed to participate confidently at school.",
      },
      {
        title: "Family Guidance",
        description: "Practical strategies for families to support progress at home.",
      },
      {
        title: "Motor Skills Development",
        description: "Supporting gross and fine motor milestones through structured activity.",
      },
      {
        title: "Communication & Language Growth",
        description: "Coordinated support for early speech and language development.",
      },
      {
        title: "Sensory Integration Support",
        description: "Helping children process and respond to sensory input.",
      },
      {
        title: "Social & Play Skills",
        description: "Building social interaction and play skills alongside peers.",
      },
      {
        title: "Behavioural & Emotional Support",
        description: "Strategies to support emotional regulation and positive behaviour.",
      },
      {
        title: "Feeding & Self-Care Skills",
        description: "Support for feeding, dressing and other daily self-care routines.",
      },
      {
        title: "Transition to School Support",
        description: "Preparing children for a confident start to formal schooling.",
      },
      {
        title: "Ongoing Developmental Monitoring",
        description: "Regular review of milestones to guide the coordinated plan.",
      },
    ],
    whoMayBenefit: [
      "Children with Autism Spectrum Disorder or ADHD",
      "Children with Cerebral Palsy or Developmental Delay",
      "Children with Down Syndrome, Learning Difficulties or Intellectual Disability",
      "Children with Speech & Language Delay",
    ],
    processSteps: [
      "Multidisciplinary assessment",
      "Coordinated personalised plan across relevant therapies",
      "Regular therapy and intervention sessions",
      "Ongoing progress monitoring with the family",
    ],
    faqs: [
      {
        question: "What conditions does the pediatric program support?",
        answer:
          "Our pediatric program supports children with Autism Spectrum Disorder, ADHD, Cerebral Palsy, Developmental Delay, Down Syndrome and related learning difficulties.",
      },
      {
        question: "How are multiple therapies coordinated for my child?",
        answer:
          "After a multidisciplinary assessment, our therapists build one coordinated plan across the relevant specialities, with regular progress reviews involving the family.",
      },
      {
        question: "How do I get started with the pediatric program?",
        answer: "Book an appointment through our website or by phone, and our team will arrange an initial assessment.",
      },
    ],
    relatedServiceSlugs: ["speech-therapy", "occupational-therapy", "special-education"],
    relatedConditionGroupSlugs: ["developmental-and-learning"],
    seo: {
      title: "Pediatric Rehabilitation",
      description:
        "AXON's pediatric rehabilitation program combines speech therapy, occupational therapy, physiotherapy and special education in one coordinated plan for children.",
    },
  },
  {
    slug: "neurological-rehabilitation",
    name: "Neurological Rehabilitation",
    shortDescription: "Structured recovery support after stroke and neurological conditions.",
    icon: "neurological",
    heroSummary:
      "Structured, personalised rehabilitation for individuals recovering from stroke and other neurological conditions.",
    whatItIs:
      "Our neurological rehabilitation program combines physiotherapy, occupational therapy and speech therapy to support recovery of movement, function and communication.",
    supportAreas: [
      {
        title: "Movement Recovery",
        description: "Rebuilding strength, coordination and mobility after neurological injury.",
      },
      {
        title: "Communication Recovery",
        description: "Supporting speech and language recovery after stroke or brain injury.",
      },
      {
        title: "Cognitive Support",
        description: "Strategies to support memory, attention and problem-solving.",
      },
      {
        title: "Daily Independence",
        description: "Rebuilding the skills needed for safe, independent daily living.",
      },
      {
        title: "Balance & Fall-Risk Management",
        description: "Improving stability to support safer movement.",
      },
      {
        title: "Upper Limb Rehabilitation",
        description: "Targeted therapy to rebuild arm and hand function.",
      },
      {
        title: "Swallowing Rehabilitation",
        description: "Support for swallowing difficulties following neurological injury.",
      },
      {
        title: "Fatigue Management",
        description: "Strategies to manage energy levels during recovery.",
      },
      {
        title: "Home Safety & Adaptation Guidance",
        description: "Recommendations to support safe movement at home.",
      },
      {
        title: "Caregiver & Family Support",
        description: "Guidance for families supporting a loved one's recovery.",
      },
      {
        title: "Return-to-Activity Planning",
        description: "Structured support for returning to daily activities and routines.",
      },
      {
        title: "Ongoing Progress Review",
        description: "Regular reassessment to adjust the plan as recovery progresses.",
      },
    ],
    whoMayBenefit: [
      "Individuals recovering from Stroke or Traumatic Brain Injury",
      "People with Parkinson's Disease, Multiple Sclerosis or Ataxia",
      "Individuals with Guillain-Barré Syndrome, Neuropathy or Post-polio syndrome",
      "Individuals seeking coordinated physiotherapy, occupational therapy and speech support during recovery",
    ],
    processSteps: [
      "Neurological and functional assessment",
      "Coordinated personalised rehabilitation plan",
      "Structured therapy and intervention",
      "Ongoing progress monitoring and plan adjustment",
    ],
    faqs: [
      {
        question: "Who is neurological rehabilitation for?",
        answer:
          "This program supports individuals recovering from stroke or traumatic brain injury, as well as those managing Parkinson's Disease, Multiple Sclerosis or related neurological conditions.",
      },
      {
        question: "What does the rehabilitation process involve?",
        answer:
          "It begins with a neurological and functional assessment, followed by a coordinated plan combining physiotherapy, occupational therapy and speech therapy as needed.",
      },
      {
        question: "How do I begin neurological rehabilitation at AXON?",
        answer: "Book an appointment through our website or by phone, and our team will arrange an initial assessment.",
      },
    ],
    relatedServiceSlugs: ["physiotherapy", "occupational-therapy", "speech-therapy"],
    relatedConditionGroupSlugs: ["neurological"],
    seo: {
      title: "Neurological Rehabilitation",
      description:
        "AXON's neurological rehabilitation program supports recovery after stroke, TBI, Parkinson's and other neurological conditions with a coordinated therapy plan.",
    },
  },
  {
    slug: "orthopedic-musculoskeletal-rehabilitation",
    name: "Orthopedic & Musculoskeletal Rehabilitation",
    shortDescription: "Recovery support for fractures, injuries and post-surgical care.",
    icon: "orthopedic",
    heroSummary:
      "Rehabilitation focused on restoring strength, mobility and function after orthopedic injury or surgery.",
    whatItIs:
      "This program combines physiotherapy and complementary therapies to support recovery from fractures, joint conditions, sports injuries and post-surgical rehabilitation.",
    supportAreas: [
      {
        title: "Post-Surgical Rehabilitation",
        description: "Structured recovery plans following joint replacement or surgery.",
      },
      {
        title: "Injury Recovery",
        description: "Targeted rehabilitation for fractures, sprains and sports injuries.",
      },
      {
        title: "Pain & Mobility",
        description: "Reducing pain and restoring movement for chronic joint and muscle conditions.",
      },
      {
        title: "Strength & Conditioning",
        description: "Building strength to support long-term movement health.",
      },
      {
        title: "Joint Replacement Recovery",
        description: "Structured rehabilitation following hip, knee or shoulder replacement.",
      },
      {
        title: "Sports Injury Rehabilitation",
        description: "Recovery plans tailored to sport-specific movement demands.",
      },
      {
        title: "Spinal & Back Care",
        description: "Support for low back and neck pain through guided therapy.",
      },
      {
        title: "Arthritis Management",
        description: "Movement-based strategies to manage arthritis-related pain and stiffness.",
      },
      {
        title: "Postural Correction",
        description: "Addressing postural patterns that contribute to musculoskeletal strain.",
      },
      {
        title: "Manual Therapy",
        description: "Hands-on techniques to ease stiffness and improve mobility.",
      },
      {
        title: "Return-to-Sport Planning",
        description: "Guided progression back to sport or physical activity.",
      },
      {
        title: "Home Exercise Guidance",
        description: "Personalised exercise plans to support recovery between sessions.",
      },
    ],
    whoMayBenefit: [
      "Individuals recovering from fractures, dislocations or joint replacements",
      "People with sports injuries, arthritis or tendonitis/bursitis",
      "Individuals with low back pain, neck pain or postural disorders",
      "Individuals undergoing post-surgical rehabilitation for orthopedic procedures",
    ],
    processSteps: [
      "Musculoskeletal assessment",
      "Personalised recovery plan",
      "Guided physiotherapy and rehabilitation exercises",
      "Progress review and plan adjustment",
    ],
    faqs: [
      {
        question: "Who benefits from this program?",
        answer:
          "This program supports individuals recovering from fractures, joint replacements, sports injuries or managing arthritis and postural disorders.",
      },
      {
        question: "What does recovery involve?",
        answer:
          "Recovery begins with a musculoskeletal assessment, followed by a personalised plan of guided physiotherapy and rehabilitation exercises.",
      },
      {
        question: "How do I book this program?",
        answer: "Book an appointment through our website or by phone, and our team will help confirm your plan.",
      },
    ],
    relatedServiceSlugs: ["physiotherapy"],
    relatedConditionGroupSlugs: ["orthopedic-and-musculoskeletal"],
    seo: {
      title: "Orthopedic & Musculoskeletal Rehabilitation",
      description:
        "AXON's orthopedic and musculoskeletal rehabilitation program supports recovery from fractures, sports injuries, joint conditions and post-surgical care.",
    },
  },
  {
    slug: "geriatric-rehabilitation",
    name: "Geriatric Rehabilitation",
    shortDescription: "Supporting independence, balance and function in older adults.",
    icon: "geriatric",
    heroSummary:
      "Gentle, personalised rehabilitation that helps older adults maintain independence, balance and quality of life.",
    whatItIs:
      "Our geriatric rehabilitation program combines physiotherapy and occupational therapy to support balance, mobility and everyday functional independence.",
    supportAreas: [
      {
        title: "Balance & Fall Prevention",
        description: "Improving stability and confidence to reduce fall risk.",
      },
      {
        title: "Mobility & Independence",
        description: "Supporting safe movement for everyday activities.",
      },
      {
        title: "Post-Hip-Replacement Care",
        description: "Guided recovery following hip replacement surgery.",
      },
      {
        title: "Cognitive & Functional Support",
        description: "Strategies to support daily functioning for age-related cognitive changes.",
      },
      {
        title: "Strength & Conditioning",
        description: "Gentle strength-building to support everyday movement.",
      },
      {
        title: "Gait & Walking Support",
        description: "Improving walking stability and confidence.",
      },
      {
        title: "Home Safety Assessment",
        description: "Guidance to help reduce fall risk within the home.",
      },
      {
        title: "Dementia-Related Support",
        description: "Structured, gentle therapy tailored for individuals with dementia.",
      },
      {
        title: "Chronic Condition Management",
        description: "Movement-based support alongside long-term health conditions.",
      },
      {
        title: "Caregiver Guidance",
        description: "Practical strategies for family members and caregivers.",
      },
      {
        title: "Social Engagement Support",
        description: "Encouraging participation in meaningful daily activities.",
      },
      {
        title: "Ongoing Wellness Review",
        description: "Regular review to adapt the plan as needs change over time.",
      },
    ],
    whoMayBenefit: [
      "Older adults with balance or fall-risk concerns",
      "Individuals with dementia or Alzheimer's-related rehabilitation needs",
      "People recovering from hip replacement or managing age-related functional decline",
      "Older adults managing osteoporosis, frailty or chronic pain",
    ],
    processSteps: [
      "Functional and mobility assessment",
      "Personalised rehabilitation plan",
      "Structured, gentle therapy sessions",
      "Ongoing progress monitoring with family involvement",
    ],
    faqs: [
      {
        question: "Who is geriatric rehabilitation for?",
        answer:
          "This program supports older adults managing balance or fall-risk concerns, recovering from hip replacement, or living with dementia-related needs.",
      },
      {
        question: "What does a session involve?",
        answer: "Sessions begin with a functional and mobility assessment, followed by a personalised plan of gentle, structured therapy.",
      },
      {
        question: "How do I book this program for a family member?",
        answer: "Book an appointment through our website or by phone, and our team will help guide you through the process.",
      },
    ],
    relatedServiceSlugs: ["physiotherapy", "occupational-therapy"],
    relatedConditionGroupSlugs: ["geriatric"],
    seo: {
      title: "Geriatric Rehabilitation",
      description:
        "AXON's geriatric rehabilitation program supports older adults with balance, mobility and independence through personalised, gentle therapy.",
    },
  },
];

export function getProgramBySlug(slug: string): ProgramEntry | undefined {
  return programs.find((program) => program.slug === slug);
}
