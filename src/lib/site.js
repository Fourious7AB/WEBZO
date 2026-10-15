/**
 * Single source of truth for everything the client might want to change:
 * contact details, nav, copy and pricing. Edit here, not in the components.
 */

export const site = {
  name: 'WebzoLabs',
  short: 'Webzo',
  tagline: 'Turn Small Businesses into Big Brands',
  mission:
    'We build websites for small businesses, local shops, startups and hardworking entrepreneurs — so they can grow, build their dreams and create new sources of income.',

  // Digits only, with country code. Used for the wa.me deep link.
  whatsapp: '919883250683',
  phoneDisplay: '+91 98832 50683',
  phoneHref: 'tel:+919883250683',

  email: 'hello@webzolabs.com',
  hours: 'Mon – Sat · 10:00 AM to 8:00 PM IST',
  location: 'Kolkata, India · working with clients everywhere',

  socials: [
    {
      label: 'Instagram',
      href: 'https://instagram.com/webzolabs',
      icon: 'instagram',
      handle: '@webzolabs',
      stats: '14.2K Followers',
      description: 'Daily UI/UX reels, design systems & build breakdowns',
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@webzolabs',
      icon: 'youtube',
      handle: '@webzolabs',
      stats: '28.5K Subscribers',
      description: 'Full website builds, React masterclasses & coding sprints',
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/webzolabs',
      icon: 'facebook',
      handle: 'WebzoLabs Official',
      stats: '8.4K Community',
      description: 'Business strategies, entrepreneur Q&A & client launches',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/webzolabs',
      icon: 'linkedin',
      handle: 'WebzoLabs',
      stats: '5.1K Network',
      description: 'Agency insights, tech partnerships & industry updates',
    },
  ],
}

/**
 * Centralized content configuration for the Community & Social Section.
 * Edit any headings, narrative copy, button labels, and card handles/stats here.
 */
export const communitySection = {
  eyebrow: 'Community & Socials',
  titleLine1: 'Follow Our Daily Builds,',
  titleLine2: 'Masterclasses & Redesigns',
  lead: 'We build in public and share the entire playbook. Watch real client websites take shape, speed coding sprints, and actionable digital growth strategies across our channels.',
  ctaButtons: [
    {
      label: 'Subscribe on YouTube',
      href: 'https://youtube.com/@webzolabs',
      platform: 'youtube',
    },
    {
      label: 'Follow on Instagram',
      href: 'https://instagram.com/webzolabs',
      platform: 'instagram',
    },
  ],
  card: {
    title: 'Socials',
    handle: '@webzolabs',
    brandText: 'WEBZO',
    // WebzoLabs signature Midnight Indigo -> Royal Blue -> Electric Cyan Aura
    gradient: 'bg-gradient-to-br from-[#4F46E5] via-[#2563EB] to-[#06B6D4]',
    layers: [
      {
        id: 'instagram',
        label: 'Instagram',
        handle: '@webzolabs',
        stats: '14.2K Followers',
        href: 'https://instagram.com/webzolabs',
        tag: 'Daily Reels & UI',
        color: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
        accentColor: '#E1306C',
        glowClass: 'shadow-[0_12px_40px_-10px_rgba(225,48,108,0.55)]',
        borderActive: 'border-white/80',
      },
      {
        id: 'youtube',
        label: 'YouTube',
        handle: '@webzolabs',
        stats: '28.5K Subs',
        href: 'https://youtube.com/@webzolabs',
        tag: 'Code Masterclasses',
        color: 'from-[#FF0000] to-[#990000]',
        accentColor: '#FF0000',
        glowClass: 'shadow-[0_12px_40px_-10px_rgba(255,0,0,0.55)]',
        borderActive: 'border-white/80',
      },
      {
        id: 'facebook',
        label: 'Facebook',
        handle: 'WebzoLabs Official',
        stats: '8.4K Members',
        href: 'https://facebook.com/webzolabs',
        tag: 'Community Hub',
        color: 'from-[#1877F2] to-[#0D47A1]',
        accentColor: '#1877F2',
        glowClass: 'shadow-[0_12px_40px_-10px_rgba(24,119,242,0.55)]',
        borderActive: 'border-white/80',
      },
    ],
  },
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'showcase', label: 'Client Sites' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
]

