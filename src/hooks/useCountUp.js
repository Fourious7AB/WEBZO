import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Honours prefers-reduced-motion by jumping straight to the final value.
 */
export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        observer.disconnect()

        if (reduce) {
          setValue(target)
          return
        }

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          // easeOutExpo: fast arrival, gentle settle
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          setValue(Number((target * eased).toFixed(decimals)))
          if (t < 1) requestAnimationFrame(tick)
          else setValue(target)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, decimals])

  return [ref, value]
}
