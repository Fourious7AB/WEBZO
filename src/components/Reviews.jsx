import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/site'
import { cn } from '@/lib/utils'

// Continuous smooth autoplay loop (increased display time for comfortable reading)
const AUTOPLAY_MS = 7000

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span
        className="flex items-center gap-0.5 shrink-0"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0',
              i < rating ? 'fill-amber-400 text-amber-400' : 'text-white/30'
            )}
            aria-hidden="true"
          />
        ))}
      </span>
      <span
        style={{ color: '#ffffff' }}
        className="text-[11px] sm:text-xs font-semibold text-white tracking-wide uppercase shrink-0"
      >
        5.0 Verified Review
      </span>
    </div>
  )
}

export default function Reviews() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const go = useCallback((nextIdx) => {
    setDirection(nextIdx > index ? 1 : -1)
    setIndex((nextIdx + testimonials.length) % testimonials.length)
  }, [index])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Continuous autoplay loop with smooth hover/touch pause
  useEffect(() => {
    if (paused) return

    const timerId = setInterval(() => {
      setDirection(1)
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, AUTOPLAY_MS)

    return () => clearInterval(timerId)
  }, [index, paused])

  const active = testimonials[index]

  const quoteVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 20,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -20,
      transition: {
        duration: 0.18,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  }

  const authorVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * 14,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir * -14,
      transition: {
        duration: 0.18,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  }

  return (
    <section id="reviews" className="relative z-10 section-pad text-white" style={{ color: '#ffffff' }}>
      <div className="container relative z-10 text-white" style={{ color: '#ffffff' }}>
        {/* Section Heading - All text pure crisp white */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-4 text-white">
          <span
            style={{ color: '#ffffff' }}
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-white"
          >
            <span className="h-px w-6 bg-white" />
            Verified Client Wins
            <span className="h-px w-6 bg-white" />
          </span>

          <h2
            style={{ color: '#ffffff' }}
            className="text-2xl font-bold leading-[1.22] tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] text-balance font-display text-white"
          >
            What Founders Say After Experiencing 10x Velocity
          </h2>

          <p
            style={{ color: '#ffffff' }}
            className="max-w-2xl text-sm leading-relaxed sm:text-base font-sans text-white font-normal"
          >
            Real feedback from founders and operators whose bottom line transformed with WebzoLabs.
          </p>
        </div>

        {/* Review Card Container */}
        <div className="relative mx-auto mt-10 sm:mt-14 max-w-3xl w-full text-white" style={{ color: '#ffffff' }}>
          {/* Ambient cyan glow halo */}
          <div
            className="pointer-events-none absolute -inset-x-4 sm:-inset-x-8 md:-inset-x-10 -inset-y-4 sm:-inset-y-8 rounded-[2rem] sm:rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(6,182,212,0.18),transparent)] blur-xl sm:blur-2xl"
            aria-hidden="true"
          />

          <div
            className="glass relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-xl bg-slate-950/80 border border-white/15 text-white shadow-2xl isolate transform-gpu w-full"
            aria-live="polite"
            aria-atomic="true"
            style={{ color: '#ffffff' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <Quote
              className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 text-white/10 shrink-0"
              aria-hidden="true"
            />

            <div className="relative text-white w-full" style={{ color: '#ffffff' }}>
              {/* Review Quote Body */}
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative text-white will-change-transform transform-gpu w-full"
                  style={{ color: '#ffffff' }}
                >
                  <Stars rating={active.rating} />

                  {/* Pure white quote text with height stability to eliminate vertical jumping */}
                  <div className="mt-5 sm:mt-6 min-h-[6.5rem] sm:min-h-[5.25rem] md:min-h-[4.25rem] flex items-start">
                    <p
                      style={{ color: '#ffffff' }}
                      className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white"
                    >
                      “{active.quote}”
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <footer
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 border-t border-white/15 pt-5 sm:pt-6 text-white w-full"
                style={{ color: '#ffffff' }}
              >
                {/* Animated Author Details */}
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    variants={authorVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex items-center gap-3 text-white will-change-transform transform-gpu min-w-0"
                    style={{ color: '#ffffff' }}
                  >
                    {/* Pure white avatar initials */}
                    <span
                      style={{ color: '#ffffff' }}
                      className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white/10 border border-white/25 font-display text-xs sm:text-sm font-bold text-white shadow-[0_0_12px_rgba(255,255,255,0.12)] shrink-0"
                    >
                      {active.initials}
                    </span>
                    <div className="text-white min-w-0" style={{ color: '#ffffff' }}>
                      {/* Pure white author name */}
                      <span
                        style={{ color: '#ffffff' }}
                        className="not-italic text-sm sm:text-base font-bold text-white block tracking-wide truncate"
                      >
                        {active.name}
                      </span>
                      {/* Pure white business title */}
                      <p
                        style={{ color: '#ffffff' }}
                        className="text-xs sm:text-sm text-white/90 font-normal mt-0.5 line-clamp-1 sm:line-clamp-none"
                      >
                        {active.business}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Looping navigation controls and indicators */}
                <div
                  className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 text-white w-full sm:w-auto shrink-0"
                  style={{ color: '#ffffff' }}
                >
                  {/* Visual loop pagination dots */}
                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0" aria-hidden="true">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => go(i)}
                        aria-label={`Go to review ${i + 1}`}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300 shrink-0',
                          i === index
                            ? 'w-5 sm:w-6 md:w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                            : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/60'
                        )}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-white shrink-0" style={{ color: '#ffffff' }}>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous review"
                      className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white/10 border border-white/20 text-white transition-all hover:bg-white/25 hover:scale-105 active:scale-95 shrink-0"
                      style={{ color: '#ffffff' }}
                    >
                      <ChevronLeft className="h-4 w-4 text-white shrink-0" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next review"
                      className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-white/10 border border-white/20 text-white transition-all hover:bg-white/25 hover:scale-105 active:scale-95 shrink-0"
                      style={{ color: '#ffffff' }}
                    >
                      <ChevronRight className="h-4 w-4 text-white shrink-0" />
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
