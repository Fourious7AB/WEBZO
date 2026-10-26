import { useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { CalendarDays, Mail, MapPin, MessageCircle, Phone, Timer } from 'lucide-react'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'
import { navLinks, services, site } from '@/lib/site'
import { cn, scrollToId } from '@/lib/utils'

const socialIcons = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

/**
 * Compact Executive Website Footer.
 * Features:
 * - Reduced vertical footprint (~40% more compact) with balanced padding
 * - Full-bleed grounded structure spanning 100% viewport width
 * - Hardware-accelerated cursor spotlight & cyber dot matrix at 120fps
 * - Professional monospaced category tags and crisp typography
 * - High-conversion streamlined side-by-side WhatsApp & Demo CTA card
 * - Fully responsive across mobile, tablet, and desktop
 */
export default function Footer({ onBookDemo }) {
  const year = new Date().getFullYear()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`

  return (
    <footer
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/footer relative z-10 w-full overflow-hidden border-t border-white/10 bg-[#070C18]/95 transform-gpu"
    >
      {/* 1. Full-width Cursor-Following Radial Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/footer:opacity-100 will-change-transform"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Full-width Illuminated Cyber Dot Matrix Revealed Under Cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/footer:opacity-100 will-change-transform"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          backgroundImage: 'radial-gradient(rgba(96, 165, 250, 0.28) 1.2px, transparent 1.2px)',
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* 3. Top Ambient Soft Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(59,130,246,0.08),transparent)] blur-3xl"
        aria-hidden="true"
      />

      {/* Main Footer Container (Tightened padding: py-12 sm:py-14 lg:py-16) */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20px' }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          {/* Col 1: Brand & Mission with Compact CTA Card */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-4 flex flex-col justify-between">
            <div>
              <Logo />
              <p className="mt-3.5 max-w-sm text-xs sm:text-[13px] leading-relaxed text-slate-300">
                {site.mission}
              </p>
            </div>

            {/* Compact Executive WhatsApp & Demo CTA Box */}
            <div className="glass mt-5 rounded-xl p-3.5 sm:p-4 border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-glow/40">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-white tracking-tight">Have a project in mind?</p>
              </div>
              <p className="text-2xs text-slate-400 mt-1 leading-normal">
                Chat directly on WhatsApp or book a free 20-min strategy call.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="whatsapp"
                  size="sm"
                  href={`https://wa.me/${site.whatsapp}?text=Hi%20WebzoLabs!%20I'd%20like%20to%20know%20more%20about%20your%20websites.`}
                  className="flex-1 py-1.5 px-3 text-xs font-medium justify-center"
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onBookDemo}
                  className="flex-1 py-1.5 px-3 text-xs font-medium justify-center"
                >
                  <CalendarDays className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                  Book Demo
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Col 2: Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              Quick links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    className="text-xs sm:text-[13px] text-slate-300 transition-colors duration-200 hover:text-white inline-flex items-center gap-1.5 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Services */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToId('services')}
                    className="text-xs sm:text-[13px] text-slate-300 transition-colors duration-200 hover:text-white inline-flex items-center gap-1.5 group text-left"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Contact Us & Socials */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400/90 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-2.5 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/5 text-cyan-400 grid place-items-center shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-colors">
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-200">{site.phoneDisplay}</span>
                    <span className="block text-2xs text-slate-500">Direct Phone / WhatsApp</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-2.5 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/5 text-cyan-400 grid place-items-center shrink-0 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/30 transition-colors">
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-200">{site.email}</span>
                    <span className="block text-2xs text-slate-500">Project enquiries</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/5 text-cyan-400 grid place-items-center shrink-0">
                    <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span className="font-medium text-slate-200">{site.hours}</span>
                    </div>
                    <span className="block text-2xs text-slate-500">Business hours</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="h-7 w-7 rounded-lg bg-white/[0.04] border border-white/5 text-cyan-400 grid place-items-center shrink-0">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-medium text-slate-200">{site.location}</span>
                    <span className="block text-2xs text-slate-400">Serving clients worldwide</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* Compact Social Media Icons */}
            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'glass grid h-7 w-7 place-items-center rounded-full text-slate-300 transition-all duration-300 hover:-translate-y-0.5',
                    social.icon === 'youtube' && 'hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.35)]',
                    social.icon === 'instagram' && 'hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-500/10 hover:shadow-[0_0_10px_rgba(236,72,153,0.35)]',
                    social.icon === 'facebook' && 'hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10',
                    social.icon === 'linkedin' && 'hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-500/10'
                  )}
                >
                  {socialIcons[social.icon] || null}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Compact Full-Width Integrated Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 sm:mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-2xs sm:text-xs text-slate-400 sm:flex-row"
        >
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Built with care in Kolkata, India.
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-glow-soft">Turning small businesses into big brands.</span>
          </p>
        </motion.div>
      </div>

      {/* Floating WhatsApp FAB — visible on mobile */}
      <motion.a
        href={`https://wa.me/${site.whatsapp}?text=Hi%20WebzoLabs!%20I'd%20like%20to%20know%20more%20about%20your%20websites.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_30px_-8px_rgba(37,211,102,0.8)] transition-transform duration-300 hover:scale-105 active:scale-95 lg:hidden"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
        {/* Ring animation */}
        <span
          className="absolute inset-0 rounded-full bg-whatsapp/40 animate-pulse-ring"
          aria-hidden="true"
        />
      </motion.a>
    </footer>
  )
}
