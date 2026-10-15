import { motion } from 'framer-motion'
import { Youtube, Instagram } from 'lucide-react'
import StackedSocialCard from '@/components/ui/StackedSocialCard'
import Button from '@/components/ui/Button'
import { communitySection } from '@/lib/site'

const ctaIcons = {
  youtube: <Youtube className="h-4 w-4 mr-2 text-red-400" />,
  instagram: <Instagram className="h-4 w-4 mr-2 text-pink-400" />,
}

/**
 * Clean, focused Community & Socials Section.
 * Features:
 * - Direct connection to communitySection in site.js (100% changeable text, links, and stats)
 * - Gradient-accented title with spacious line gap
 * - High-contrast pure white narrative text
 * - Exclusive showcase of the 21st.dev Midnight Aura Stacked Social Card
 * - Balanced responsive layout with midnight atmospheric background glow
 */
export default function SocialSection() {
  const {
    eyebrow = 'Community & Socials',
    titleLine1 = 'Follow Our Daily Builds,',
    titleLine2 = 'Masterclasses & Redesigns',
    lead = 'We build in public and share the entire playbook. Watch real client websites take shape, speed coding sprints, and actionable digital growth strategies across our channels.',
    ctaButtons = [],
    card = {},
  } = communitySection

  return (
    <section id="community" className="relative z-10 border-t border-white/10 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-24 md:pb-28 overflow-hidden">
      {/* Centered Glowing Hairline Divider at Top Boundary */}
      <div className="pointer-events-none absolute top-0 inset-x-0 flex justify-center">
        <div className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-cyan-400/25 via-violet-400/25 to-transparent" />
      </div>

      {/* Background ambient lighting - safely contained to eliminate clipping line */}
      <div
        className="pointer-events-none absolute top-4 right-1/4 h-80 w-80 rounded-full bg-blue-600/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-4 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading, Narrative, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-4"
            >
              {/* Eyebrow */}
              <div className="flex items-center">
                <span className="eyebrow inline-flex items-center gap-2">
                  <span className="h-px w-6 bg-gradient-to-r from-transparent to-glow" />
                  {eyebrow}
                </span>
              </div>

              {/* Title with increased gap between the two lines */}
              <h2 className="max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] text-white">
                <span className="block mb-2 sm:mb-3">{titleLine1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                  {titleLine2}
                </span>
              </h2>

              {/* Lead narrative in pure white */}
              <p
                className="max-w-xl text-sm sm:text-base md:text-lg text-white leading-relaxed mt-2 sm:mt-3"
                style={{ color: '#ffffff' }}
              >
                {lead}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              {ctaButtons.map((btn, i) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant={i === 0 ? 'primary' : 'secondary'}
                    size="md"
                  >
                    {ctaIcons[btn.platform] || null}
                    {btn.label}
                  </Button>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Prominent 21st.dev Animated Stacked Social Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <StackedSocialCard cardConfig={card} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
