/**
 * Single source of truth for everything the client might want to change:
 * contact details, nav, copy and pricing. Edit here, not in the components.
 */

export const site = {
  name: 'WebzoLabs',
  short: 'Webzo',
  tagline: 'Turn Clicks into High-Velocity Revenue & Dominant Brands',
  mission:
    'We architect conversion-engineered web experiences and weaponized 3D digital platforms that 10x client acquisition, automate booking, and generate non-stop revenue.',

  // Digits only, with country code. Used for the wa.me deep link.
  whatsapp: '919883250683',
  phoneDisplay: '+91 98832 50683',
  phoneHref: 'tel:+919883250683',

  email: 'hello@webzolabs.com',
  hours: 'Mon – Sat · 10:00 AM to 8:00 PM IST',
  location: 'Kolkata, India · working with clients worldwide',

  socials: [
    {
      label: 'Instagram',
      href: 'https://instagram.com/webzolabs',
      icon: 'instagram',
      handle: '@webzolabs',
      stats: '14.2K Followers',
      description: 'Daily conversion breakdowns, 3D WebGL reels & agency playbooks',
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@webzolabs',
      icon: 'youtube',
      handle: '@webzolabs',
      stats: '28.5K Subscribers',
      description: 'Full-stack production builds, Three.js teardowns & scaling sprints',
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/webzolabs',
      icon: 'facebook',
      handle: 'WebzoLabs Official',
      stats: '8.4K Community',
      description: 'High-growth strategies, founder Q&A & client revenue milestones',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/webzolabs',
      icon: 'linkedin',
      handle: 'WebzoLabs',
      stats: '5.1K Network',
      description: 'Enterprise tech partnerships, architecture case studies & updates',
    },
  ],
}

/**
 * Centralized content configuration for the Community & Social Section.
 */
export const communitySection = {
  eyebrow: 'Growth Community & Socials',
  titleLine1: 'Watch How We Build',
  titleLine2: 'High-Converting Digital Empires',
  lead: 'We build in public and reveal our exact acquisition playbooks. Watch real enterprise platforms deploy, live Three.js speed builds, and actionable scaling strategies across our channels.',
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
    gradient: 'bg-gradient-to-br from-[#4F46E5] via-[#2563EB] to-[#06B6D4]',
    layers: [
      {
        id: 'instagram',
        label: 'Instagram',
        handle: '@webzolabs',
        stats: '14.2K Followers',
        href: 'https://instagram.com/webzolabs',
        tag: 'Conversion Breakdowns',
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
        tag: '3D WebGL Sprints',
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
        tag: 'Founder Network',
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
  { id: 'work', label: 'Proven Impact' },
  { id: 'showcase', label: 'Live Systems' },
  { id: 'services', label: 'Solutions' },
  { id: 'process', label: 'Playbook' },
  { id: 'pricing', label: 'Investment' },
  { id: 'contact', label: 'Start Sprint' },
]

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
    title: 'High-Impact Web Platforms',
    copy: 'Conversion-engineered digital flagships that position you as the undisputed market leader and convert cold visitors into high-ticket clients.',
    points: ['Custom UI/UX & 3D Polish', 'Frictionless Booking Funnel', 'Enterprise Speed Score (99+)'],
  },
  {
    icon: 'ShoppingBag',
    title: 'Autonomous E-Commerce',
    copy: 'Lightning-fast storefronts built for extreme checkout velocity. Instant UPI, multi-currency cards, and zero monthly platform subscription fees.',
    points: ['1-Click WhatsApp & UPI Checkout', 'Automated Inventory & Invoicing', 'Zero Monthly Platform Fees'],
  },
  {
    icon: 'Target',
    title: 'High-Velocity Ad Funnels',
    copy: 'Hyper-focused, weaponized landing pages built with one objective: squeezing maximum revenue and closed deals out of every rupee spent on ads.',
    points: ['Sub-800ms Instant Loading', 'A/B Conversion Architecture', 'Automated Lead Routing to CRM'],
  },
  {
    icon: 'Sparkles',
    title: 'Brand Overhaul & 3D Experiences',
    copy: 'Transform legacy websites into interactive 3D WebGL masterpieces that command immediate authority, blow competitors away, and 3x pricing power.',
    points: ['Interactive Three.js & Spline 3D', 'High-Converting Microcopy', 'Full SEO & Authority Preservation'],
  },
]

