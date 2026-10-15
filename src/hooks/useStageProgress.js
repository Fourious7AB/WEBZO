import { useEffect, useRef } from 'react'
import { clamp } from '@/lib/utils'

/**
 * Tracks a continuous "stage" value across the page: 0 when the first anchor
 * section is at top, 1 at the second, and so on up to the last stage.
 *
 * Stage 0 ('home') is strictly anchored at scrollY = 0.
 * Stage 7 ('contact') is strictly anchored at maxScroll (scrollHeight - innerHeight).
 * Intermediate stages are anchored based on header arrival:
 *   top + scrollY - navOffset (where navOffset is --nav-h or fallback 72).
 *
 * Returns a ref (not state) with clean linear progress without double easing.
 * Decouples scroll and resize ticking so resize observations aren't dropped.
 */
export function useStageProgress(anchorIds) {
  const progress = useRef(0)

  useEffect(() => {
    let anchors = []
    let scrollTicking = false
    let measureTicking = false
    let scrollRaf = 0
    let measureRaf = 0
    let isMounted = true

    const update = () => {
      scrollTicking = false
      if (!isMounted || anchors.length < 2) return

      const scrollY = window.scrollY || window.pageYOffset || 0
      const last = anchors.length - 1

      if (scrollY <= anchors[0]) {
        progress.current = 0
        return
      }
      if (scrollY >= anchors[last]) {
        progress.current = last
        return
      }

      for (let i = 0; i < last; i++) {
        if (scrollY >= anchors[i] && scrollY < anchors[i + 1]) {
          const span = anchors[i + 1] - anchors[i]
          progress.current = span > 0 ? i + clamp((scrollY - anchors[i]) / span) : i
          return
        }
      }

      // Edge rounding fallback: ensure progress stays within valid bounds
      progress.current = clamp(progress.current, 0, last)
    }

    const measure = () => {
      measureTicking = false
      if (!isMounted) return

      const navOffset =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 72

      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0
      )
      const innerHeight =
        window.innerHeight || document.documentElement.clientHeight || 1

      const maxScroll = Math.max(0, scrollHeight - innerHeight)

      const lastIdx = Math.max(1, anchorIds.length - 1)
      const currentScrollY = window.scrollY || window.pageYOffset || 0

      const elements = anchorIds.map((id) => document.getElementById(id))

      anchors = elements.map((el, i) => {
        if (i === 0) return 0
        if (i === lastIdx) return maxScroll
        if (!el) return (i / lastIdx) * maxScroll
        const rect = el.getBoundingClientRect()
        const target = rect.top + currentScrollY - navOffset
        return clamp(target, 0, maxScroll)
      })

      // Ensure strictly monotonic order so spans are always >= 0
      for (let i = 1; i < anchors.length; i++) {
        if (anchors[i] < anchors[i - 1]) {
          anchors[i] = anchors[i - 1]
        }
      }

      update()
    }

    const onScroll = () => {
      if (scrollTicking) return
      scrollTicking = true
      scrollRaf = requestAnimationFrame(update)
    }

    const requestMeasure = () => {
      if (measureTicking) return
      measureTicking = true
      measureRaf = requestAnimationFrame(measure)
    }

    measure()
    // Fonts and images shift layout after first paint — re-measure once settled.
    const settle = setTimeout(measure, 600)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) measure()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', requestMeasure)

    let ro = null
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      ro = new ResizeObserver(requestMeasure)
      ro.observe(document.body)
    }

    return () => {
      isMounted = false
      clearTimeout(settle)
      cancelAnimationFrame(scrollRaf)
      cancelAnimationFrame(measureRaf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', requestMeasure)
      if (ro) ro.disconnect()
    }
  }, [anchorIds])

  return progress
}
