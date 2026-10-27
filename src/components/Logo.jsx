import { cn } from '@/lib/utils'

/**
 * Wordmark and brand mark.
 * Clean, modern, high-precision vector mark without artificial neon glows or boxed containers.
 */
export default function Logo({ className, showFull = true }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 64 64"
        className="h-8 w-8 shrink-0"
        role="img"
        aria-label="WebzoLabs"
      >
        <defs>
          <linearGradient id="wz-logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M13 22 L21.5 42 L28.5 28 L35.5 42 L44 22"
          fill="none"
          stroke="url(#wz-logo-g)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showFull && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-white">
          Webzo<span className="text-blue-400">Labs</span>
        </span>
      )}
    </span>
  )
}
