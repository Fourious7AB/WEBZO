import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { work } from '@/lib/site'
import { cn, scrollToId } from '@/lib/utils'

/**
 * Proof strip with 3D floating and diving cards that complement
 * the centered 3D hand model gliding between them.
 */
export default function Work() {
  return (
    <section id="work" className="relative z-10 border-b border-white/5 py-20 md:py-28 overflow-hidden">
      <div className="container relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow inline-flex items-center gap-2 text-cyan-400">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-cyan-400" />
              Proven Impact & Scaled Revenue
            </span>
            <h2 className="text-gradient mt-4 max-w-xl text-3xl font-bold sm:font-semibold leading-[1.2] sm:leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Real Revenue Milestones. Zero Fluff.
            </h2>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToId('contact')}
            className="group inline-flex items-center gap-2 self-center text-xs sm:text-sm text-cyan-300 transition-colors hover:text-white md:self-auto"
          >
            Engineer a revenue engine for your brand
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>

        {/* Floating & Diving 3D Cards Grid */}
        <div className="mt-14 relative" style={{ perspective: 1200 }}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {work.map((item, i) => {
              // Diving and floating staggered offsets
              const diveClass =
                i === 0
                  ? 'lg:translate-y-2'
                  : i === 1
                  ? 'lg:translate-y-8 lg:scale-[1.03]'
                  : 'lg:translate-y-0'

              // Distinct directional entrance animation: left, center rise, right
              const initialAnim =
                i === 0
                  ? { opacity: 0, x: -50, y: 15 }
                  : i === 1
                  ? { opacity: 0, y: 40, scale: 0.95 }
                  : { opacity: 0, x: 50, y: 15 }

              return (
                <motion.li
                  key={item.client}
                  initial={initialAnim}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'glass glow-border group relative overflow-hidden rounded-2xl p-7',
                    'transition-all duration-500 ease-premium hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.35)]',
                    'transform-gpu will-change-transform backdrop-blur-xl bg-slate-950/60 border-white/10',
                    diveClass
                  )}
                >
                  {/* Subtle pulsing background glow */}
                  <div
                    className={cn(
                      'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br blur-3xl transition-opacity duration-500',
                      item.accent,
                      'opacity-50 group-hover:opacity-90'
                    )}
                    aria-hidden="true"
                  />

                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-cyan-400/90">
                      {item.build}
                    </p>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300">
                      <TrendingUp className="h-3 w-3" />
                    </span>
                  </div>

                  <p className="mt-6 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white tnum bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                    {item.metric}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {item.result}
                  </p>

                  <div className="mt-7 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="text-sm font-semibold text-white tracking-wide">
                      {item.client}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.type}
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
