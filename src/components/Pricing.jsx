import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { pricing } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function Pricing({ onBookDemo }) {
  return (
    <section id="pricing" className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-16 md:pb-20 overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title="Fixed prices, quoted before we start"
          lead="One payment, no monthly platform fees, and the number you are quoted is the number you pay. Domain and hosting are billed at cost."
        />

        <ul className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <motion.li
              key={plan.name}
              initial={
                i === 0
                  ? { opacity: 0, x: -36 }
                  : i === 2
                  ? { opacity: 0, x: 36 }
                  : { opacity: 0, y: 32, scale: 0.96 }
              }
              whileInView={
                i === 1
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 1, x: 0 }
              }
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'glass glow-border relative flex flex-col rounded-3xl p-7 transition-transform duration-500 ease-premium hover:-translate-y-1 transform-gpu will-change-transform',
                plan.featured &&
                  'ring-1 ring-glow/40 shadow-[0_0_60px_-25px_rgba(59,130,246,0.8)] lg:-mt-4 lg:pb-9 lg:pt-9'
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-glow to-violet-glow px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  Most chosen
                </span>
              )}

              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">{plan.name}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400">{plan.for}</p>

              <p className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight tnum text-white">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-400">{plan.cadence}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-white/5 pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-glow-soft"
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
                className="mt-8 w-full"
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
          className="mt-10 flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm text-slate-400"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-glow-soft" aria-hidden="true" />
          You approve the design before we write any code. Not happy at that stage? You
          pay nothing.
        </motion.p>
      </div>
    </section>
  )
}
