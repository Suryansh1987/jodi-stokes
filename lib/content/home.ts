export type NavLink = {
  href: string;
  label: string;
};

export type CtaLink = NavLink & {
  variant?: "primary" | "ghost";
};

export type HeroStat = {
  value: string;
  accent?: string;
  label: string;
};

export type HeroChip = {
  title: string;
  label: string;
};

export type HeroProgramCard = {
  eyebrow: string;
  title: string;
  detail: string;
};

export type HeroVideoPreview = {
  title: string;
  description: string;
};

export type Pillar = {
  number: string;
  role: string;
  title: string;
  accent: string;
  description: string;
};

export type Credential = {
  title: string;
  description: string;
};

export type AboutStat = {
  value: string;
  label: string;
};

export type AboutBreakout = {
  title: string;
  description: string;
  cta: NavLink;
};

export type Program = {
  title: string;
  description: string;
  tags: string[];
  features: string[];
  price: string;
  priceNote?: string;
  featured?: boolean;
  image?: {
    src: string;
    alt: string;
  };
  artLabel?: string;
};

export type ShopProduct = {
  name: string;
  category: string;
  price: string;
  compareAtPrice?: string;
  badge?: string;
  badgeTone?: "mint" | "coral";
  art: "tee" | "bottle" | "mat" | "cap" | "crew" | "bands" | "journal" | "bag";
  colors: string[];
  availability?: string;
  shippingNote?: string;
  quickNote?: string;
};

export type Testimonial = {
  quote: string;
  result: string;
  resultNote: string;
  initials: string;
  name: string;
  detail: string;
  tenure?: string;
  focus?: string;
};

export type JournalPost = {
  category: string;
  readTime: string;
  date: string;
  title: string;
  description: string;
  deco: string;
  author: string;
  tags: string[];
  href: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavLink[];
};

export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#book", label: "The Book" },
  { href: "#shop", label: "Shop" },
  { href: "#coaching", label: "Coaching" },
  { href: "#journal", label: "Journal" },
];

export const marqueeMessages = [
  "Free shipping over $75",
  'New Book "Water Exercise" - signed copies available',
  "1:1 coaching slots open for fall",
  "Train · Lifestyle · Nutrition",
];

export const mobileSocialLinks = [
  // [PLACEHOLDER] Social URLs are temporary. [TODO] Replace with real profiles.
  { href: "#", label: "Instagram", shortLabel: "IG" },
  { href: "#", label: "TikTok", shortLabel: "TT" },
  { href: "#", label: "YouTube", shortLabel: "YT" },
];

export const heroContent = {
  badge: "Coaching · Lifestyle · Nutrition - Est. 2009",
  headline: {
    intro: "That's it,",
    script: "be fitt.",
    outro: "Train with Jodi.",
  },
  lead:
    "Sustainable fitness, smart nutrition, and a lifestyle you'll actually keep. 15 years of coaching boiled down into programs, products, and one good book.",
  ctas: [
    { href: "#programs", label: "Start training", variant: "primary" },
    { href: "#book", label: 'Read "Water Exercise"', variant: "ghost" },
  ] satisfies CtaLink[],
  stats: [
    { value: "15", accent: "+", label: "Years coaching" },
    { value: "2,400", label: "Clients trained" },
    { value: "4.9", accent: "★", label: "Avg. rating" },
  ] satisfies HeroStat[],
  image: {
    src: "/images/jodi/jodi-portrait.jpg",
    alt: "Jodi Stokes",
  },
  caption: {
    title: "Meet Jodi",
    description: "NASM-CPT · Precision Nutrition L2",
  },
  chips: [
    { title: "+12 lbs lean", label: "Client · 16 wks" },
    { title: "Sleep · Stress · Plate", label: "The full method" },
  ] satisfies HeroChip[],
  programCards: [
    {
      eyebrow: "01 · Strength",
      title: "Lift for life",
      detail: "Progressive sessions built around joints, sleep, and momentum.",
    },
    {
      eyebrow: "02 · Lifestyle",
      title: "Recover hard",
      detail: "Weekly rhythm checks that keep stress, food, and training aligned.",
    },
    {
      eyebrow: "03 · Nutrition",
      title: "Eat enough",
      detail: "Simple plate rules for energy, lean mass, and consistency.",
    },
  ] satisfies HeroProgramCard[],
  videoPreview: {
    title: "Intro preview",
    description:
      "A real coaching video will live here once Jodi's media library is connected.",
  } satisfies HeroVideoPreview,
};