/** Sections the background wave uses as morph checkpoints, in page order. */
export const stageAnchors = [
  'home',
  'work',
  'showcase',
  'services',
  'tech',
  'why',
  'process',
  'reviews',
  'pricing',
  'contact',
]

export const services = [
  {
    icon: 'Store',
    title: 'Business Websites',
    copy: 'A clean, credible home for your shop or service. Built so a first-time visitor knows what you do and how to reach you.',
    points: ['4–6 pages', 'Google Maps + reviews', 'Enquiry form'],
  },
  {
    icon: 'ShoppingBag',
    title: 'E-commerce Stores',
    copy: 'Sell online without the monthly platform tax. Products, payments and order alerts, ready the day you launch.',
    points: ['UPI + cards', 'Stock control', 'Order alerts'],
  },
  {
    icon: 'Target',
    title: 'Landing Pages',
    copy: 'One page with one job: turn ad clicks into calls and bookings. Fast to load, written to convert.',
    points: ['Under 1s load', 'A/B ready', 'Lead capture'],
  },
  {
    icon: 'Sparkles',
    title: 'Website Redesign',
    copy: 'Already online but losing customers? We rebuild the look, speed and structure while keeping your search rankings.',
    points: ['Speed rescue', 'Mobile rebuild', 'SEO preserved'],
  },
]

/**
 * Portfolio strip. Swap `metric`/`result` for real numbers before launch —
 * these are placeholders describing the kind of outcome each build targets.
 */
export const work = [
  {
    client: 'Saree & Co.',
    type: 'Boutique · Kolkata',
    build: 'E-commerce store',
    metric: '3.2x',
    result: 'more online orders in 90 days',
    accent: 'from-glow/30 to-violet-glow/10',
  },
  {
    client: 'Northline',
    type: 'B2B startup · Remote',
    build: 'Landing page',
    metric: '2x',
    result: 'demo bookings from the same ad spend',
    accent: 'from-violet-glow/30 to-glow/10',
  },
  {
    client: 'Tandoor House',
    type: 'Restaurant · Howrah',
    build: 'Business website',
    metric: '0.8s',
    result: 'load time, down from nine seconds',
    accent: 'from-glow/25 to-emerald-400/10',
  },
]

/**
 * Flagship Client Websites Showcase.
 * Features 4 live web applications with dual-device responsive mockups (Laptop & Phone),
 * industry tags, verifiable live HTTPS URLs, and client impact metrics.
 */
