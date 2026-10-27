import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const reveal = {
  hidden: { opacity: 0, y: 22, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/** Shared section header: mono eyebrow, display title, muted lead. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className,
}) {
  const centered = align === 'center'

  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(
        'flex flex-col gap-4 transform-gpu will-change-transform',
        centered ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={reveal}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow inline-flex items-center gap-2"
        >
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-glow" />
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={reveal}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-gradient max-w-3xl text-2xl font-bold leading-[1.22] tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] sm:font-semibold sm:leading-[1.14] text-balance font-display"
      >
        {title}
      </motion.h2>

      {lead && (
        <motion.p
          variants={reveal}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-sm leading-relaxed text-slate-300/90 sm:text-base sm:text-slate-300 font-sans"
        >
          {lead}
        </motion.p>
      )}
    </motion.div>
  )
}
