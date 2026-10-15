import { useState } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * CardSpotlight Component (inspired by Manu Arora / Aceternity UI on 21st.dev).
 * Features:
 * - Dynamic 60-120 FPS cursor tracking via Framer Motion useMotionValue (zero state-rerenders on mousemove)
 * - Radial spotlight specular gradient following cursor
 * - High-tech illuminated dot matrix revealed exclusively beneath cursor via dynamic CSS mask
 * - Elevated luxury dark glass container with rounded corners and subtle border shimmer
 */
export default function CardSpotlight({
  children,
  radius = 380,
  spotlightColor = 'rgba(59, 130, 246, 0.18)',
  dotColor = 'rgba(96, 165, 250, 0.35)',
  className,
  ...props
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white 0%, transparent 80%)`

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group/spotlight relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]',
        'border border-white/10 bg-surface/90 backdrop-blur-2xl',
        'transition-colors duration-500 hover:border-glow/30',
        'shadow-[0_24px_80px_-20px_rgba(2,6,23,0.95)]',
        className
      )}
      {...props}
    >
      {/* 1. Spotlight Glow Gradient Following Cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] sm:rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 75%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Spotlight Dot Matrix Pattern Revealed Under Cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '16px 16px',
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle Ambient Noise / Surface Shimmer */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* 4. Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
