import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
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
  '120+ websites shipped',
  'Live in 14 days',
  'Support on WhatsApp',
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
    <section id="home" className="relative overflow-hidden">
      <LampContainer>
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.span
            variants={rise}
            className="mb-6 sm:mb-8 mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/20 px-3.5 py-1.5 font-sans text-[11px] sm:text-xs font-medium tracking-normal sm:tracking-wide text-slate-200 shadow-[0_0_20px_-3px_rgba(6,182,212,0.25)] backdrop-blur-xl max-w-[95vw]"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400/80 duration-1000" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8]" />
            </span>
            <span className="text-slate-200">
              Taking new projects for{' '}
              <span className="font-semibold text-cyan-300 tracking-normal">
                {currentPeriod}
              </span>
            </span>
          </motion.span>

          <motion.h1
            variants={rise}
            className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-balance text-[2rem] font-bold leading-[1.18] tracking-tight sm:text-4xl sm:leading-[1.14] md:text-5xl md:leading-[1.1] lg:text-[4.25rem]"
          >
            <span className="text-gradient">Turn small businesses into</span>{' '}
            <span className="text-gradient-brand animate-shimmer">big brands</span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-xl text-sm leading-relaxed text-white sm:text-base md:text-lg sm:mt-6"
            style={{ color: '#ffffff' }}
          >
            WebzoLabs builds fast, modern and affordable websites that help local
            businesses, startups and entrepreneurs grow their dreams and create
            new opportunities.
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
              <Button size="lg" onClick={onBookDemo} className="w-full sm:w-auto">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Book a demo
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
                View our work
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
                <span className="h-1 w-1 rounded-full bg-glow" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </LampContainer>
    </section>
  )
}
