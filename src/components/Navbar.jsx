import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, Menu, Phone, X } from 'lucide-react'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import { navLinks, site } from '@/lib/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn, scrollToId } from '@/lib/utils'

const ids = navLinks.map((l) => l.id)

export default function Navbar({ onBookDemo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(ids)

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[100] rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out',
          scrolled
            ? 'border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl shadow-lg shadow-black/30'
            : 'border-b border-transparent bg-transparent'
        )}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav
          className="container flex h-full items-center justify-between gap-4"
          aria-label="Main"
        >
          {/* Logo link */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go('home')
            }}
            className="shrink-0 rounded-lg focus-visible:outline-none"
            aria-label={`${site.name} — home`}
          >
            <Logo />
          </a>

          {/* Desktop & Tablet Links (visible from lg: 1024px and up) */}
          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(link.id)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-200 xl:px-4 xl:py-2 xl:text-sm',
                      isActive
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.08] ring-1 ring-white/15"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:text-white xl:inline-flex xl:text-sm"
            >
              <Phone className="h-4 w-4 text-cyan-400" aria-hidden="true" />
              <span>{site.phoneDisplay}</span>
            </a>

            <Button onClick={onBookDemo} size="sm" className="hidden sm:inline-flex">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Book demo
            </Button>

            {/* Mobile / Tablet Menu Trigger (hidden on lg and up) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] border border-white/10 text-white transition-all hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: '-10%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-10%', opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 max-h-[100svh] overflow-y-auto border-b border-white/10 bg-slate-950/95 px-6 pb-8 pt-5 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.05] border border-white/10 text-white transition-colors hover:bg-white/10"
                  autoFocus
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-6 flex flex-col divide-y divide-white/5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.25 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(link.id)
                      }}
                      className={cn(
                        'flex items-center justify-between py-3.5 text-base font-medium transition-colors',
                        active === link.id
                          ? 'text-white font-semibold'
                          : 'text-slate-300 hover:text-white'
                      )}
                    >
                      <span>{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <Button
                  size="lg"
                  onClick={() => {
                    setOpen(false)
                    onBookDemo()
                  }}
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Book a demo
                </Button>
                <Button size="lg" variant="secondary" href={site.phoneHref}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phoneDisplay}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
