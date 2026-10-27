import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck, Code2, Compass, Rocket } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { processSteps } from '@/lib/site'

const icons = { CalendarCheck, Compass, Code2, Rocket }

export default function Process({ onBookDemo }) {
  const trackRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'center 45%'],
  })
  // The connecting line draws itself as the section arrives.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" className="relative z-10 section-pad overflow-hidden">
      {/* Rocket indicator anchored to the left */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 xl:block"
      >
        <div className="relative animate-float">
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="glass relative grid h-24 w-24 place-items-center rounded-3xl border-cyan-400/30">
            <Rocket className="h-9 w-9 -rotate-45 text-cyan-400" />
          </div>
          {/* Exhaust trail */}
          <div className="absolute left-1/2 top-full h-28 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </div>
      </motion.div>

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="The 14-Day Sprint Playbook"
          title="Four Steps from Strategy Call to Market Dominance"
          lead="Zero bureaucracy, zero radio silence. You have direct war-room visibility at every milestone until launch."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Rail — horizontal on desktop, vertical on mobile */}
          <div
            className="absolute left-[27px] top-2 h-[calc(100%-2rem)] w-px bg-white/8 lg:left-0 lg:top-[27px] lg:h-px lg:w-full"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent lg:hidden"
            />
            <motion.div
              style={{ scaleX: lineScale }}
              className="hidden h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent lg:block"
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, i) => {
              const Icon = icons[step.icon]
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -36 : 36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative flex gap-5 lg:block lg:pr-4 will-change-transform"
                >
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-slate-900 border border-cyan-400/30 ring-1 ring-white/10 transition-all duration-500 ease-premium group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  </span>

                  <div className="flex-1 lg:mt-6">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-cyan-400">
                        0{i + 1}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span className="font-mono text-xs text-slate-400">{step.meta}</span>
                    </div>

                    <h3 className="mt-2 text-base sm:text-lg font-semibold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-300/85">
                      {step.copy}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Button size="lg" onClick={onBookDemo} className="shadow-[0_0_25px_rgba(6,182,212,0.4)]">
            <CalendarCheck className="h-4 w-4 text-cyan-300" />
            Claim Strategy Sprint Call
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
