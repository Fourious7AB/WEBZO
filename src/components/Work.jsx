import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { work } from '@/lib/site'
import { cn, scrollToId } from '@/lib/utils'

/**
 * A compact proof strip rather than a full portfolio: each card states what we
 * built and the one number that changed for the client.
 */
export default function Work() {
  return (
    <section id="work" className="relative z-10 border-b border-white/5 py-16 md:py-20">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-glow" />
              Recent work
            </span>
            <h2 className="text-gradient mt-4 max-w-xl text-2xl font-bold sm:font-semibold leading-[1.2] sm:leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Small budgets. Real results.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="group inline-flex items-center gap-2 self-start text-xs sm:text-sm text-slate-400 transition-colors hover:text-white md:self-auto"
          >
            Ask about a project like yours
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
          {work.map((item, i) => (
            <motion.li
              key={item.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="glass glow-border group relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 ease-premium hover:-translate-y-1 transform-gpu"
            >
              <div
                className={cn(
                  'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl transition-opacity duration-500',
                  item.accent,
                  'opacity-60 group-hover:opacity-100'
                )}
                aria-hidden="true"
              />

              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {item.build}
              </p>

              <p className="mt-6 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white tnum">
                {item.metric}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300">{item.result}</p>

              <div className="mt-6 flex items-baseline justify-between border-t border-white/5 pt-4">
                <span className="text-sm font-medium text-white">{item.client}</span>
                <span className="text-xs text-slate-400">{item.type}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
