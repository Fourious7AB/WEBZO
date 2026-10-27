import { motion } from 'framer-motion'
import { Check, ShieldCheck, Zap } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { pricing } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function Pricing({ onBookDemo }) {
  return (
    <section id="pricing" className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Transparent High-ROI Investment"
          title="Upfront Fixed Pricing. Zero Hidden Fees."
          lead="Every project is quoted fixed before sprint kick-off. No monthly platform hostage taxes, no surprise retainers, backed by a 100% satisfaction approval guarantee."
        />

        {/* Pricing Cards Layered in Front of 3D Canvas */}
        <ul className="mt-14 grid items-start gap-6 lg:grid-cols-3 relative z-10">
          {pricing.map((plan, i) => (
            <motion.li
              key={plan.name}
              initial={
                i === 0
                  ? { opacity: 0, x: -48, y: 15 }
                  : i === 2
                  ? { opacity: 0, x: 48, y: 15 }
                  : { opacity: 0, y: 40, scale: 0.94 }
              }
              whileInView={
                i === 1
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, x: 0, y: 0 }
              }
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'glass glow-border relative z-10 flex flex-col rounded-3xl p-8',
                'backdrop-blur-2xl bg-slate-950/80 border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]',
                'transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:border-cyan-400/40 hover:shadow-[0_30px_70px_-20px_rgba(6,182,212,0.3)]',
                'transform-gpu will-change-transform',
                plan.featured &&
                  'ring-1 ring-cyan-400/60 shadow-[0_0_70px_-20px_rgba(6,182,212,0.5)] lg:-mt-4 lg:pb-10 lg:pt-10 bg-slate-950/85'
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                  <Zap className="h-3 w-3" />
                  Most Popular Sprint
                </span>
              )}

              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">{plan.name}</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">{plan.for}</p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight tnum text-white bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{plan.cadence}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-3.5 border-t border-white/10 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.featured ? 'primary' : 'secondary'}
                onClick={onBookDemo}
                className={cn(
                  'mt-8 w-full',
                  plan.featured && 'shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                )}
              >
                {plan.cta}
              </Button>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm text-slate-400 relative z-10"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
          You approve every screen and conversion prototype before we code. Not 100% satisfied? You pay nothing.
        </motion.p>
      </div>
    </section>
  )
}