export const work = [
  {
    client: 'Saree & Co.',
    type: 'Luxury Boutique · Flagship Commerce',
    build: 'Autonomous E-Commerce Engine',
    metric: '3.4x',
    result: 'surge in high-ticket orders within 60 days of launch',
    accent: 'from-cyan-500/30 to-blue-600/10',
  },
  {
    client: 'Northline B2B',
    type: 'Enterprise SaaS · Global Remote',
    build: 'High-Velocity Demo Funnel',
    metric: '10x',
    result: 'qualified inbound demo bookings from the same ad budget',
    accent: 'from-violet-500/30 to-cyan-500/10',
  },
  {
    client: 'Tandoor House',
    type: 'Fine Dining · Multi-Outlet Hospitality',
    build: 'Speed Platform & Booking Engine',
    metric: '0.4s',
    result: 'sub-second load time, capturing 420+ automated WhatsApp reservations weekly',
    accent: 'from-blue-500/25 to-emerald-400/10',
  },
]

export const clientWebsites = [
  {
    id: 'automation-suite',
    name: 'WorkflowCloud Engine',
    client: 'Apex Automation Labs',
    category: 'Cloud Automation Platform',
    badge: 'Enterprise Platform',
    tagline: 'High-throughput event workflows, autonomous ETL pipelines & real-time monitoring',
    description:
      'Mission-critical enterprise workflow automation platform orchestrating webhook triggers, distributed microservices, automated CRM syncs, and real-time execution dashboards.',
    liveUrl: 'https://n8n.io',
    displayUrl: 'auto.webzolabs.com',
    laptopImage: '/showcase/automation-laptop.jpg',
    phoneImage: '/showcase/automation-phone.jpg',
    stats: { metric: '99.99%', label: 'Uptime reliability SLA' },
    accent: 'from-cyan-500/30 via-blue-500/10 to-transparent',
    borderColor: 'hover:border-cyan-500/50',
  },
  {
    id: 'management-suite',
    name: 'OpsGrid Suite',
    client: 'Nexus Operations Ltd.',
    category: 'Enterprise SaaS',
    badge: 'Production Engine',
    tagline: 'Enterprise revenue pipeline, resource management & automated executive workspace',
    description:
      'All-in-one operations management platform featuring real-time sprint boards, role-based resource allocation, automated milestone tracking, and executive KPI reporting.',
    liveUrl: 'https://plane.so',
    displayUrl: 'manage.webzolabs.com',
    laptopImage: '/showcase/management-laptop.png',
    phoneImage: '/showcase/management-phone.png',
    stats: { metric: '100%', label: 'Real-time synchronization' },
    accent: 'from-indigo-500/30 via-purple-500/10 to-transparent',
    borderColor: 'hover:border-indigo-500/50',
  },
  {
    id: 'aichat-bot',
    name: 'BotCraft AI',
    client: 'Cognitive Support Systems',
    category: 'Autonomous AI Agent',
    badge: 'Live AI Infrastructure',
    tagline: 'Enterprise conversational AI agent with multi-turn memory & automated lead qualification',
    description:
      'Intelligent conversational chatbot platform with custom knowledge base ingestion, semantic context memory, multi-language support, and automated CRM escalation.',
    liveUrl: 'https://botpress.com',
    displayUrl: 'chat.webzolabs.com',
    laptopImage: '/showcase/aichat-laptop.png',
    phoneImage: '/showcase/aichat-phone.png',
    stats: { metric: '< 250ms', label: 'Streaming response latency' },
    accent: 'from-violet-500/30 via-fuchsia-500/10 to-transparent',
    borderColor: 'hover:border-violet-500/50',
  },
  {
    id: 'billing-website',
    name: 'BillFlow Enterprise',
    client: 'Apex Financial Technologies',
    category: 'Fintech & Invoicing',
    badge: 'Live Payment Rail',
    tagline: 'Automated recurring billing, GST invoices & zero-friction instant payment rails',
    description:
      'Full-stack enterprise financial billing platform with automated recurring invoices, tax calculations, multi-currency Stripe/UPI checkout, and customer self-service billing portals.',
    liveUrl: 'https://demo.invoiceninja.com',
    displayUrl: 'billing.webzolabs.com',
    laptopImage: '/showcase/billing-laptop.png',
    phoneImage: '/showcase/billing-phone.png',
    stats: { metric: '₹1.8 Cr+', label: 'Monthly billing volume' },
    accent: 'from-blue-500/30 via-cyan-500/10 to-transparent',
    borderColor: 'hover:border-blue-500/50',
  },
]

