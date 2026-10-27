import { motion } from 'framer-motion'
import {
  IndianRupee,
  MessageCircle,
  Search,
  Smartphone,
  TrendingUp,
  Zap,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { reasons, stats } from '@/lib/site'
import { useCountUp } from '@/hooks/useCountUp'

const icons = { Zap, Smartphone, Search, IndianRupee, MessageCircle, TrendingUp }

function Counter({ value, suffix, label, decimals = 0 }) {
  const [ref, current] = useCountUp(value, { decimals })

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white tnum">
        <span className="text-gradient-brand">
          {current.toFixed(decimals)}
          {suffix}
        </span>
      </p>
      <p className="mt-1.5 text-xs text-slate-400 font-medium sm:text-sm">{label}</p>
    </div>
  )
}

export default function WhyChoose() {
  return (
    <section id="why" className="relative z-10 section-pad overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="The Webzo Advantage"
          title="Engineered for Founders Who Want Explosive Growth"
          lead="You shouldn't have to navigate slow agencies, bloated tech stacks, or broken promises. Here is our unfair acquisition advantage."
        />

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 28, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="glass mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-8 rounded-2xl px-6 py-8 sm:grid-cols-4 sm:gap-y-0 backdrop-blur-xl bg-slate-950/70 border-white/10"
        >
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Reasons */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
          {reasons.map((reason, i) => {
            const Icon = icons[reason.icon]
            return (
              <motion.li
                key={reason.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -36 : 36, rotateX: 6 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass glow-border group flex items-start gap-4 rounded-2xl p-5 transition-all duration-500 hover:bg-white/[0.05] hover:border-cyan-400/30 transform-gpu will-change-transform backdrop-blur-xl bg-slate-950/60 border-white/10"
              >
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cyan-950/50 ring-1 ring-cyan-400/30 group-hover:ring-cyan-400/60">
                  <Icon className="h-[18px] w-[18px] text-cyan-300" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-semibold tracking-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300/85">
                    {reason.copy}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