export const pillars: Pillar[] = [
  {
    number: "01",
    role: "Trainer",
    title: "Move",
    accent: "smarter.",
    description:
      "Strength-first programming that builds the body you'll have at 70 - not just next summer.",
  },
  {
    number: "02",
    role: "Lifestyle",
    title: "Live",
    accent: "grounded.",
    description:
      "Habits, mindset, recovery, and the rituals that hold it all together when life gets loud.",
  },
  {
    number: "03",
    role: "Nutrition",
    title: "Eat",
    accent: "honest.",
    description:
      "No fads, no apps to obsess over. Whole-food protocols that you can run on autopilot.",
  },
];

export const aboutContent = {
  eyebrow: "About Jodi",
  title: "Strong at any age",
  accent: "whole point.",
  image: {
    src: "/images/jodi/jodi-leadership.png",
    alt: "Jodi Stokes at her studio",
  },
  secondaryImage: {
    src: "/images/jodi/jodi-portrait.jpg",
    alt: "Jodi Stokes coaching portrait",
  },
  signature: "Jodi",
  signatureLabel: "founder",
  breakout: {
    title: "The full method",
    description:
      "Strength, sleep, food, and recovery are coached together so progress lasts outside the gym.",
    cta: { href: "#coaching", label: "Train with Jodi" },
  } satisfies AboutBreakout,
  stats: [
    { value: "15+", label: "Years coaching" },
    { value: "2,400", label: "Clients trained" },
    { value: "4.9★", label: "Average rating" },
    { value: "4", label: "Credentials" },
  ] satisfies AboutStat[],
  paragraphs: [
    "I started coaching in 2009 because the industry was selling the wrong things to the wrong people. Bootcamps that broke knees. Diets that broke trust. I built something different - a method rooted in strength, sleep, real food, and the long game.",
    "Whether you train with me 1:1, follow a program, or just read the book - the rules are the same. Show up. Lift heavy. Eat enough. Sleep more than you think you should. That's it, be fitt.",
  ],
  credentials: [
    { title: "NASM-CPT", description: "Certified Personal Trainer" },
    { title: "PN Level 2", description: "Precision Nutrition" },
    { title: "FMS Lvl 1", description: "Functional Movement" },
    { title: "Author", description: '"That\'s it, Be Fitt" · 2025' },
  ] satisfies Credential[],
};

// [PLACEHOLDER] Product/program records use mock storefront data. [TODO] Replace with ecommerce/CMS data.
export const programs: Program[] = [
  {
    title: "Strong Foundations",
    description:
      "The full method, start to finish. Strength block, mobility, nutrition habits, sleep audit, and weekly mini-courses. Includes printable journal + private community.",
    tags: ["Most popular", "16 weeks", "All levels"],
    features: [
      "Strength block",
      "Mobility",
      "Nutrition habits",
      "Sleep audit",
      "Printable journal",
      "Private community",
    ],
    price: "$249",
    priceNote: "/ full program",
    featured: true,
    image: {
      src: "/images/jodi/jodi-plank.png",
      alt: "Jodi side plank outdoors",
    },
  },
  {
    title: "Lean & Lifted",
    description:
      "Body recomp block - hypertrophy + nutrition. For people who already lift.",
    tags: ["12 weeks", "Intermediate"],
    features: [
      "Hypertrophy focus",
      "Body recomp nutrition",
      "Progressive lifting",
      "Intermediate pacing",
    ],
    price: "$189",
    artLabel: "LEAN & LIFTED",
  },
  {
    title: "The Reset",
    description:
      "Six-week kickstart. Habits, basics, and a confidence-building block.",
    tags: ["6 weeks", "Beginner"],
    features: [
      "Six-week kickstart",
      "Habit basics",
      "Confidence block",
      "Beginner-friendly structure",
    ],
    price: "$99",
    artLabel: "RESET · 6 WK",
  },
];

