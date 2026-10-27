import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react'
import DeviceMockup from '@/components/ui/DeviceMockup'
import Button from '@/components/ui/Button'
import { clientWebsites } from '@/lib/site'
import { cn, scrollToId } from '@/lib/utils'

export default function ClientShowcase({ onBookDemo }) {
  const handleCardClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section
      id="showcase"
      className="relative z-10 border-b border-white/10 py-20 md:py-28 overflow-hidden bg-transparent"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[800px] -translate-x-1/2 rounded-full bg-cyan-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 -z-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow inline-flex items-center gap-2 text-cyan-400 font-mono tracking-widest text-xs uppercase">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-cyan-400" />
              Live Flagship Systems
              <span className="h-px w-6 bg-gradient-to-l from-transparent to-cyan-400" />
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl text-white">
              Live Production Platforms Engineered for Scale
            </h2>
          </motion.div>
        </div>

        {/* Flagship Systems Clean 2x2 Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {clientWebsites.map((site, index) => (
            <ProjectCard
              key={site.id}
              site={site}
              slideDirection={index % 2 === 0 ? 'left' : 'right'}
              delay={index * 0.1}
              onCardClick={handleCardClick}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 relative z-10 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/40 to-blue-950/30 p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Ready to deploy your high-converting flagship web platform?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Fixed quote delivered in 24 hours. Sprint launch in 7–14 days.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={onBookDemo}
                className="gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] text-white"
              >
                <CalendarDays className="h-4 w-4 text-cyan-300" />
                <span>Claim Strategy Sprint</span>
              </Button>

              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:border-cyan-400/40 hover:bg-white/10 transition-colors"
              >
                <span>Get Fixed Proposal</span>
                <ArrowUpRight className="h-4 w-4 text-cyan-300" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Reusable Project Card with directional entrance sliding (left / right)
 * and GPU-accelerated 3D hover effects.
 */
function ProjectCard({ site, slideDirection = 'left', delay = 0, onCardClick }) {
  const initialX = slideDirection === 'left' ? -48 : 48

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-35px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group relative rounded-3xl p-6 sm:p-7',
        'bg-gradient-to-b from-white/[0.08] to-white/[0.02]',
        'border border-white/10 hover:border-cyan-400/50',
        'backdrop-blur-xl transition-all duration-500 ease-out',
        'hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.3)]',
        'flex flex-col justify-between overflow-hidden cursor-pointer',
        'transform-gpu will-change-transform'
      )}
      onClick={() => onCardClick(site.liveUrl)}
    >
      {/* Top sheen line */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gradient accent corner */}
      <div
        className={cn(
          'pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500',
          site.accent
        )}
      />

      {/* Top Bar: Title, Client & External Link */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
            {site.name}
          </h3>
          <span className="text-xs text-slate-400 font-medium mt-0.5 block">
            {site.client}
          </span>
        </div>

        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-400 transition-all duration-300"
          aria-label="Open live site"
        >
          <ExternalLink className="h-4 w-4" />
        </span>
      </div>

      {/* Content: Tagline, Stats */}
      <div className="relative z-10 mt-4 flex-1">
        <p className="text-xs sm:text-sm font-normal text-slate-300 line-clamp-2">
          {site.tagline}
        </p>

        {/* Impact Metric Pill */}
        {site.stats && (
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-xl bg-cyan-950/30 border border-cyan-400/20 px-3 py-1.5 text-xs">
            <span className="font-display font-bold text-cyan-300">
              {site.stats.metric}
            </span>
            <span className="text-slate-400">· {site.stats.label}</span>
          </div>
        )}
      </div>

      {/* Dual Device Mockup Area */}
      <div className="relative z-10 mt-6 pt-3.5 border-t border-white/5">
        <DeviceMockup
          laptopImage={site.laptopImage}
          phoneImage={site.phoneImage}
          title={site.name}
          displayUrl={site.displayUrl}
          liveUrl={site.liveUrl}
        />
      </div>
    </motion.div>
  )
}
