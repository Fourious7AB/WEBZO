import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently owning the viewport.
 * Uses a top-biased root margin so a section becomes "active" as its heading
 * reaches the upper third of the screen, which is what a reader perceives.
 */
export function useScrollSpy(ids, offset = 96) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.4, 0.75],
      }
    )

    els.forEach((el) => observer.observe(el))

    // The observer never fires for the very bottom of the page.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 120
      if (atBottom) setActive(ids[ids.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids, offset])

  return active
}