export const clientWebsites = [
  {
    id: '3d-experience',
    name: 'NovaSphere 3D',
    client: 'Apex Spatial Labs',
    category: '3D & WebGL',
    badge: 'Live Interactive 3D',
    tagline: 'Immersive WebGL & Three.js 3D experience with real-time physics and custom shaders',
    description:
      'High-performance 3D web experience built with Three.js and WebGL. Features 60fps real-time camera orbits, interactive spatial physics, particle systems, and responsive touch controls.',
    liveUrl: 'https://bruno-simon.com',
    displayUrl: '3d.webzolabs.com',
    laptopImage: '/showcase/3d-laptop.jpg',
    phoneImage: '/showcase/3d-phone.jpg',
    stats: { metric: '60 FPS', label: 'Silky smooth WebGL rendering' },
    accent: 'from-cyan-500/30 via-blue-500/10 to-transparent',
    borderColor: 'hover:border-cyan-500/50',
  },
  {
    id: 'management-suite',
    name: 'OpsGrid Suite',
    client: 'Nexus Operations Ltd.',
    category: 'Management',
    badge: 'Live Production',
    tagline: 'Enterprise project, team sprint & resource management cloud workspace',
    description:
      'All-in-one operations management platform featuring real-time sprint boards, role-based resource allocation, automated milestone tracking, and executive KPI reporting.',
    liveUrl: 'https://plane.so',
    displayUrl: 'manage.webzolabs.com',
    laptopImage: '/showcase/management-laptop.jpg',
    phoneImage: '/showcase/management-phone.jpg',
    stats: { metric: '100%', label: 'Real-time synchronization' },
    accent: 'from-indigo-500/30 via-purple-500/10 to-transparent',
    borderColor: 'hover:border-indigo-500/50',
  },
  {
    id: 'aichat-bot',
    name: 'BotCraft AI',
    client: 'Cognitive Support Systems',
    category: 'AI Chat Bot',
    badge: 'Live Platform',
    tagline: 'Enterprise conversational AI agent with multi-turn memory & automated ticket resolution',
    description:
      'Intelligent conversational chatbot platform with custom knowledge base ingestion, semantic context memory, multi-language support, and automated CRM escalation.',
    liveUrl: 'https://botpress.com',
    displayUrl: 'chat.webzolabs.com',
    laptopImage: '/showcase/aichat-laptop.jpg',
    phoneImage: '/showcase/aichat-phone.jpg',
    stats: { metric: '< 250ms', label: 'Average response streaming' },
    accent: 'from-violet-500/30 via-fuchsia-500/10 to-transparent',
    borderColor: 'hover:border-violet-500/50',
  },
  {
    id: 'billing-website',
    name: 'BillFlow Enterprise',
    client: 'Apex Financial Technologies',
    category: 'Billing & Invoicing',
    badge: 'Live Production',
    tagline: 'Automated recurring billing, GST invoices & instant payment reconciliation',
    description:
      'Full-stack enterprise financial billing platform with automated recurring invoices, tax calculations, multi-currency Stripe/UPI checkout, and customer self-service billing portals.',
    liveUrl: 'https://demo.invoiceninja.com',
    displayUrl: 'billing.webzolabs.com',
    laptopImage: '/showcase/billing-laptop.jpg',
    phoneImage: '/showcase/billing-phone.jpg',
    stats: { metric: '₹1.8 Cr+', label: 'Monthly billing volume' },
    accent: 'from-blue-500/30 via-cyan-500/10 to-transparent',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    id: 'automation-app',
    name: 'NexaFlow Automation',
    client: 'SyncFlow Logistics',
    category: 'Cloud Automation',
    badge: 'Live Platform',
    tagline: 'Visual drag-and-drop workflow builder & multi-app pipeline sync',
    description:
      'Resilient workflow automation engine connecting webhooks, WhatsApp business APIs, CRM updates, and databases into automated event-driven pipelines with real-time error telemetry.',
    liveUrl: 'https://n8n.io',
    displayUrl: 'flow.webzolabs.com',
    laptopImage: '/showcase/automation-laptop.jpg',
    phoneImage: '/showcase/automation-phone.jpg',
    stats: { metric: '2.4M+', label: 'Daily automated jobs' },
    accent: 'from-amber-500/30 via-orange-500/10 to-transparent',
    borderColor: 'hover:border-amber-500/50',
  },
]

export const reasons = [
  {
    icon: 'Zap',
    title: 'Fast delivery',
    copy: 'Most sites go live in 7 to 14 days, not three months of silence.',
  },
  {
    icon: 'Smartphone',
    title: 'Mobile-first design',
    copy: 'Designed on a phone screen first — that is where your customers actually are.',
  },
  {
    icon: 'Search',
    title: 'SEO friendly',
    copy: 'Clean markup, real page titles and local search set up from day one.',
  },
  {
    icon: 'IndianRupee',
    title: 'Affordable pricing',
    copy: 'Fixed quotes made for small business budgets. No surprise line items.',
  },
  {
    icon: 'MessageCircle',
    title: 'WhatsApp support',
    copy: 'Message us like you message a friend. No ticket numbers, no queues.',
  },
  {
    icon: 'TrendingUp',
    title: 'Growth-focused strategy',
    copy: 'Every page is built around one question: will this bring you more customers?',
  },
]

