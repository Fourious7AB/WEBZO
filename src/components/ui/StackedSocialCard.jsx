import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { communitySection } from '@/lib/site'

const layerIcons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 sm:h-6 sm:w-6"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 sm:h-6 sm:w-6">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5 sm:h-5 sm:w-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
}

/**
 * Mathematically calibrated layer specifications matching 21st.dev:
 * - Layer 3 (Instagram): w-[74%] h-[62%], leaving 38% headroom for "Socials" and status badge
 * - Layer 2 (YouTube):   w-[56%] h-[46%], leaving 54% headroom
 * - Layer 1 (Facebook):  w-[39%] h-[31%], leaving 69% headroom
 * - Layer 0 (Webzo):     w-[22%] h-[17%] core anchor tile
 */
const layerLayouts = [
  {
    size: 'w-[74%] h-[62%]',
    rounded: 'rounded-tr-[2.5rem] sm:rounded-tr-[2.85rem]',
    glass: 'bg-white/[0.18] hover:bg-white/[0.24] backdrop-blur-xl border-t border-r border-white/40 hover:border-white/60 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.2)]',
    rest: { x: 0, y: 0 },
    fanned: { x: 18, y: -14 },
    zIndex: 'z-10',
    iconPos: 'right-4 top-4 sm:right-5 sm:top-5',
    infoPos: 'left-5 top-3.5 sm:left-6 sm:top-4',
  },
  {
    size: 'w-[56%] h-[46%]',
    rounded: 'rounded-tr-[2.25rem] sm:rounded-tr-[2.5rem]',
    glass: 'bg-white/[0.22] hover:bg-white/[0.28] backdrop-blur-xl border-t border-r border-white/45 hover:border-white/65 shadow-[0_8px_25px_-5px_rgba(0,0,0,0.18)]',
    rest: { x: 0, y: 0 },
    fanned: { x: 12, y: -9 },
    zIndex: 'z-20',
    iconPos: 'right-3.5 top-3.5 sm:right-4.5 sm:top-4.5',
    infoPos: 'left-4 top-3 sm:left-5 sm:top-3.5',
  },
  {
    size: 'w-[39%] h-[31%]',
    rounded: 'rounded-tr-[1.85rem] sm:rounded-tr-[2.1rem]',
    glass: 'bg-white/[0.26] hover:bg-white/[0.32] backdrop-blur-xl border-t border-r border-white/50 hover:border-white/70 shadow-[0_6px_20px_-5px_rgba(0,0,0,0.15)]',
    rest: { x: 0, y: 0 },
    fanned: { x: 6, y: -5 },
    zIndex: 'z-30',
    iconPos: 'right-3 top-3 sm:right-3.5 sm:top-3.5',
    infoPos: 'left-3.5 top-2.5 sm:left-4 sm:top-3',
  },
]

/**
 * Authentic 21st.dev Stacked Frosted-Glass Social Card by Shailendra Kumar.
 * Features:
 * - Guaranteed Zero Overlap: Layer 3 tops out at 62%, ensuring generous clearance below the header.
 * - Radiant Aura Backdrop: Vibrant gradient illumination from 21st.dev makes frosted glass glow.
 * - Dynamic Fanning Spring Physics: Expands along diagonal on hover or touch.
 * - 100% Configurable Content: Directly wired to communitySection in site.js.
 */
