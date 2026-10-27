import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function DeviceMockup({
  laptopImage,
  phoneImage,
  title,
  displayUrl = 'webzolabs.com',
  liveUrl,
  accent = 'from-blue-500/20 to-transparent',
}) {
  const [laptopLoaded, setLaptopLoaded] = useState(false)
  const [phoneLoaded, setPhoneLoaded] = useState(false)

  return (
    <div className="relative w-full pt-2 pb-8 sm:pb-10 px-1 select-none">
      {/* Ambient background glow behind devices */}
      <div
        className={`pointer-events-none absolute inset-x-6 top-8 bottom-6 -z-10 rounded-full bg-gradient-to-r ${accent} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-85`}
        aria-hidden="true"
      />

      {/* ===================== LAPTOP DEVICE (Unobstructed Desktop View) ===================== */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[98%] sm:max-w-[96%]"
      >
        {/* Laptop Display Lid Frame */}
        <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl border border-slate-700/70 bg-slate-900/95 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          {/* Slim MacBook Top Camera Bezel */}
          <div className="relative flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] text-white">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-slate-600/90" />
            </div>

            {/* Display Hostname Pill - Clickable Live Website Redirect */}
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mx-2 flex max-w-[240px] sm:max-w-xs flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-900/90 px-3 py-0.5 text-[9px] sm:text-[11px] font-mono text-cyan-300 hover:text-white hover:bg-cyan-950/80 border border-cyan-400/30 hover:border-cyan-400/70 transition-all shadow-sm group/url cursor-pointer"
                title={`Open ${displayUrl}`}
              >
                <span className="truncate font-medium">{displayUrl}</span>
                <ExternalLink className="h-2.5 w-2.5 text-cyan-400 group-hover/url:text-white transition-colors" />
              </a>
            ) : (
              <div className="mx-2 flex max-w-[240px] sm:max-w-xs flex-1 items-center justify-center rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-mono text-white/90 border border-white/10">
                <span className="truncate text-white font-medium">{displayUrl}</span>
              </div>
            )}

            {/* Live Indicator */}
            <div className="flex items-center gap-1 text-[9px] font-mono text-white/70">
              <span className="hidden sm:inline text-white/80">Desktop</span>
              <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-glow-soft opacity-90" />
            </div>
          </div>

          {/* Laptop Screen Content (16:9 Aspect Ratio) */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <img
              src={laptopImage}
              alt={`${title} - Desktop Website Preview`}
              loading="lazy"
              onLoad={() => setLaptopLoaded(true)}
              className={`h-full w-full object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.02] ${
                laptopLoaded ? 'opacity-100' : 'opacity-70 blur-sm'
              }`}
            />

            {/* Glass screen reflection highlight */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Laptop Keyboard Base / Bottom Lip */}
        <div className="relative -mx-2 sm:-mx-3 h-3 sm:h-4 rounded-b-lg bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-t border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          {/* Thumb Notch */}
          <div className="mx-auto h-1 w-12 sm:w-16 rounded-b-md bg-slate-950/80 border-b border-white/10" />
        </div>
      </motion.div>

      {/* ===================== MOBILE PHONE ===================== */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -6, scale: 1.08 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-4 right-0 sm:-bottom-6 sm:right-3 z-20 w-[26%] min-w-[82px] max-w-[120px] sm:max-w-[145px]"
      >
        {/* Phone Outer Chassis (Metallic edge + glass) */}
        <div className="relative overflow-hidden rounded-[1.3rem] sm:rounded-[1.8rem] border-[2.5px] sm:border-[3.5px] border-slate-600/90 bg-slate-950 p-1 sm:p-1.5 shadow-[0_25px_50px_rgba(0,0,0,0.95)] ring-1 ring-white/20">
          {/* Phone Screen Container (9:19 Aspect Ratio) */}
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[0.9rem] sm:rounded-[1.4rem] bg-slate-900">
            {/* Dynamic Island Notch */}
            <div className="absolute top-1.5 inset-x-0 z-30 flex justify-center">
              <div className="h-2 w-7 sm:h-2.5 sm:w-10 rounded-full bg-black ring-1 ring-white/10 flex items-center justify-end pr-1">
                <span className="h-1 w-1 rounded-full bg-blue-500/80" />
              </div>
            </div>

            {/* Mobile Screenshot */}
            <img
              src={phoneImage}
              alt={`${title} - Mobile Responsive Preview`}
              loading="lazy"
              onLoad={() => setPhoneLoaded(true)}
              className={`h-full w-full object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-105 ${
                phoneLoaded ? 'opacity-100' : 'opacity-70 blur-sm'
              }`}
            />

            {/* Mobile Glass sheen */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.08]"
              aria-hidden="true"
            />

            {/* Phone Home Bar */}
            <div className="absolute bottom-1 inset-x-0 z-30 flex justify-center">
              <div className="h-0.5 w-7 sm:w-9 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* Live Website Redirect Link Pill (Replacing old green dot badge) */}
        {liveUrl && (
          <div className="mt-1.5 text-center">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-slate-950/95 px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-medium text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/20 backdrop-blur-md shadow-lg transition-all group/redirect cursor-pointer"
            >
              <span>Visit Site</span>
              <ExternalLink className="h-2.5 w-2.5 text-cyan-400 group-hover/redirect:translate-x-0.5 group-hover/redirect:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  )
}
