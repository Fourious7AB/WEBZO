import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, with Tailwind conflicts resolved last-wins. */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Clamp a number between min and max. */
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/** Linear interpolation. */
export const lerp = (a, b, t) => a + (b - a) * t

/** Smooth, symmetric ease used for every scroll-driven transition. */
export const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/** Deterministic 0..1 pseudo-random from an integer seed. */
export function hash(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** Smoothly scroll to a section id, accounting for the fixed navbar. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const navH =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
      10
    ) || 72
  const top = el.getBoundingClientRect().top + window.scrollY - navH - 8
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}
