import type { ServiceEntry } from "./types";

export const services: ServiceEntry[] = [
  {
    slug: "speech-therapy",
    name: "Speech Therapy",
    shortDescription: "Support for communication, language and swallowing difficulties.",
    icon: "speech",
    heroSummary:
      "Personalised speech and language therapy to help children and adults communicate with confidence.",
    whatItIs:
      "Speech therapy addresses difficulties with speech clarity, language development, communication and swallowing. Sessions are tailored to each individual's needs and goals.",
    supportAreas: [
      {
        title: "Articulation & Speech Clarity",
        description: "Building clearer speech sounds through structured oral-motor and phonetic practice.",
      },
      {
        title: "Language Development",
        description: "Growing vocabulary, sentence structure and understanding through guided activities.",
      },
      {
        title: "Social Communication",
        description: "Practising conversation, turn-taking and social language in real-world contexts.",
      },
      {
        title: "AAC & Alternative Communication",
        description: "Introducing picture systems, signs or devices for individuals who benefit from alternative communication.",
      },
      {
        title: "Fluency & Stuttering Support",
        description: "Techniques to build smoother, more confident speech flow.",
      },
      {
        title: "Voice Therapy",
        description: "Support for vocal quality, pitch and volume concerns.",
      },
      {
        title: "Swallowing & Feeding Support",
        description: "Guidance for individuals experiencing swallowing difficulties.",
      },
      {
        title: "Auditory Processing",
        description: "Strategies to support how sounds and language are understood and processed.",
      },
      {
        title: "Early Communication Skills",
        description: "Building foundational communication skills in toddlers and young children.",
      },
      {
        title: "Literacy & Reading Readiness",
        description: "Connecting spoken language skills to early reading development.",
      },
      {
        title: "Group Communication Sessions",
        description: "Practising communication skills alongside peers in a supported setting.",
      },
      {
        title: "Parent & Caregiver Coaching",
        description: "Practical strategies for families to support communication at home.",
      },
    ],
    whoMayBenefit: [
      "Children with delayed speech or language development",
      "Individuals with Autism Spectrum Disorder or developmental delay",
      "People recovering from stroke or traumatic brain injury",
      "Anyone experiencing difficulty with clarity, fluency or swallowing",
    ],
    processSteps: [
      "Initial communication and swallowing assessment",
      "Personalised therapy goals agreed with the family/individual",
      "Structured therapy sessions with progress tracking",
      "Ongoing review and plan adjustment",
    ],
    faqs: [
      {
        question: "Who can benefit from speech therapy at AXON?",
        answer:
          "Speech therapy can help children and adults with delayed speech or language development, Autism Spectrum Disorder, difficulty with clarity or fluency, or communication changes after a stroke or brain injury.",
      },
      {
        question: "What does a speech therapy plan involve?",
        answer:
          "Every plan starts with an initial communication assessment, followed by personalised goals, structured therapy sessions and ongoing review as progress is made.",
      },
      {
        question: "How do I start speech therapy at AXON?",
        answer: "You can book an appointment through our website or by phone, and our team will help match you with the right speech therapist.",
      },
    ],
    relatedServiceSlugs: ["occupational-therapy", "special-education"],
    relatedProgramSlugs: ["pediatric-rehabilitation", "neurological-rehabilitation"],
    seo: {
      title: "Speech Therapy",
      description:
        "Speech therapy at AXON supports communication, language and swallowing difficulties for children and adults with a personalised, assessment-led approach.",
    },
  },
  {
    slug: "occupational-therapy",
    name: "Occupational Therapy",
    shortDescription: "Building everyday skills for independence at home, school and work.",
    icon: "occupational",
    heroSummary:
      "Occupational therapy that helps individuals build the skills they need for daily life, learning and independence.",
    whatItIs:
      "Occupational therapy focuses on fine motor skills, sensory processing, self-care and functional independence, using structured, engaging activities.",
    supportAreas: [
      {
        title: "Fine Motor Skills",
        description: "Strengthening hand and finger control for writing, dressing and daily tasks.",
      },
      {
        title: "Sensory Processing",
        description: "Helping individuals regulate and respond to sensory input in daily environments.",
      },
      {
        title: "Daily Living Skills",
        description: "Building independence in self-care routines like dressing, feeding and grooming.",
      },
      {
        title: "Handwriting & School Readiness",
        description: "Supporting the motor and attention skills needed for classroom participation.",
      },
      {
        title: "Gross Motor Coordination",
        description: "Building balance, coordination and body awareness for everyday movement.",
      },
      {
        title: "Visual-Motor Integration",
        description: "Improving hand-eye coordination for tasks like copying, catching and cutting.",
      },
      {
        title: "Play Skills Development",
        description: "Encouraging purposeful, engaged play to build developmental skills.",
      },
      {
        title: "Self-Regulation Strategies",
        description: "Techniques to support emotional and sensory regulation.",
      },
      {
        title: "Adaptive Equipment Guidance",
        description: "Recommendations for tools and equipment that support daily independence.",
      },
      {
        title: "Workplace & Ergonomic Support",
        description: "Strategies to support safe, sustainable movement in work settings.",
      },
      {
        title: "Community Participation Skills",
        description: "Building the skills needed to take part confidently in community activities.",
      },
      {
        title: "Caregiver Training",
        description: "Guidance for families and caregivers to support progress at home.",
      },
    ],
    whoMayBenefit: [
      "Children with developmental delay, ASD or sensory processing difficulties",
      "Individuals recovering from neurological or orthopedic injury",
      "People needing support with daily living skills",
      "Older adults working to maintain independence",
    ],
    processSteps: [
      "Functional and sensory assessment",
      "Individualised therapy plan",
      "Skill-building sessions using purposeful activity",
      "Progress monitoring with family/caregiver involvement",
    ],
    faqs: [
      {
        question: "Who can benefit from occupational therapy?",
        answer:
          "Occupational therapy supports children with developmental delay or sensory processing difficulties, individuals recovering from injury, and older adults working to maintain independence in daily life.",
      },
      {
        question: "What does an occupational therapy session involve?",
        answer:
          "Sessions begin with a functional and sensory assessment, followed by an individualised plan built around purposeful, skill-building activities.",
      },
      {
        question: "How do I book occupational therapy at AXON?",
        answer: "Book an appointment through our website or by phone, and our team will help coordinate the right plan for you.",
      },
    ],
    relatedServiceSlugs: ["speech-therapy", "physiotherapy"],
    relatedProgramSlugs: ["pediatric-rehabilitation", "geriatric-rehabilitation"],
    seo: {
      title: "Occupational Therapy",
      description:
        "AXON's occupational therapy builds everyday skills, independence and sensory regulation for children, adults and older adults through personalised care.",
    },
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    shortDescription: "Movement, strength and pain management for injury and recovery.",
    icon: "physiotherapy",
    heroSummary:
      "Physiotherapy to restore movement, reduce pain and rebuild strength after injury, surgery or illness.",
    whatItIs:
      "Physiotherapy uses movement-based assessment and treatment to address pain, mobility limitations and musculoskeletal or neurological conditions.",
    supportAreas: [
      {
        title: "Pain Management",
        description: "Reducing pain through hands-on therapy and guided movement.",
      },
      {
        title: "Mobility & Strength",
        description: "Rebuilding strength, flexibility and range of motion after injury or surgery.",
      },
      {
        title: "Balance & Coordination",
        description: "Improving stability to support safe, confident movement.",
      },
      {
        title: "Post-Surgical Recovery",
        description: "Structured rehabilitation to support recovery after orthopedic surgery.",
      },
      {
        title: "Sports Injury Rehabilitation",
        description: "Targeted recovery plans to help athletes return to activity safely.",
      },
      {
        title: "Posture Correction",
        description: "Addressing postural imbalances that contribute to pain and discomfort.",
      },
      {
        title: "Neurological Movement Therapy",
        description: "Movement-focused rehabilitation for neurological conditions.",
      },
      {
        title: "Manual Therapy",
        description: "Hands-on techniques to reduce stiffness and improve joint mobility.",
      },
      {
        title: "Exercise Prescription",
        description: "Personalised exercise programs to support long-term movement health.",
      },
      {
        title: "Gait Training",
        description: "Improving walking pattern, stability and confidence.",
      },
      {
        title: "Pre & Post-Operative Guidance",
        description: "Preparation and recovery support around surgical procedures.",
      },
      {
        title: "Ergonomic & Lifestyle Advice",
        description: "Practical guidance to reduce strain in daily activities.",
      },
    ],
    whoMayBenefit: [
      "People recovering from fractures, sports injuries or surgery",
      "Individuals with arthritis, back pain or postural disorders",
      "Stroke or neurological rehabilitation patients",
      "Older adults managing balance or fall-risk concerns",
    ],
    processSteps: [
      "Movement and pain assessment",
      "Personalised treatment and exercise plan",
      "Hands-on therapy and guided rehabilitation exercises",
      "Progress review and plan adjustment",
    ],
    faqs: [
      {
        question: "Who is physiotherapy suitable for?",
        answer:
          "Physiotherapy supports people recovering from fractures, sports injuries or surgery, as well as those managing arthritis, back pain or balance concerns.",
      },
      {
        question: "What can I expect from a physiotherapy plan?",
        answer:
          "Your plan begins with a movement and pain assessment, followed by a personalised treatment plan combining hands-on therapy and guided exercises.",
      },
      {
        question: "How do I book a physiotherapy appointment?",
        answer: "You can request an appointment through our website or by phone, and our team will confirm a time with the right therapist.",
      },
    ],
    relatedServiceSlugs: ["occupational-therapy"],
    relatedProgramSlugs: ["orthopedic-musculoskeletal-rehabilitation", "geriatric-rehabilitation"],
    seo: {
      title: "Physiotherapy",
      description:
        "Physiotherapy at AXON helps restore movement, manage pain and rebuild strength after injury, surgery or illness with a personalised treatment plan.",
    },
  },
  {
    slug: "special-education",
    name: "Special Education",
    shortDescription: "Individualised learning support for children with learning differences.",
    icon: "special-education",
    heroSummary:
      "Individualised education support that helps every child learn in a way that fits how they learn best.",
    whatItIs:
      "Special education services provide individualised learning plans and structured teaching strategies for children with learning difficulties or developmental needs.",
    supportAreas: [
      {
        title: "Individualised Learning Plans",
        description: "Learning goals and teaching strategies tailored to each child's pace and style.",
      },
      {
        title: "Literacy & Numeracy Support",
        description: "Building foundational reading, writing and maths skills.",
      },
      {
        title: "Attention & Focus",
        description: "Strategies to support concentration and on-task behaviour in learning settings.",
      },
      {
        title: "Life & Social Skills",
        description: "Developing skills for independence and positive social interaction.",
      },
      {
        title: "Communication in the Classroom",
        description: "Supporting functional communication within a learning environment.",
      },
      {
        title: "Behavioural Support Strategies",
        description: "Positive strategies to support behaviour and engagement in learning.",
      },
      {
        title: "Transition Planning",
        description: "Preparing children for transitions between classes, schools or learning stages.",
      },
      {
        title: "Assistive Technology in Learning",
        description: "Introducing tools and technology that support access to learning.",
      },
      {
        title: "Sensory-Friendly Learning Strategies",
        description: "Adapting learning environments to support sensory needs.",
      },
      {
        title: "Parent & Teacher Collaboration",
        description: "Coordinating strategies between home and school for consistent support.",
      },
      {
        title: "Group Learning Sessions",
        description: "Structured small-group sessions to build social and academic skills together.",
      },
      {
        title: "Progress-Based Curriculum Planning",
        description: "Adjusting learning plans as goals are met and new needs emerge.",
      },
    ],
    whoMayBenefit: [
      "Children with learning difficulties or intellectual disability",
      "Children with ADHD, ASD, Down syndrome or developmental delay",
      "Families seeking structured, individualised learning support",
    ],
    processSteps: [
      "Learning needs assessment",
      "Individualised education plan",
      "Structured, goal-based teaching sessions",
      "Regular progress review with families",
    ],
    faqs: [
      {
        question: "Which children benefit from special education support?",
        answer: "Our special education service supports children with learning difficulties, ADHD, Autism Spectrum Disorder, Down syndrome or developmental delay.",
      },
      {
        question: "How is a learning plan created?",
        answer:
          "We begin with a learning needs assessment, then build an individualised education plan with structured, goal-based teaching sessions.",
      },
      {
        question: "How do I enrol my child in special education support?",
        answer: "Book an appointment through our website or by phone, and our team will guide you through the assessment process.",
      },
    ],
    relatedServiceSlugs: ["speech-therapy", "occupational-therapy"],
    relatedProgramSlugs: ["pediatric-rehabilitation"],
    seo: {
      title: "Special Education",
      description:
        "AXON's special education service offers individualised learning plans and structured support for children with learning differences and developmental needs.",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return services.find((service) => service.slug === slug);
}