export const stats = [
  { value: 120, suffix: '+', label: 'Websites shipped' },
  { value: 14, suffix: ' days', label: 'Average delivery' },
  { value: 98, suffix: '%', label: 'Clients who stay' },
  { value: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
]

export const processSteps = [
  {
    icon: 'CalendarCheck',
    title: 'Book a demo',
    copy: 'Pick a slot that suits you. We call, you talk, we listen. Free, and no obligation.',
    meta: '20 minutes',
  },
  {
    icon: 'Compass',
    title: 'Discuss goals',
    copy: 'More calls? More orders? We agree on the one number your site has to move.',
    meta: 'Day 1–2',
  },
  {
    icon: 'Code2',
    title: 'Design & build',
    copy: 'You see the design before a line of code is written, then approve each round.',
    meta: 'Day 3–12',
  },
  {
    icon: 'Rocket',
    title: 'Launch & grow',
    copy: 'We go live, connect your domain, and stay on WhatsApp for whatever comes next.',
    meta: 'Day 13+',
  },
]

export const testimonials = [
  {
    name: 'Ritika Sharma',
    business: 'Boutique owner · Kolkata',
    rating: 5,
    quote:
      'I had only an Instagram page before. Within a month of the new site, I was getting order enquiries from people who had never walked past my shop.',
    initials: 'RS',
  },
  {
    name: 'Arjun Mehta',
    business: 'Founder · SaaS startup',
    rating: 5,
    quote:
      'They asked better questions than agencies charging five times more. The landing page went live in nine days and our demo bookings doubled.',
    initials: 'AM',
  },
  {
    name: 'Farhan Ali',
    business: 'Restaurant owner · Howrah',
    rating: 5,
    quote:
      'Online table bookings now come straight to my WhatsApp. My staff did not need any training — it just works.',
    initials: 'FA',
  },
  {
    name: 'Priya Nair',
    business: 'Yoga studio · Bengaluru',
    rating: 5,
    quote:
      'The old site took forever to load on mobile. The new one opens instantly and class sign-ups went up without me spending anything on ads.',
    initials: 'PN',
  },
  {
    name: 'Sandeep Roy',
    business: 'Hardware store · Durgapur',
    rating: 5,
    quote:
      'I am not a technical person at all. They explained everything simply and never made me feel slow for asking.',
    initials: 'SR',
  },
]

export const pricing = [
  {
    name: 'Starter',
    price: '₹8,999',
    cadence: 'one-time',
    for: 'Local shops getting online for the first time',
    features: [
      'Up to 4 pages',
      'Mobile-first responsive design',
      'Contact + WhatsApp button',
      'Google Maps & business listing',
      'Free domain guidance',
      '15 days post-launch support',
    ],
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    price: '₹19,999',
    cadence: 'one-time',
    for: 'Businesses that want the site to bring in work',
    featured: true,
    features: [
      'Up to 10 pages',
      'Custom design, no templates',
      'On-page SEO & speed tuning',
      'Booking or enquiry system',
      'Google Analytics setup',
      'Blog or gallery section',
      '60 days post-launch support',
    ],
    cta: 'Choose Growth',
  },
  {
    name: 'Commerce',
    price: '₹34,999',
    cadence: 'one-time',
    for: 'Shops ready to take orders and payments online',
    features: [
      'Full online store',
      'UPI, card & COD payments',
      'Product & stock management',
      'Order alerts on WhatsApp',
      'Customer accounts',
      'Staff handover training',
      '90 days post-launch support',
    ],
    cta: 'Choose Commerce',
  },
]

export const businessTypes = [
  'Local shop or store',
  'Restaurant or café',
  'Salon, spa or clinic',
  'Startup or SaaS',
  'Freelancer or consultant',
  'Real estate',
  'Education or coaching',
  'Other',
]

export const faqs = [
  {
    q: 'How much does a website actually cost?',
    a: 'Most small business sites land between ₹8,999 and ₹35,000 as a one-time cost. You get a fixed quote after the demo call, before any work starts — the number does not move later.',
  },
  {
    q: 'How long until my site is live?',
    a: 'Seven to fourteen days for most projects. E-commerce takes closer to three weeks because of payments and product setup.',
  },
  {
    q: 'Do I need to buy a domain and hosting myself?',
    a: 'No. We can set both up for you and hand over the logins, so the site stays yours even if you work with someone else later.',
  },
  {
    q: 'What if I want changes after launch?',
    a: 'Small edits are covered by your support window. After that, message us on WhatsApp — most quick changes are done the same day.',
  },
]