export const reasons = [
  {
    icon: 'Zap',
    title: '7–14 Day Rapid Deployment',
    copy: 'We build and launch in rapid sprints. Live in days with zero agency bloat, so you start acquiring clients immediately.',
  },
  {
    icon: 'TrendingUp',
    title: '10x Revenue Architecture',
    copy: 'Every visual element, headline, and 3D interaction is engineered with one core goal: turning visitors into high-paying customers.',
  },
  {
    icon: 'Smartphone',
    title: 'Weaponized Mobile Speed',
    copy: 'Engineered for sub-second load times on mobile. Instant loading means zero drop-offs and maximum checkout velocity.',
  },
  {
    icon: 'IndianRupee',
    title: 'Transparent Fixed ROI',
    copy: 'Zero surprise invoices or hidden retainers. Upfront fixed pricing backed by a complete satisfaction guarantee.',
  },
  {
    icon: 'MessageCircle',
    title: 'Direct WhatsApp War Room',
    copy: 'Direct communication with senior engineers and growth architects. No account manager telephone games or slow tickets.',
  },
  {
    icon: 'Search',
    title: 'Automated Acquisition Pipeline',
    copy: 'Built-in automated booking schedules, instant WhatsApp notifications, and local SEO dominance configured from day one.',
  },
]

export const stats = [
  { value: 120, suffix: '+', label: 'Websites & Systems Shipped' },
  { value: 10, suffix: ' Days', label: 'Average Sprint Delivery' },
  { value: 99, suffix: '%', label: 'Client Retention & Growth' },
  { value: 4.9, suffix: '/5', label: 'Client Satisfaction Score', decimals: 1 },
]

export const processSteps = [
  {
    icon: 'CalendarCheck',
    title: 'Strategy Sprint Call',
    copy: 'We analyze your offer, audit your market rivals, and map the exact conversion architecture needed to dominate.',
    meta: '20 Min Session',
  },
  {
    icon: 'Compass',
    title: 'Conversion Blueprint',
    copy: 'We lock in the core revenue metrics, high-impact copywriting, and interactive 3D choreography before touching code.',
    meta: 'Days 1–2',
  },
  {
    icon: 'Code2',
    title: 'Rapid Build & 3D Integration',
    copy: 'Interactive prototyping, custom Three.js WebGL rendering, and responsive speed optimization with ongoing client previews.',
    meta: 'Days 3–10',
  },
  {
    icon: 'Rocket',
    title: 'Launch & Acquisition Surge',
    copy: 'Domain hookup, payment testing, CRM routing, and 24/7 WhatsApp support to turn on the client acquisition machine.',
    meta: 'Days 11–14',
  },
]

export const testimonials = [
  {
    name: 'Ritika Sharma',
    business: 'Founder · Saree & Co. (Kolkata)',
    rating: 5,
    quote:
      'We went from relying solely on erratic Instagram DMs to generating over 3.4x in consistent daily checkout sales. The website pays for itself every single week.',
    initials: 'RS',
  },
  {
    name: 'Anirban Banerjee',
    business: 'Co-Founder · North Bengal Teas (Siliguri)',
    rating: 5,
    quote:
      'Our overseas wholesale orders tripled once we launched the direct catalog. Buyers from Europe and Mumbai can now sample and book freight shipments right from our site.',
    initials: 'AB',
  },
  {
    name: 'Dr. Shreya Mukherjee',
    business: 'Founder · SmileCraft Dental Clinics (Durgapur)',
    rating: 5,
    quote:
      'Patients now book appointments directly with automated WhatsApp confirmations. Our front-desk phone calls dropped by 70%, and new patient walk-ins are up 2.5x.',
    initials: 'SM',
  },
  {
    name: 'Farhan Ali',
    business: 'Owner · The Royal Kebab & Dining (Asansol)',
    rating: 5,
    quote:
      'The automated table reservation and digital menu engine streamlined our dinner rushes. Over 350 weekend covers booked automatically with zero extra staff overhead.',
    initials: 'FA',
  },
  {
    name: 'Siddharth Sengupta',
    business: 'Principal Architect · Form & Space Studio (Salt Lake, Kolkata)',
    rating: 5,
    quote:
      'Webzo delivered a sleek 3D architectural portfolio that wins high-ticket villa and commercial interior contracts on the first pitch call. Absolutely top-tier execution.',
    initials: 'SS',
  },
  {
    name: 'Sandeep Roy',
    business: 'Managing Partner · Roy Industrial Tools (Howrah)',
    rating: 5,
    quote:
      'Clear, honest, and ridiculously fast. They built a custom B2B inquiry system that connected us with engineering plants across Haldia and Kharagpur ahead of schedule.',
    initials: 'SR',
  },
  {
    name: 'Pooja Agarwal',
    business: 'Director · KGP Logistics & Cold Storage (Kharagpur)',
    rating: 5,
    quote:
      'Corporate clients take us seriously now because our tracking and quote calculator looks like a Silicon Valley portal. Closed 4 new annual supply contracts in 60 days.',
    initials: 'PA',
  },
  {
    name: 'Sourav Mondal',
    business: 'Managing Director · Bardhaman Agritech (Burdwan)',
    rating: 5,
    quote:
      'Farmers and distributors across East Bengal easily order seeds and machinery online. The Bengali and English bilingual interface made customer adoption effortless.',
    initials: 'SM',
  },
  {
    name: 'Tenzing Norbu',
    business: 'Owner · Highland Boutique Retreat (Darjeeling)',
    rating: 5,
    quote:
      'Direct room bookings skyrocketed, saving us over ₹1.2 Lakh every month on third-party OTA commission fees. Guests constantly compliment the photography and booking flow.',
    initials: 'TN',
  },
]

