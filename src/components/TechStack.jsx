import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const row1 = [
  {
    name: 'Docker',
    category: 'DevOps & Containers',
    color: '#2496ED',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 2.714h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm0-2.714h2.12a.187.187 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.929 2.714h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.185.185v1.888c0 .102.083.185.185.185zm0-2.714h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185h-2.12a.186.186 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.955 2.714h2.12a.186.186 0 00.185-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm18.326.853a2.6 2.6 0 00-1.802-.916h-1.077c-.158-1.577-1.41-2.02-1.41-2.02s-.758-.518-2.023-.424h-.053V6.104a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v2.902H2.179a.186.186 0 00-.186.186v2.174c0 .872.235 5.518 5.281 7.424 4.093 1.545 8.913 1.114 11.83-1.677 2.146-2.052 2.39-4.707 2.39-4.707a2.66 2.66 0 00.155-.783.186.186 0 00-.186-.186h-.414z" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'Frontend Framework',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-2" aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" className="fill-current" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Type-Safe Code',
    color: '#3178C6',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.15" />
        <path d="M4 4h16v16H4V4zm9.6 13.5c1.4 0 2.4-.6 3-1.5l-1.3-1c-.5.6-1.1.9-1.8.9-1.1 0-1.8-.6-1.8-1.5 0-2.4 3.7-1.4 3.7-4.4 0-1.7-1.3-2.8-3.2-2.8-1.3 0-2.3.5-2.9 1.4l1.3 1c.4-.6 1-.9 1.6-.9 1 0 1.6.5 1.6 1.3 0 2.2-3.7 1.4-3.7 4.4 0 1.8 1.4 3.1 3.5 3.1zM6.5 8.2h5.5v1.6H9.9v6.9H8.1V9.8H6.5V8.2z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Full-Stack React',
    color: '#FFFFFF',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9.5 8v8h1.8v-4.9l5.2 6.5c.3-.2.6-.5.8-.8L11.7 8H9.5zm5.5 0h1.8v5.5l-1.8-2.2V8z" />
      </svg>
    ),
  },
  {
    name: 'Java',
    category: 'Enterprise Backend',
    color: '#ED8B00',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M8.85 16.84c-2.42-.12-4.22-.64-4.22-1.27 0-.75 2.58-1.37 5.92-1.42 2.76-.05 5.5.38 5.5 1.13 0 .73-2.32 1.35-5.32 1.54l-1.88.02zm-1.12 2.56c-3.11-.18-5.37-.87-5.37-1.69 0-.96 3.11-1.77 7.37-1.84 3.59-.06 7.15.51 7.15 1.5 0 .97-3.2 1.77-7.3 1.99l-1.85.04zm4.44-8.03c1.07.97-.24 2.1-1.66 3.09-1.29.9-2.73 1.63-2.73 2.52 0 .42.34.78 1.05.99.27.08.61.13.98.15-1.5.38-3.08.34-3.08-.73 0-1.19 1.72-2.02 3.16-2.92 1.54-.97 2.05-1.81 1.63-2.43-.27-.41-.95-.61-1.92-.61-.92 0-2.02.19-2.98.48.5-.68 1.48-1.07 2.71-1.07.97 0 1.93.18 2.84.53zM14.65 6c.92.74-.21 1.6-1.42 2.36-1.11.69-2.34 1.25-2.34 1.93 0 .33.29.59.9.76.24.06.52.1.84.11-1.29.29-2.64.26-2.64-.56 0-.91 1.48-1.55 2.71-2.24 1.32-.74 1.76-1.39 1.4-1.86-.23-.31-.81-.47-1.65-.47-.79 0-1.73.15-2.55.37.43-.52 1.27-.82 2.32-.82.83 0 1.66.14 2.43.38zM4.17 21.96c4.09.43 9.47.45 13.91-.48 1.4-.29 2.75-.68 2.75-1.4 0-.85-2.03-1.49-4.88-1.83-1.39-.17-2.95-.27-4.52-.27-2.58 0-5.06.27-6.85.73-2.02.52-3.13 1.28-3.13 2.04 0 .54.99.98 2.72 1.21z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'JavaScript Runtime',
    color: '#68A063',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.2L5 8.2v7.6l7 4.2 7-4.2V8.2l-7-4zm-1 6.3h2v6.5h-2v-6.5zm0-2.5h2v1.8h-2V8z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'Modern Styling',
    color: '#38BDF8',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.2-1.5 2.7-2.1 4.5-1.8 1.1.2 1.9 1 2.8 1.8C14.1 12.8 15.8 14.5 20 14.5c3.6 0 5.8-1.8 6.6-5.4-1.2 1.5-2.7 2.1-4.5 1.8-1.1-.2-1.9-1-2.8-1.8C17.9 7.7 16.2 6 12 6zM4 12c-3.6 0-5.8 1.8-6.6 5.4 1.2-1.5 2.7-2.1 4.5-1.8 1.1.2 1.9 1 2.8 1.8 1.4 1.4 3.1 3.1 7.3 3.1 3.6 0 5.8-1.8 6.6-5.4-1.2 1.5-2.7 2.1-4.5 1.8-1.1-.2-1.9-1-2.8-1.8C9.9 13.7 8.2 12 4 12z" />
      </svg>
    ),
  },
  {
    name: 'Webflow',
    category: 'Visual Development',
    color: '#4353FF',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M21.996 7.424c-.015-.078-.063-.146-.134-.183-.07-.037-.154-.038-.225-.002l-4.707 2.378-2.617-5.234a.25.25 0 00-.223-.138.25.25 0 00-.224.138L9.932 8.653 6.944 4.471a.25.25 0 00-.204-.105.25.25 0 00-.203.105L2.08 10.748c-.056.079-.064.183-.021.27.042.087.13.142.228.142h3.585l2.427-4.161 3.332 5.832a.25.25 0 00.217.126.25.25 0 00.217-.126l3.864-6.762 3.679 12.876c.03.104.124.178.232.178h1.99c.099 0 .188-.059.227-.149.039-.09.022-.194-.043-.267l-3.32-3.765 3.32-7.518a.25.25 0 00-.037-.265z" />
      </svg>
    ),
  },
]

