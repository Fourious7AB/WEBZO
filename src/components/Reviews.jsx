import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { testimonials } from '@/lib/site'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 7000

function Stars({ rating }) {
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  const go = useCallback((next) => {
    setDirection(next > index ? 1 : -1)
    setIndex((next + testimonials.length) % testimonials.length)
  }, [index])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return
    timer.current = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(timer.current)
  }, [index, paused, next])

  const active = testimonials[index]

  return (
    <section id="reviews" className="relative z-10 section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Client reviews"
          title="What business owners say afterwards"
          lead="Real feedback from the shops, studios and startups we have worked with."
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Soft halo behind the card, echoing the particle ring */}
          <div
            className="pointer-events-none absolute -inset-x-10 -inset-y-8 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(139,92,246,0.14),transparent)] blur-2xl"
            aria-hidden="true"
          />

          <div
            className="glass relative overflow-hidden rounded-3xl px-6 py-10 sm:px-12 sm:py-12"
            aria-live="polite"
            aria-atomic="true"
          >
            <Quote
              className="absolute right-6 top-6 h-16 w-16 text-white/[0.04]"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -28 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <Stars rating={active.rating} />

                <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-slate-100 font-normal">
                  “{active.quote}”
                </p>

                <footer className="mt-8 flex items-center gap-4">
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-glow/35 to-violet-glow/35 font-display text-sm font-semibold ring-1 ring-white/15"
                    aria-hidden="true"
                  >
                    {active.initials}
                  </span>
                  <span className="min-w-0">
                    <cite className="block not-italic font-medium text-white">
                      {active.name}
                    </cite>
                    <span className="text-xs sm:text-sm text-slate-400">{active.business}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <ul className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show review from ${t.name}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-500 ease-premium',
                      i === index
                        ? 'w-7 bg-gradient-to-r from-glow to-violet-glow'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    )}
                  />
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="glass grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