export const bookContent = {
  eyebrow: "The Book - Out Now",
  title: "A complete guide to",
  accent: "water exercise.",
  description:
    "Water exercise - for enthusiasts, teachers/trainers, and health support. Jodi's full pool-based method: low-impact strength, rehab-friendly conditioning, and class plans that actually work for every age and ability.",
  image: {
    src: "/images/jodi/book-water-exercise.png",
    alt: "Water Exercise by Jodi Books-Stokes",
  },
  price: "$32",
  compareAtPrice: "$42",
  offer: "24% off · Signed copies",
  stats: ["60+ exercises", "All ages", "Trainer-ready"],
  features: [
    "60+ pool exercises",
    "Class & lesson plans",
    "Low-impact for joints",
    "Rehab modifications",
    "Trainer-ready scripts",
    "Signed by Jodi",
  ],
  details: [
    {
      title: "Pool strength",
      description:
        "Low-impact strength sequences for building control, balance, and confidence in the water.",
    },
    {
      title: "Class planning",
      description:
        "Ready-to-teach lesson structures for trainers, teachers, and health support teams.",
    },
    {
      title: "Joint-friendly modifications",
      description:
        "Regression and progression notes for mixed ages, rehab needs, and changing ability levels.",
    },
  ],
  // [PLACEHOLDER] Book CTAs are static. [TODO] Wire book checkout/download/bulk inquiry.
  ctas: [
    { href: "#", label: "Buy the book", variant: "primary" },
    { href: "#", label: "eBook · $14", variant: "ghost" },
    { href: "#", label: "Bulk · trainers", variant: "ghost" },
  ] satisfies CtaLink[],
};

export const shopCategories = [
  "All",
  "Apparel",
  "Gear",
  "Hydration",
  "Journals",
  "Bundles",
];

export const shopProducts: ShopProduct[] = [
  {
    name: "That's It Tee - Bone",
    category: "Apparel · Tee",
    price: "$38",
    badge: "New",
    art: "tee",
    colors: ["bone", "ink", "mint", "coral"],
    availability: "In stock",
    shippingNote: "Ships in 2 days",
    quickNote: "Studio cotton",
  },
  {
    name: "Stainless Bottle 28oz",
    category: "Hydration",
    price: "$42",
    badge: "Bestseller",
    badgeTone: "coral",
    art: "bottle",
    colors: ["mint", "ink", "bone"],
    availability: "Low stock",
    shippingNote: "Free ship over $75",
    quickNote: "Cold 24 hours",
  },
  {
    name: "Studio Mat - 6mm",
    category: "Gear",
    price: "$58",
    art: "mat",
    colors: ["coral", "ink", "mint"],
    availability: "In stock",
    shippingNote: "Oversize shipping",
    quickNote: "Joint-friendly grip",
  },
  {
    name: "Studio Cap",
    category: "Apparel · Cap",
    price: "$32",
    badge: "Limited",
    art: "cap",
    colors: ["ink", "mint", "bone"],
    availability: "Limited run",
    shippingNote: "Ships in 2 days",
    quickNote: "Adjustable fit",
  },
  {
    name: "Strong For Life Crew",
    category: "Apparel · Crew",
    price: "$62",
    art: "crew",
    colors: ["coral", "ink", "bone"],
    availability: "In stock",
    shippingNote: "Free ship over $75",
    quickNote: "Midweight fleece",
  },
  {
    name: "Resistance Band Set",
    category: "Gear",
    price: "$28",
    art: "bands",
    colors: ["mint", "coral", "gold"],
    availability: "In stock",
    shippingNote: "Ships in 2 days",
    quickNote: "Three tensions",
  },
  {
    name: "90-Day Training Journal",
    category: "Journals",
    price: "$24",
    art: "journal",
    colors: ["ink", "bone"],
    availability: "In stock",
    shippingNote: "Ships in 2 days",
    quickNote: "Daily tracking",
  },
  {
    name: "Studio Tote + Journal",
    category: "Bundle",
    price: "$48",
    compareAtPrice: "$58",
    badge: "Bundle",
    art: "bag",
    colors: ["bone", "ink"],
    availability: "Bundle deal",
    shippingNote: "Free ship over $75",
    quickNote: "Save $10",
  },
];

// [PLACEHOLDER] Testimonials are mock client stories. [TODO] Replace with approved client proof.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I came to Jodi for the body. I stayed for the brain. Three years in I sleep better, lift heavier, and stress about food half as much.",
    result: "-28 lb",
    resultNote: "18 months",
    initials: "MR",
    name: "Margaret R.",
    detail: "Realtor · client since 2023",
    tenure: "3 years",
    focus: "Sleep · strength · food trust",
  },
  {
    quote:
      "Jodi got me back under a barbell at 54 and I'm stronger than I was at 30. Her plans are stupidly simple, which is the whole point.",
    result: "+14 lb",
    resultNote: "lean mass",
    initials: "DK",
    name: "Daniel K.",
    detail: "Architect · client since 2022",
    tenure: "4 years",
    focus: "Strength after 50",
  },
  {
    quote:
      "Six other programs and a divorce later, this is the one that finally clicked. Nutrition felt boring before - now it's automatic.",
    result: "-42 lb",
    resultNote: "24 months",
    initials: "SP",
    name: "Sasha P.",
    detail: "Surgeon · client since 2021",
    tenure: "5 years",
    focus: "Nutrition consistency",
  },
];