const row2 = [
  {
    name: 'Shopify',
    category: 'E-Commerce Platform',
    color: '#95BF47',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M19.8 6.4c-.1-.3-.4-.5-.7-.5l-2.6-.3c-.3 0-.6.1-.8.3-.3.3-.4.6-.4.9 0 .1 0 .2.1.3l.9 3.2-4.1-1.8c-.2-.1-.5-.1-.7 0l-5.6 2.5-1.4-4.8c0-.2-.1-.3-.3-.4-.1-.1-.3-.1-.5-.1H1.5c-.3 0-.5.2-.5.5s.2.5.5.5h1.7l3.6 12.3c.1.3.3.5.6.5h11.8c.3 0 .5-.2.6-.5l2.8-12.1c.1-.3 0-.6-.2-.8zm-5.4 6.9l-2.7-1.2 2.7-1.2v2.4zm-3.8-1.7l2.8 1.2-2.8 1.2v-2.4zm5.8 4.7H7.6l-1.3-4.4 5.3-2.3 5.3 2.3-1.3 4.4z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'Version Control & CI/CD',
    color: '#F0F6FC',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Core Language',
    color: '#F7DF1E',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.15" />
        <path d="M4 4h16v16H4V4zm7.2 13.5c1.2 0 1.9-.6 2.3-1.4l-1.3-.9c-.3.5-.6.7-1 .7-.6 0-1-.4-1-1.3V8.5H8.4v6.2c0 2 1.1 2.8 2.8 2.8zm5.5 0c1.4 0 2.4-.6 3-1.5l-1.3-1c-.5.6-1.1.9-1.8.9-1.1 0-1.8-.6-1.8-1.5 0-2.4 3.7-1.4 3.7-4.4 0-1.7-1.3-2.8-3.2-2.8-1.3 0-2.3.5-2.9 1.4l1.3 1c.4-.6 1-.9 1.6-.9 1 0 1.6.5 1.6 1.3 0 2.2-3.7 1.4-3.7 4.4 0 1.8 1.4 3.1 3.5 3.1z" />
      </svg>
    ),
  },
  {
    name: 'HTML5',
    category: 'Semantic Structure',
    color: '#E34F26',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.6 4.6l-.3 3.6h-7.6l.2 2.3h7.2l-.5 5.8-4.6 1.3-4.6-1.3-.3-3.6h2.2l.2 1.8 2.5.7 2.5-.7.3-2.7H6.9L6.3 6.6h11.3z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'UI/UX Design',
    color: '#F24E1E',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M8 2h4a4 4 0 014 4 4 4 0 01-4 4H8a4 4 0 01-4-4 4 4 0 014-4zm0 8h4a4 4 0 014 4 4 4 0 01-4 4H8a4 4 0 01-4-4 4 4 0 014-4zm0 8h4a4 4 0 010 4 4 4 0 01-4-4zm8-10a4 4 0 100-8 4 4 0 000 8zm0 8a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    color: '#336791',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Data & Backend APIs',
    color: '#3776AB',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M11.9 2C8.6 2 6.7 3.5 6.7 5.7v1.8h5.3v.8H4.6C2.5 8.3 1 10.1 1 13.1c0 3.1 1.7 4.7 4.2 4.7h2.3v-2.3c0-2.3 2-4.2 4.3-4.2h5.1c1.3 0 2.3-1.1 2.3-2.3V5.7C19.2 3.5 17.3 2 11.9 2zm-1.8 1.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1zm2 18.2c3.3 0 5.2-1.5 5.2-3.7v-1.8H12v-.8h7.4c2.1 0 3.6-1.8 3.6-4.8 0-3.1-1.7-4.7-4.2-4.7h-2.3v2.3c0 2.3-2 4.2-4.3 4.2H6.5c-1.3 0-2.3 1.1-2.3 2.3v3.3c0 2.2 1.9 3.7 7.9 3.7zm1.8-1.8c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" />
      </svg>
    ),
  },
  {
    name: 'WordPress',
    category: 'CMS & Custom Themes',
    color: '#21759B',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.483 12c0-1.724.526-3.327 1.424-4.662l4.896 13.418A8.528 8.528 0 013.483 12zm8.517 8.533a8.497 8.497 0 01-2.483-.37l2.846-8.258 2.915 7.994c.026.064.056.126.088.186a8.498 8.498 0 01-3.366.448zm1.616-12.871c.548 0 1.053.072 1.053.072.435.056.486.684.053.74 0 0-.435.054-.92.074l2.924 8.706 1.761-5.882c-.312-.02-.605-.038-.605-.038-.435-.056-.381-.684.053-.74 0 0 .524.072 1.053.072.508 0 1.034-.072 1.034-.072.436.056.489.684.053.74 0 0-.432.054-.919.074l2.457 7.307A8.508 8.508 0 0120.517 12c0 2.228-.854 4.258-2.26 5.792l-4.641-13.125z" />
      </svg>
    ),
  },
]