export const pricing = [
  {
    name: 'Foundation Velocity',
    price: '₹9,999',
    cadence: 'one-time investment',
    for: 'Emerging brands needing immediate market credibility & high-converting leads',
    features: [
      'Up to 5 conversion-optimized pages',
      'Ultra-fast mobile responsive architecture',
      'Instant WhatsApp & Lead Capture funnels',
      'Google Maps & Local Search SEO setup',
      'Zero monthly platform or hosting markups',
      '30 days direct WhatsApp engineer support',
    ],
    cta: 'Launch Foundation Sprint',
  },
  {
    name: 'Market Dominance',
    price: '₹24,999',
    cadence: 'one-time investment',
    for: 'Ambitious businesses scaling to 10x client acquisition & automated bookings',
    featured: true,
    features: [
      'Up to 12 bespoke custom pages (No templates)',
      'Interactive 3D WebGL & GSAP animations',
      'Automated CRM & calendar booking engine',
      'Sub-second speed tuning & on-page SEO',
      'Conversion copywriting & high-impact badge assets',
      'Analytics, heatmaps & event tracking setup',
      '60 days direct priority war-room support',
    ],
    cta: 'Claim Market Dominance',
  },
  {
    name: 'Omnichannel Scale',
    price: '₹49,999',
    cadence: 'one-time investment',
    for: 'High-volume merchants and enterprises needing complete sales infrastructure',
    features: [
      'Full-stack autonomous e-commerce engine',
      'Instant UPI, Credit Cards & COD checkout rails',
      'Interactive 3D product showcase & physics',
      'Automated WhatsApp order alerts & invoicing',
      'Custom customer portals & inventory sync',
      'Full staff handover & growth roadmap',
      '90 days dedicated priority growth support',
    ],
    cta: 'Scale Omnichannel',
  },
]

export const businessTypes = [
  'Local Business / Retail',
  'Restaurant & Hospitality',
  'Healthcare & Wellness Clinic',
  'Tech Startup & SaaS',
  'Agency & High-Ticket Consultant',
  'Real Estate & Architecture',
  'E-Commerce & D2C Brand',
  'Other',
]

export const faqs = [
  {
    q: 'How does a conversion-engineered website increase revenue?',
    a: 'Most websites act like passive brochures. We build conversion machines with sub-second mobile speeds, irresistible direct-response copy, automated WhatsApp/calendar bookings, and authoritative 3D visuals that remove buying hesitation.',
  },
  {
    q: 'What is the turnaround time from start to launch?',
    a: 'Most standard and growth sprints go live in 7 to 14 days. Complex e-commerce systems with deep payment gateway setups deploy in approximately 3 weeks.',
  },
  {
    q: 'Are there any hidden monthly agency or platform fees?',
    a: 'None. You pay a single fixed upfront investment. You hold 100% ownership of your domain, codebase, and assets. We never hold your business hostage with monthly platform taxes.',
  },
  {
    q: 'What is your satisfaction guarantee?',
    a: 'You review and approve the design and visual strategy before we write a single line of production code. If you are not completely satisfied at that milestone, you owe nothing.',
  },
]
