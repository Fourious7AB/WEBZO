import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Box,
  CalendarDays,
  CreditCard,
  ExternalLink,
  KanbanSquare,
  Layers,
  MessageSquareCode,
  Workflow,
} from 'lucide-react'
import DeviceMockup from '@/components/ui/DeviceMockup'
import Button from '@/components/ui/Button'
import { clientWebsites } from '@/lib/site'
import { cn, scrollToId } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: '3D & WebGL', label: '3D Website', icon: Box },
  { id: 'Management', label: 'Management', icon: KanbanSquare },
  { id: 'AI Chat Bot', label: 'AI Chat Bot', icon: MessageSquareCode },
  { id: 'Billing & Invoicing', label: 'Billing', icon: CreditCard },
  { id: 'Cloud Automation', label: 'Automation', icon: Workflow },
]

// Distinct Bento grid spans for each card index
const bentoSpans = [
  'col-span-1 md:col-span-2 lg:col-span-7', // Card 0 (3D): Large featured banner
  'col-span-1 md:col-span-2 lg:col-span-5', // Card 1 (AI Chat): Spotlight card
  'col-span-1 md:col-span-1 lg:col-span-4', // Card 2 (Management): 1/3 card
  'col-span-1 md:col-span-1 lg:col-span-4', // Card 3 (Billing): 1/3 card
  'col-span-1 md:col-span-2 lg:col-span-4', // Card 4 (Automation): 1/3 card
]

export default function ClientShowcase({ onBookDemo }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredWebsites = useMemo(() => {
    if (activeCategory === 'all') return clientWebsites
    return clientWebsites.filter((site) => site.category === activeCategory)
  }, [activeCategory])

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section
      id="showcase"
      className="relative z-10 border-b border-white/10 py-20 md:py-28 overflow-hidden bg-base"
    >
      {/* Background ambient lighting in 21st.dev style */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[800px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="eyebrow inline-flex items-center gap-2 text-white font-mono tracking-widest text-xs uppercase"
              style={{ color: '#ffffff' }}
            >
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-white" />
              Live Client Websites
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-white" />
            </span>

            <h2
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl text-white"
              style={{ color: '#ffffff' }}
            >
              Real Websites. Real Businesses. Live in Production.
            </h2>

            {/* Requested exact text in guaranteed pure white */}
            <p
              className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed font-normal text-white"
              style={{ color: '#ffffff' }}
            >
              We build in public and share the entire playbook. Watch real client websites take shape, speed coding sprints, and actionable digital growth strategies across our channels.
            </p>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 text-white',
                    isActive
                      ? 'bg-blue-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.55)] ring-1 ring-white/40'
                      : 'border border-white/15 bg-slate-900/70 text-white hover:border-white/30 hover:bg-slate-800'
                  )}
                  style={{ color: '#ffffff' }}
                >
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 text-white'
                    )}
                  />
                  <span style={{ color: '#ffffff' }}>{cat.label}</span>
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* ===================== 21st.dev BENTO GRID ===================== */}
        <motion.div
          layout
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredWebsites.map((site, index) => {
              const spanClass =
                activeCategory === 'all'
                  ? bentoSpans[index % bentoSpans.length]
                  : 'col-span-1 md:col-span-1 lg:col-span-6'

              return (
                <motion.article
                  layout
                  key={site.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => handleCardClick(site.liveUrl)}
                  className={cn(
                    'relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group',
                    spanClass,
                    site.borderColor
                  )}
                >
                  {/* Radiant corner aura glow */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl opacity-35 transition-opacity duration-500 group-hover:opacity-75',
                      site.accent
                    )}
                    aria-hidden="true"
                  />

                  {/* Card Content Top */}
                  <div>
                    {/* Header Strip: Live Status + Category + Client */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        {/* Live Status indicator */}
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80 duration-1000" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                        </span>
                        <span
                          className="text-xs font-semibold text-white tracking-wide uppercase font-mono"
                          style={{ color: '#ffffff' }}
                        >
                          {site.badge}
                        </span>
                        <span className="text-white/40">·</span>
                        <span
                          className="text-xs text-white font-medium"
                          style={{ color: '#ffffff' }}
                        >
                          {site.category}
                        </span>
                      </div>

                      {/* Client label */}
                      <span
                        className="text-xs text-white/90 font-mono"
                        style={{ color: '#ffffff' }}
                      >
                        {site.client}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="text-2xl sm:text-3xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-glow-soft"
                          style={{ color: '#ffffff' }}
                        >
                          {site.name}
                        </h3>
                        <p
                          className="mt-1.5 text-xs sm:text-sm text-white font-normal leading-relaxed"
                          style={{ color: '#ffffff' }}
                        >
                          {site.tagline}
                        </p>
                      </div>

                      {/* External Link Pill Icon */}
                      <span className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2 text-white transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/15 group-hover:scale-110">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </span>
                    </div>

                    {/* Device Mockup Display (Laptop + Phone) */}
                    <div className="mt-6">
                      <DeviceMockup
                        laptopImage={site.laptopImage}
                        phoneImage={site.phoneImage}
                        title={site.name}
                        displayUrl={site.displayUrl}
                        liveUrl={site.liveUrl}
                        accent={site.accent}
                      />
                    </div>

                    {/* Description in pure white */}
                    <p
                      className="mt-4 text-xs sm:text-sm leading-relaxed text-white font-normal"
                      style={{ color: '#ffffff' }}
                    >
                      {site.description}
                    </p>
                  </div>

                  {/* Card Bottom: Metric & Action Button (All tags removed) */}
                  <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span
                        className="font-display text-xl sm:text-2xl font-bold text-white tnum tracking-tight"
                        style={{ color: '#ffffff' }}
                      >
                        {site.stats.metric}
                      </span>
                      <p
                        className="text-[11px] text-white/90 uppercase tracking-wider font-mono mt-0.5"
                        style={{ color: '#ffffff' }}
                      >
                        {site.stats.label}
                      </p>
                    </div>

                    <a
                      href={site.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:border-white hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] group/btn"
                      style={{ color: '#ffffff' }}
                    >
                      <span style={{ color: '#ffffff' }}>Visit Live Website</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-white" />
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Section Bottom Conversion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-elevated to-slate-900 p-8 sm:p-10 text-center relative shadow-card"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h3
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ color: '#ffffff' }}
            >
              Ready to launch a high-converting website or custom web software?
            </h3>

            <p
              className="mt-3 text-xs sm:text-sm text-white max-w-lg leading-relaxed font-normal"
              style={{ color: '#ffffff' }}
            >
              Whether you need an interactive 3D website, operations management suite, AI chatbot, or automated billing portal — we design and ship in 7 to 14 days.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={onBookDemo}
                className="gap-2 shadow-glow text-white"
              >
                <CalendarDays className="h-4 w-4 text-white" />
                <span className="text-white">Book a Free 20-Min Demo</span>
              </Button>

              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-white/40 hover:bg-white/15 transition-colors"
                style={{ color: '#ffffff' }}
              >
                <span style={{ color: '#ffffff' }}>Get a Fixed Price Quote</span>
                <ArrowUpRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
