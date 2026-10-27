import { motion } from 'framer-motion'
import { Check, ShoppingBag, Sparkles, Store, Target } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import HolographicCard from '@/components/ui/HolographicCard'
import { services } from '@/lib/site'

const icons = { Store, ShoppingBag, Target, Sparkles }

export default function Services({ onBookDemo }) {
  return (
    <section id="services" className="relative z-10 section-pad overflow-hidden">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Conversion-Engineered Solutions"
          title="Four Revenue Engines Built to Dominate Your Market"
          lead="Select the architecture tailored to your scaling milestone. Unsure? Claim a 20-minute strategy call and we will map your highest-leverage digital acquisition model."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = icons[service.icon]
            const slideX = i % 2 === 0 ? -45 : 45
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: slideX, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full transform-gpu will-change-transform"
              >
                <HolographicCard className="h-full min-h-[380px]">
                  <div>
                    {/* 3D Elevated Icon Tile */}
                    <span
                      style={{ transform: 'translateZ(24px)' }}
                      className="relative grid h-12 w-12 place-items-center rounded-xl bg-cyan-950/40 ring-1 ring-cyan-400/30 transition-all duration-500 group-hover:bg-cyan-500/20 group-hover:ring-cyan-400/60"
                    >
                      <Icon
                        className="h-5 w-5 text-cyan-300 transition-transform duration-500 ease-premium group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </span>

                    <h3
                      style={{ transform: 'translateZ(18px)' }}
                      className="mt-5 text-base sm:text-lg font-bold sm:font-semibold tracking-tight text-white"
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{ transform: 'translateZ(12px)' }}
                      className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300/85"
                    >
                      {service.copy}
                    </p>
                  </div>

                  <ul
                    style={{ transform: 'translateZ(14px)' }}
                    className="mt-6 space-y-2.5 border-t border-white/10 pt-4"
                  >
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-300 font-medium">
                        <Check className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </HolographicCard>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 text-center text-xs sm:text-sm text-slate-400 sm:flex-row relative z-10"
        >
          Need a bespoke enterprise infrastructure or specialized WebGL platform?
          <Button variant="secondary" size="sm" onClick={onBookDemo}>
            Request Custom Architecture
          </Button>
        </motion.p>
      </div>
    </section>
  )
}
