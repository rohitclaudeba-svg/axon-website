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
  {
    slug: "behavioral-therapy",
    name: "Behavioral Therapy",
    shortDescription: "Positive, structured support for behaviour, focus and emotional regulation.",
    icon: "behavioral-therapy",
    heroSummary:
      "Structured, positive-reinforcement-based behavioural therapy that helps children and adults manage emotions, reduce challenging behaviours and build lasting everyday skills.",
    whatItIs:
      "Children and adults with Autism Spectrum Disorder, ADHD or developmental delay often find it hard to manage attention, emotions and behaviour in ways that affect learning, communication and daily life. Our behavioural therapy combines a detailed behavioural assessment with individualised, positive-reinforcement-based strategies — helping each person build self-regulation, communication and social skills, while reducing behaviours that get in the way of learning and connection.",
    supportAreas: [
      {
        title: "Difficulty Following Instructions & Maintaining Focus",
        description: "Struggling with attention and completing tasks.",
      },
      {
        title: "Emotional Outbursts in Social or Learning Settings",
        description: "Finding it hard to regulate big emotions.",
      },
      {
        title: "Difficulty Adapting to Change & New Situations",
        description: "Feeling distressed when routines are altered.",
      },
      {
        title: "Struggles with Social Interaction & Communication",
        description: "Difficulty reading social cues and engaging with others.",
      },
      {
        title: "Repetitive Behaviours That Interfere with Learning & Play",
        description: "Patterns that limit engagement and development.",
      },
    ],
    approachSections: [
      {
        title: "Behavioural Assessment & Individualised Strategies",
        intro:
          "Our therapy begins with a detailed behavioural assessment to understand each child's strengths, challenges and triggers. Based on this, we build an intervention plan that includes:",
        items: [
          {
            title: "Behaviour Modification Techniques",
            description: "Encouraging positive behaviours while reducing unwanted ones.",
          },
          {
            title: "Reinforcement-Based Learning",
            description: "Building social and communication skills through structured, repeatable approaches.",
          },
        ],
      },
      {
        title: "Positive Reinforcement & Structured Learning",
        intro: "We use positive reinforcement to shape desired behaviours and build independence through:",
        items: [
          {
            title: "Reward-Based Learning",
            description: "Encouraging motivation through consistent, positive feedback.",
          },
          {
            title: "Clear & Structured Routines",
            description: "Helping children understand expectations and daily activities.",
          },
          {
            title: "Visual Schedules & Communication Aids",
            description: "Supporting focus and comprehension through visual supports.",
          },
        ],
      },
      {
        title: "Emotional Regulation & Coping Mechanisms",
        intro:
          "Many of the children we work with find it hard to regulate big emotions, which can lead to meltdowns or withdrawal. Our therapy focuses on:",
        items: [
          {
            title: "Self-Regulation Techniques",
            description: "Teaching breathing exercises and calming strategies.",
          },
          {
            title: "Recognising & Expressing Emotions",
            description: "Helping children communicate their feelings constructively.",
          },
          {
            title: "Sensory-Friendly Strategies",
            description: "Managing overstimulation and anxiety in daily settings.",
          },
        ],
      },
      {
        title: "Social Skills Training & Peer Interaction",
        intro: "Building social confidence is a key part of therapy. We use:",
        items: [
          {
            title: "Role-Play & Guided Practice",
            description: "Developing conversation and social interaction skills.",
          },
          {
            title: "Group Activities",
            description: "Encouraging teamwork, patience and cooperation with peers.",
          },
        ],
      },
      {
        title: "Reducing Unwanted Behaviours",
        intro: "Repetitive or disruptive behaviours can get in the way of learning and connection. We work on:",
        items: [
          {
            title: "Minimising Self-Stimulatory Behaviours",
            description: "Supporting children to manage stimming in a way that works for them.",
          },
          {
            title: "Smoother Activity Transitions",
            description: "Helping children adjust between activities with less distress.",
          },
        ],
      },
      {
        title: "Parent Training & Home-Based Support",
        intro: "Consistent progress depends on involving families. We work with parents and caregivers through:",
        items: [
          {
            title: "Behaviour Management Techniques",
            description: "Practical strategies for everyday use at home.",
          },
          {
            title: "Handling Challenging Moments",
            description: "Equipping parents to manage real-life situations calmly and effectively.",
          },
          {
            title: "Creating a Supportive Home Environment",
            description: "Reinforcing therapy goals for long-term progress.",
          },
        ],
      },
    ],
    whoMayBenefit: [
      "Children with Autism Spectrum Disorder (ASD)",
      "Children with ADHD or Oppositional Defiant Disorder (ODD)",
      "Children facing social anxiety or communication challenges",
      "Children with developmental delay or learning difficulties",
    ],
    processSteps: [
      "Behavioural and functional assessment",
      "Individualised, goal-based behaviour support plan",
      "Structured therapy sessions using positive reinforcement",
      "Ongoing review with family and school involvement",
    ],
    faqs: [
      {
        question: "Who can benefit from behavioural therapy at AXON?",
        answer:
          "Behavioural therapy supports children with Autism Spectrum Disorder, ADHD, Oppositional Defiant Disorder, or those facing social anxiety, communication challenges or developmental delay, along with families needing consistent strategies at home.",
      },
      {
        question: "What does a behavioural therapy plan involve?",
        answer:
          "It begins with a functional behaviour assessment, followed by an individualised plan combining positive reinforcement, emotional-regulation coaching and social skills training, with consistent strategies carried through at home and school.",
      },
      {
        question: "What makes AXON's approach to behavioural therapy different?",
        answer:
          "Our therapists coordinate behavioural therapy alongside AXON's speech, occupational therapy and special-education teams where needed, so a child's plan stays consistent across every part of their care rather than working in isolation.",
      },
      {
        question: "How do I start behavioural therapy at AXON?",
        answer: "Book an appointment through our website or by phone, and our team will arrange an initial assessment.",
      },
    ],
    relatedServiceSlugs: ["special-education", "occupational-therapy"],
    relatedProgramSlugs: ["pediatric-rehabilitation"],
    seo: {
      title: "Behavioral Therapy",
      description:
        "AXON's behavioural therapy service uses positive reinforcement and individualised strategies to support behaviour, attention and emotional regulation for children with ASD, ADHD and related needs.",
    },
  },
  {
    slug: "social-communication-groups",
    name: "Social & Communication Groups",
    shortDescription: "Guided group sessions that build social confidence and communication skills.",
    icon: "social-groups",
    heroSummary:
      "Small-group sessions that help children and adults build social confidence, communication skills and meaningful peer connections.",
    whatItIs:
      "Social & communication groups bring individuals together in a supported, small-group setting to practise conversation, turn-taking, social problem-solving and friendship skills alongside peers.",
    supportAreas: [
      {
        title: "Conversation & Turn-Taking",
        description: "Practising back-and-forth conversation in a supported group setting.",
      },
      {
        title: "Social Problem-Solving",
        description: "Guided practice working through social situations and conflicts.",
      },
      {
        title: "Reading Social Cues",
        description: "Building awareness of tone, body language and facial expression.",
      },
      {
        title: "Friendship & Peer Skills",
        description: "Developing the skills needed to build and maintain friendships.",
      },
      {
        title: "Group Play & Collaboration",
        description: "Structured group activities that build cooperative play skills.",
      },
      {
        title: "Emotional Expression in Groups",
        description: "Practising sharing feelings and perspectives with peers.",
      },
      {
        title: "Confidence Building",
        description: "Supportive group settings that build social confidence over time.",
      },
      {
        title: "Family Debrief & Strategies",
        description: "Sharing progress and strategies with families after each group session.",
      },
    ],
    whoMayBenefit: [
      "Children and teens with Autism Spectrum Disorder or social communication difficulties",
      "Individuals working on friendship and peer-interaction skills",
      "Children with speech and language delay wanting peer practice",
      "Families looking for a supported, small-group setting to build social confidence",
    ],
    processSteps: [
      "Social communication assessment",
      "Placement into a small, compatible peer group",
      "Structured weekly group sessions",
      "Progress review and family feedback",
    ],
    faqs: [
      {
        question: "Who are social & communication groups for?",
        answer:
          "These groups support children and teens with Autism Spectrum Disorder, social communication difficulties, or those simply looking to build friendship and peer-interaction skills in a supported setting.",
      },
      {
        question: "How are groups formed?",
        answer: "Groups are formed based on an initial social communication assessment, matching participants by age and compatible goals.",
      },
      {
        question: "How do I enrol in a social & communication group?",
        answer: "Book an appointment through our website or by phone, and our team will guide you through assessment and group placement.",
      },
    ],
    relatedServiceSlugs: ["speech-therapy", "special-education"],
    relatedProgramSlugs: ["pediatric-rehabilitation"],
    seo: {
      title: "Social & Communication Groups",
      description:
        "AXON's social & communication groups build social confidence, conversation and peer skills for children and teens in a supported, small-group setting.",
    },
  },
  {
    slug: "school-readiness",
    name: "School Readiness",
    shortDescription: "Preparing children with the skills and confidence to thrive at school.",
    icon: "school-readiness",
    heroSummary:
      "School readiness support that builds the academic, social and self-help skills children need for a confident start at school.",
    whatItIs:
      "School readiness support brings together speech, occupational therapy and special-education strategies to prepare children for the academic, social and functional demands of a classroom setting.",
    supportAreas: [
      {
        title: "Pre-Literacy & Pre-Numeracy Skills",
        description: "Building the foundations for reading, writing and early maths.",
      },
      {
        title: "Fine Motor & Handwriting Readiness",
        description: "Strengthening the hand skills needed for writing and classroom tasks.",
      },
      {
        title: "Following Instructions & Routines",
        description: "Practising listening, following multi-step instructions and classroom routines.",
      },
      {
        title: "Classroom Social Skills",
        description: "Building sharing, turn-taking and group participation skills.",
      },
      {
        title: "Attention & Task Persistence",
        description: "Strategies to support focus and completing tasks independently.",
      },
      {
        title: "Self-Help & Independence Skills",
        description: "Building independence with belongings, dressing and mealtime routines at school.",
      },
      {
        title: "Communication for Learning",
        description: "Supporting the communication skills needed to ask for help and participate in class.",
      },
      {
        title: "Transition-to-School Planning",
        description: "Practical preparation and family guidance ahead of starting school.",
      },
    ],
    whoMayBenefit: [
      "Children preparing to start preschool or primary school",
      "Children with developmental delay, speech delay or learning difficulties",
      "Families wanting a structured, multidisciplinary plan before the school transition",
    ],
    processSteps: [
      "School-readiness assessment across key developmental areas",
      "Individualised, multidisciplinary preparation plan",
      "Structured skill-building sessions",
      "Transition planning and review with families",
    ],
    faqs: [
      {
        question: "Who is school readiness support for?",
        answer:
          "This service supports children preparing to start preschool or primary school, including those with developmental delay, speech delay or learning difficulties.",
      },
      {
        question: "What does a school readiness plan include?",
        answer:
          "It combines pre-literacy, fine motor, communication and classroom social skills, built around a school-readiness assessment and reviewed as your child progresses.",
      },
      {
        question: "How do I start school readiness support?",
        answer: "Book an appointment through our website or by phone, and our team will arrange an initial assessment.",
      },
    ],
    relatedServiceSlugs: ["special-education", "occupational-therapy"],
    relatedProgramSlugs: ["pediatric-rehabilitation"],
    seo: {
      title: "School Readiness",
      description:
        "AXON's school readiness service prepares children with the academic, social and self-help skills needed for a confident start at school.",
    },
  },
  {
    slug: "play-groups",
    name: "Play Groups",
    shortDescription: "Guided group play sessions that build developmental and social skills.",
    icon: "play-groups",
    heroSummary:
      "Guided play group sessions that turn everyday play into an opportunity to build developmental, motor and social skills.",
    whatItIs:
      "Play groups use structured, therapist-guided play in a small-group setting to support motor development, sensory regulation, communication and social interaction.",
    supportAreas: [
      {
        title: "Structured Group Play",
        description: "Therapist-guided play activities that build developmental skills.",
      },
      {
        title: "Motor Skills Through Play",
        description: "Supporting gross and fine motor development through movement-based play.",
      },
      {
        title: "Sensory Play & Regulation",
        description: "Play activities that support healthy sensory processing.",
      },
      {
        title: "Turn-Taking & Sharing",
        description: "Practising cooperative play skills alongside peers.",
      },
      {
        title: "Early Communication in Play",
        description: "Encouraging communication and requesting during play.",
      },
      {
        title: "Imaginative & Social Play",
        description: "Building pretend play and social interaction skills.",
      },
      {
        title: "Parent Participation & Coaching",
        description: "Involving families in play strategies to continue at home.",
      },
    ],
    whoMayBenefit: [
      "Toddlers and young children with developmental delay",
      "Children working on motor, sensory or early social skills",
      "Families looking for guided, therapeutic play in a group setting",
    ],
    processSteps: [
      "Developmental screening",
      "Placement into an age- and needs-matched play group",
      "Structured, therapist-guided group play sessions",
      "Ongoing progress review with families",
    ],
    faqs: [
      {
        question: "Who are play groups for?",
        answer:
          "Play groups support toddlers and young children with developmental delay, or those working on motor, sensory or early social skills, in a guided group setting.",
      },
      {
        question: "What happens in a play group session?",
        answer: "Sessions use structured, therapist-guided play activities that build motor, sensory, communication and social skills alongside peers.",
      },
      {
        question: "How do I join a play group?",
        answer: "Book an appointment through our website or by phone, and our team will guide you through a short developmental screening and group placement.",
      },
    ],
    relatedServiceSlugs: ["occupational-therapy", "speech-therapy"],
    relatedProgramSlugs: ["pediatric-rehabilitation"],
    seo: {
      title: "Play Groups",
      description:
        "AXON's play groups use guided, therapist-led group play to build motor, sensory, communication and social skills in young children.",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return services.find((service) => service.slug === slug);
}
