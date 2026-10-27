import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Zap } from 'lucide-react'
import LampContainer from '@/components/ui/lamp'
import Button from '@/components/ui/Button'
import { scrollToId } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1]

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const proof = [
  '120+ High-Impact Systems Shipped',
  '7–14 Day Rapid Launch',
  'Direct WhatsApp War Room',
]

export default function Hero({ onBookDemo, month, period }) {
  const currentPeriod = useMemo(() => {
    if (period) return period
    if (month) return month
    const now = new Date()
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now)
    const year = now.getFullYear()
    return `${monthName} ${year}`
  }, [period, month])

  return (
    <section id="home" className="relative overflow-hidden pt-4 pb-12 sm:pb-16 md:pb-20">
      <LampContainer>
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.span
            variants={rise}
            className="mb-6 sm:mb-8 mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/30 px-3.5 py-1.5 font-sans text-[11px] sm:text-xs font-medium tracking-normal sm:tracking-wide text-slate-200 backdrop-blur-xl max-w-[95vw]"
          >
            <Zap className="h-3.5 w-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span className="text-slate-200">
              Accepting 3 new sprint clients for{' '}
              <span className="font-semibold text-white tracking-normal">
                {currentPeriod}
              </span>
            </span>
          </motion.span>

          <motion.h1
            variants={rise}
            className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl text-balance text-[2.1rem] font-bold leading-[1.15] tracking-tight sm:text-4xl sm:leading-[1.12] md:text-5xl md:leading-[1.08] lg:text-[4.5rem]"
          >
            <span className="text-gradient">Websites Engineered to</span>{' '}
            <span className="text-gradient-brand animate-shimmer">10x Revenue & Scale</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base md:text-lg sm:mt-6"
          >
            WebzoLabs architects high-velocity web platforms, 3D WebGL experiences, and automated acquisition engines that convert cold visitors into high-paying clients on autopilot.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 sm:mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="w-full sm:w-auto"
            >
              <Button size="lg" onClick={onBookDemo} className="w-full sm:w-auto shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <CalendarDays className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                Claim Strategy Sprint
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToId('work')}
                className="w-full sm:w-auto"
              >
                Explore Proven Impact
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={rise}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400"
          >
            {proof.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </LampContainer>
    </section>
  )
}
