import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * HolographicCard component inspired by Dhileep Kumar GM on 21st.dev.
 * Features:
 * - 3D Spring-damped cursor tilt (rotateX, rotateY)
 * - Prismatic holographic foil sheen (color-dodge with dynamic angle shift)
 * - Dynamic cursor spotlight tracking
 * - Masked holographic border shimmer
 * - Ambient aura underglow
 * - 3D spatial depth for inner content (translateZ)
 */
export default function HolographicCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Mouse coordinates in pixels relative to card
  const mouseX = useMotionValue(150)
  const mouseY = useMotionValue(150)

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseXNorm = useMotionValue(0)
  const mouseYNorm = useMotionValue(0)

  // Smooth springs for 3D tilt
  const springConfig = { stiffness: 280, damping: 24, mass: 0.4 }
  const smoothX = useSpring(mouseXNorm, springConfig)
  const smoothY = useSpring(mouseYNorm, springConfig)

  // 3D rotation angles
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10])

  // Prismatic foil background shift
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%'])
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    mouseX.set(x)
    mouseY.set(y)
    mouseXNorm.set(x / rect.width - 0.5)
    mouseYNorm.set(y / rect.height - 0.5)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseXNorm.set(0)
    mouseYNorm.set(0)
  }

  return (
    <div style={{ perspective: 1200 }} className="relative h-full w-full">
      {/* Ambient Aura Underglow */}
      <motion.div
        className="pointer-events-none absolute -inset-1.5 rounded-3xl opacity-0 blur-2xl transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.3), rgba(139,92,246,0.3), transparent 70%)',
          opacity: isHovered ? 0.65 : 0,
        }}
        aria-hidden="true"
      />

      {/* Main 3D Tilted Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl transform-gpu will-change-transform',
          'border border-white/10 bg-[#070D1A]/85 p-6 sm:p-7 backdrop-blur-xl',
          'shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10',
          className
        )}
      >
        {/* Holographic Prismatic Sheen Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.38 : 0,
            background:
              'linear-gradient(115deg, transparent 15%, rgba(255,0,128,0.3) 30%, rgba(121,40,202,0.35) 45%, rgba(0,112,243,0.35) 60%, rgba(6,182,212,0.35) 75%, transparent 90%)',
            backgroundPosition: `${sheenX} ${sheenY}`,
            backgroundSize: '200% 200%',
          }}
          aria-hidden="true"
        />

        {/* Dynamic Cursor Spotlight Layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(320px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.18), rgba(139, 92, 246, 0.1) 40%, transparent 80%)`
            ),
          }}
          aria-hidden="true"
        />

        {/* Dynamic Border Shimmer on Mouse Position */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl p-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x}px ${y}px, rgba(147, 197, 253, 0.65), rgba(168, 85, 247, 0.35) 50%, transparent 80%)`
            ),
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          aria-hidden="true"
        />

        {/* Card Content with 3D Parallax Depth */}
        <div
          style={{
            transform: 'translateZ(20px)',
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 flex flex-1 flex-col justify-between"
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