export const coachingContent = {
  eyebrow: "1:1 coaching",
  title: "Work directly",
  accent: "with Jodi.",
  description:
    "Twelve weeks, eight clients per cohort, zero copy-paste. You get the program, the food plan, the weekly call, and Jodi's phone for the in-between moments.",
  methodTitle: "The full method. Twelve weeks. Eight clients.",
  features: [
    "Weekly 1:1 video call",
    "Custom training + nutrition plan",
    "Daily WhatsApp access",
    "Quarterly bloodwork review",
    "Private cohort community",
    "Signed copy of the book",
  ],
  nextCohort: "Sep 8, 2026 · 3 seats left",
  investment: "$2,400",
  investmentNote: "/ 12 weeks · or 3× $850",
  applicationKicker: "Private application",
  applicationDetails: [
    "10-minute fit review",
    "48-hour response",
    "Limited to 8 clients",
  ],
  messagePrompt: "What do you want Jodi to know before the first call?",
  // [PLACEHOLDER] Form options are static. [TODO] Wire coaching application to CRM/backend.
  goalOptions: [
    "Body recomposition",
    "Strength + longevity",
    "Sustainable habits",
    "Post-injury return",
  ],
};

// [PLACEHOLDER] Journal posts are static mock content. [TODO] Replace with CMS/blog entries.
export const journalPosts: JournalPost[] = [
  {
    category: "Training",
    readTime: "04 min read",
    date: "May 18",
    title: "The only three lifts you actually need.",
    description:
      "Why a hinge, a squat and a push will outperform 40 fancy variations - for the next 30 years.",
    deco: "Lift",
    author: "Jodi Stokes",
    tags: ["Strength", "Programming"],
    href: "#",
  },
  {
    category: "Nutrition",
    readTime: "06 min read",
    date: "May 11",
    title: "Protein, in plain English.",
    description:
      "How much you actually need, how to hit it without an app, and why everyone's wrong about the upper limit.",
    deco: "Plate",
    author: "Jodi Stokes",
    tags: ["Protein", "Habits"],
    href: "#",
  },
  {
    category: "Lifestyle",
    readTime: "05 min read",
    date: "May 04",
    title: "The sleep audit I run every Sunday.",
    description:
      "Ten questions, three minutes. The single highest-ROI habit I've ever taught a client.",
    deco: "Rest",
    author: "Jodi Stokes",
    tags: ["Recovery", "Rituals"],
    href: "#",
  },
];

export const newsletterContent = {
  title: "Get the Monday Note from Jodi.",
  description:
    "One short email every Monday morning. A workout, a recipe, and one thing to think about for the week. No fluff. No upsells. Free.",
  // [PLACEHOLDER] Newsletter form is local-only. [TODO] Wire newsletter signup provider.
  tags: ["Free forever", "Unsubscribe anytime", "Joined by 12,000+"],
};

export const footerContent = {
  description:
    "Sustainable fitness, smart nutrition, and a lifestyle you'll actually keep. Coaching since 2009, online since 2014, in your inbox every Monday.",
  copyright: "© 2026 Jodi Stokes Fitness. All rights reserved.",
  // [PLACEHOLDER] Footer links include temporary legal and studio URLs. [TODO] Replace with real routes.
  linkGroups: [
    {
      title: "Shop",
      links: [
        { href: "#shop", label: "Apparel" },
        { href: "#shop", label: "Hydration" },
        { href: "#shop", label: "Gear" },
        { href: "#shop", label: "Journals" },
        { href: "#shop", label: "Bundles" },
      ],
    },
    {
      title: "Train",
      links: [
        { href: "#programs", label: "Strong Foundations" },
        { href: "#programs", label: "Lean & Lifted" },
        { href: "#programs", label: "The Reset" },
        { href: "#coaching", label: "1:1 Coaching" },
        { href: "#book", label: "The Book" },
      ],
    },
    {
      title: "Studio",
      links: [
        { href: "#about", label: "About Jodi" },
        { href: "#journal", label: "Journal" },
        { href: "#", label: "Press kit" },
        { href: "#", label: "Affiliates" },
        { href: "#", label: "Contact" },
      ],
    },
  ] satisfies FooterLinkGroup[],
  legalLinks: [
    { href: "#", label: "Terms" },
    { href: "#", label: "Privacy" },
    { href: "#", label: "Returns" },
    { href: "#", label: "Accessibility" },
  ] satisfies NavLink[],
};
