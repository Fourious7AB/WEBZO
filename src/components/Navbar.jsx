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
    const onScroll = () => setScrolled(window.scrollY > 24)
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
    // Let the drawer start closing before we move the page.
    setTimeout(() => scrollToId(id), 60)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only left-4 top-4 z-[100] rounded-full bg-glow px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
          scrolled
            ? 'border-b border-white/10 bg-base/70 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        )}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav
          className="container flex h-full items-center justify-between gap-4"
          aria-label="Main"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              go('home')
            }}
            className="shrink-0 rounded-lg"
            aria-label={`${site.name} — home`}
          >
            <Logo />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 xl:flex">
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
                      'relative inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-white' : 'text-muted hover:text-white'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-white sm:inline-flex lg:hidden xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{site.phoneDisplay}</span>
            </a>

            <Button onClick={onBookDemo} className="hidden sm:inline-flex">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Book demo
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/5 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-base/80 backdrop-blur-md"
            />

            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ y: '-6%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-4%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 max-h-[100svh] overflow-y-auto border-b border-white/10 bg-surface/95 px-5 pb-8 pt-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/5"
                  autoFocus
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-6 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(link.id)
                      }}
                      className={cn(
                        'flex items-center justify-between border-b border-white/5 py-4 text-lg transition-colors',
                        active === link.id ? 'text-white' : 'text-muted'
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-all',
                          active === link.id
                            ? 'bg-glow shadow-[0_0_12px_2px_rgba(59,130,246,0.8)]'
                            : 'bg-white/15'
                        )}
                        aria-hidden="true"
                      />
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
