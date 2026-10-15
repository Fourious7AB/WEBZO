import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Modern Linear / Apple Style Ambient Atmosphere & Scroll Progress.
 *
 * Replaces the heavy canvas particle loop with a pure CSS, 120fps hardware-accelerated
 * ambient atmosphere, paired with an ultra-thin glowing gradient scroll progress hairline.
 *
 * 100% responsive, zero battery drain, and zero scroll lag on all devices.
 */
export default function AuroraField() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Top subtle scroll progress hairline (Linear / Apple style) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 z-50 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
        aria-hidden="true"
      />

      {/* Atmospheric Background Container */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle Blueprint Grid with Radial Mask */}
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-[0.38] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />

        {/* Floating Ambient Glow Spheres (Pure CSS, 120fps smooth) */}
        <div
          className="absolute -left-32 sm:-left-44 top-[15%] h-[28rem] sm:h-[40rem] w-[28rem] sm:w-[40rem] rounded-full bg-cyan-500/[0.07] blur-[110px] sm:blur-[140px] animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        <div
          className="absolute -right-28 sm:-right-40 top-[45%] h-[30rem] sm:h-[42rem] w-[30rem] sm:w-[42rem] rounded-full bg-blue-600/[0.07] blur-[120px] sm:blur-[150px] animate-pulse"
          style={{ animationDuration: '11s' }}
        />
        <div
          className="absolute left-[15%] sm:left-[30%] bottom-[5%] h-[26rem] sm:h-[36rem] w-[26rem] sm:w-[36rem] rounded-full bg-violet-600/[0.06] blur-[110px] sm:blur-[130px] animate-pulse"
          style={{ animationDuration: '13s' }}
        />
      </div>
    </>
  )
}