function TechCard({ name, category, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-28 w-48 sm:h-32 sm:w-56 shrink-0 flex-col justify-between rounded-2xl border border-cyan-400/40 bg-surface/90 p-4 sm:p-5 backdrop-blur-xl shadow-[0_0_20px_-3px_rgba(59,130,246,0.3)] transition-all duration-300 hover:border-cyan-300/80 hover:bg-elevated hover:shadow-[0_0_30px_-2px_rgba(6,182,212,0.55)]"
    >
      {/* Permanent ambient corner glow */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-xl transition-all duration-300 group-hover:opacity-75 group-hover:scale-125"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <div
          className="text-white drop-shadow-[0_0_8px_rgba(96,165,250,0.45)] transition-colors duration-300 group-hover:text-glow-soft"
          style={{ color }}
        >
          {icon}
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.35)]">
          Ready
        </span>
      </div>

      <div>
        <h4 className="font-display text-sm sm:text-base font-semibold tracking-tight text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] transition-colors group-hover:text-white">
          {name}
        </h4>
        <p className="mt-0.5 text-2xs text-muted/80 line-clamp-1">{category}</p>
      </div>
    </motion.div>
  )
}

/**
 * Modern angled Tech Stack marquee section.
 * Features 2 opposing rows tilted at -6deg matching the reference design:
 * - Top row moves RIGHT continuously in an infinite loop
 * - Bottom row moves LEFT continuously in an infinite loop
 * - Powered by Framer Motion for smooth, guaranteed hardware acceleration
 */
export default function TechStack() {
  // Duplicate arrays to ensure seamless, infinite -50% translateX looping
  const doubleRow1 = [...row1, ...row1]
  const doubleRow2 = [...row2, ...row2]

  return (
    <section id="tech" className="relative z-10 overflow-hidden py-20 md:py-28">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[50rem] rounded-full bg-glow/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container relative z-10 mb-14 md:mb-18">
        <SectionHeading
          eyebrow="Toolkit & Frameworks"
          title={
            <span>
              Technologies &{' '}
              <span className="text-gradient-brand animate-shimmer">Tools</span>
            </span>
          }
          lead="We build with modern frameworks, high-performance backends, and battle-tested platforms for speed, security, and conversion."
          align="center"
        />
      </div>

      {/* Tilted conveyor marquee container */}
      <div className="relative w-full overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex flex-col gap-5 sm:gap-6 -rotate-6 -skew-x-3 scale-[1.08] sm:scale-100 py-6">
          {/* Top Row — Moves RIGHT continuously */}
          <motion.div
            className="flex w-max gap-4 sm:gap-5 transform-gpu will-change-transform"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              ease: 'linear',
              duration: 28,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {doubleRow1.map((tech, idx) => (
              <TechCard key={`top-${idx}`} {...tech} />
            ))}
          </motion.div>

          {/* Bottom Row — Moves LEFT continuously */}
          <motion.div
            className="flex w-max gap-4 sm:gap-5 transform-gpu will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 28,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {doubleRow2.map((tech, idx) => (
              <TechCard key={`bot-${idx}`} {...tech} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