export default function StackedSocialCard({ cardConfig = communitySection.card }) {
  const [isStackHovered, setIsStackHovered] = useState(false)
  const [activeLayer, setActiveLayer] = useState(null)

  const {
    title = 'Socials',
    badge = 'Online',
    handle = '@webzolabs',
    brandText = 'WEBZO',
    gradient = 'bg-gradient-to-br from-[#7C3AED] via-[#D946EF] to-[#FB923C]',
    layers = [],
  } = cardConfig

  return (
    <div
      className="relative flex items-center justify-center p-2 sm:p-4 w-full"
      onMouseEnter={() => setIsStackHovered(true)}
      onMouseLeave={() => {
        setIsStackHovered(false)
        setActiveLayer(null)
      }}
      onClick={() => setIsStackHovered((prev) => !prev)}
    >
      {/* Outer Card Container */}
      <div
        className={cn(
          'relative w-full max-w-[360px] sm:max-w-[400px] aspect-square rounded-[2.5rem] sm:rounded-[2.85rem] overflow-hidden p-6 sm:p-7 select-none',
          gradient,
          'border border-cyan-400/30 ring-1 ring-white/20',
          'shadow-[0_25px_60px_-15px_rgba(37,99,235,0.45)]'
        )}
      >
        {/* Radiant Ambient Aura Glow Orbs */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-cyan-400/35 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-indigo-600/45 blur-3xl"
          aria-hidden="true"
        />

        {/* Top Header Bar: Cleanly elevated above layers with zero collision */}
        <div className="relative z-30 flex items-start justify-end pointer-events-none">
          {/* Title & Handle */}
          <div className="text-right">
            <span className="block font-display text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
              {title}
            </span>
            {handle && (
              <span className="block text-[11px] sm:text-xs font-medium text-white/90 mt-0.5 tracking-wide drop-shadow-sm font-mono">
                {handle}
              </span>
            )}
          </div>
        </div>

        {/* Nested Cascading Glass Cards originating from Bottom-Left */}
        <div className="absolute inset-0 pointer-events-none">
          {layers.map((layer, index) => {
            const isHovered = activeLayer === layer.id
            const layout = layerLayouts[index] || layerLayouts[0]
            const currentOffset = isStackHovered ? layout.fanned : layout.rest
            const icon = layerIcons[layer.id] || null

            return (
              <motion.a
                key={layer.id}
                href={layer.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                aria-label={`Visit WebzoLabs on ${layer.label}`}
                initial={false}
                animate={{
                  x: isHovered ? currentOffset.x + 3 : currentOffset.x,
                  y: isHovered ? currentOffset.y - 3 : currentOffset.y,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 26,
                }}
                className={cn(
                  'pointer-events-auto absolute bottom-0 left-0 cursor-pointer overflow-hidden transform-gpu will-change-transform',
                  layout.size,
                  layout.rounded,
                  layout.zIndex,
                  layout.glass,
                  'border-t border-r transition-shadow duration-300',
                  isHovered && layer.borderActive,
                  isHovered && layer.glowClass
                )}
              >
                {/* Subtle active background wash on hover */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-300',
                    isHovered ? 'opacity-25' : 'opacity-0',
                    `bg-gradient-to-br ${layer.color}`
                  )}
                />

                {/* Top-Right Platform Icon */}
                <div
                  className={cn(
                    'absolute flex items-center justify-center text-white drop-shadow-sm transition-transform duration-300',
                    layout.iconPos,
                    isHovered && 'scale-110'
                  )}
                >
                  {icon}
                </div>

                {/* Channel details revealed smoothly in the unobstructed top area */}
                <div className={cn('absolute pointer-events-none', layout.infoPos)}>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col pr-10"
                      >
                        <span className="text-xs sm:text-sm font-bold text-white drop-shadow-sm leading-tight flex items-center gap-1">
                          {layer.label}
                          <ArrowUpRight className="h-3 w-3 opacity-90 inline-block" />
                        </span>
                        <span className="text-[10px] sm:text-2xs text-white/90 font-mono font-medium drop-shadow-sm mt-0.5">
                          {layer.stats}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.a>
            )
          })}

          {/* Layer 0: Core Brand Anchor Tile (Innermost corner) */}
          <motion.div
            initial={false}
            animate={{
              scale: isStackHovered ? 1.03 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className={cn(
              'pointer-events-auto absolute bottom-0 left-0 z-40',
              'w-[22%] h-[17%] rounded-tr-[1.35rem] sm:rounded-tr-[1.6rem]',
              'bg-white/[0.32] hover:bg-white/[0.42] backdrop-blur-xl border-t border-r border-white/50 shadow-md',
              'flex flex-col items-start justify-end p-2.5 sm:p-3 transition-colors duration-200'
            )}
          >
            {/* Clean White W Vector Logo */}
            <svg
              viewBox="0 0 64 64"
              className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-white shrink-0 drop-shadow-sm"
              role="img"
              aria-label="WebzoLabs"
            >
              <path
                d="M13 22 L21.5 42 L28.5 28 L35.5 42 L44 22"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="49" cy="21" r="3.5" fill="#FFFFFF" />
            </svg>
            <span className="mt-0.5 font-mono text-[0.6rem] sm:text-[0.65rem] font-bold text-white tracking-wider drop-shadow-sm">
              {brandText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

