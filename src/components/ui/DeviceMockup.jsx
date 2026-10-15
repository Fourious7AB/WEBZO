import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Lock, RotateCcw } from 'lucide-react'

export default function DeviceMockup({
  laptopImage,
  phoneImage,
  title,
  displayUrl = 'webzolabs.com',
  accent = 'from-blue-500/20 to-transparent',
}) {
  const [laptopLoaded, setLaptopLoaded] = useState(false)
  const [phoneLoaded, setPhoneLoaded] = useState(false)

  return (
    <div className="relative w-full pt-2 pb-6 px-1 select-none">
      {/* Ambient background glow behind devices */}
      <div
        className={`pointer-events-none absolute inset-x-6 top-8 bottom-4 -z-10 rounded-full bg-gradient-to-r ${accent} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-85`}
        aria-hidden="true"
      />

      {/* ===================== LAPTOP DEVICE ===================== */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[94%] sm:max-w-[92%]"
      >
        {/* Laptop Display Lid */}
        <div className="relative overflow-hidden rounded-t-xl sm:rounded-t-2xl border border-slate-700/70 bg-slate-900/95 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          {/* Top Bezel with Webcam */}
          <div className="relative flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] text-white">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-500/90 shadow-[0_0_6px_rgba(244,63,94,0.4)]" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-500/90 shadow-[0_0_6px_rgba(245,158,11,0.4)]" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
            </div>

            {/* Browser Address Bar with HTTPS Badge */}
            <div className="mx-2 flex max-w-[260px] sm:max-w-xs flex-1 items-center justify-center gap-1.5 rounded-full bg-slate-900 px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-mono text-white border border-white/10 shadow-inner">
              <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 font-semibold">https://</span>
              <span className="truncate text-white font-medium" style={{ color: '#ffffff' }}>
                {displayUrl}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 text-white/80">
              <RotateCcw className="h-2.5 w-2.5 sm:h-3 sm:w-3 hidden sm:block opacity-70" />
              <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-glow-soft opacity-90" />
            </div>
          </div>

          {/* Laptop Screen Content (16:10 Aspect Ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
            <img
              src={laptopImage}
              alt={`${title} - Desktop Website Preview`}
              loading="lazy"
              onLoad={() => setLaptopLoaded(true)}
              className={`h-full w-full object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.03] ${
                laptopLoaded ? 'opacity-100' : 'opacity-70 blur-sm'
              }`}
            />

            {/* Glass screen reflection highlight */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07]"
              aria-hidden="true"
            />

            {/* Hover overlay hint */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-md"
                style={{ color: '#ffffff' }}
              >
                <span>Open Live Website</span>
                <ExternalLink className="h-3 w-3 text-glow-soft" />
              </span>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base / Bottom Lip */}
        <div className="relative -mx-2 sm:-mx-3 h-2.5 sm:h-3.5 rounded-b-lg bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border-t border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          {/* Thumb Notch */}
          <div className="mx-auto h-1 w-12 sm:w-16 rounded-b-md bg-slate-950/80 border-b border-white/10" />
        </div>
      </motion.div>

      {/* ===================== MOBILE PHONE DEVICE ===================== */}
      <motion.div
        initial={{ y: 0 }}
        whileHover={{ y: -4, scale: 1.03 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-2 -right-1 sm:-bottom-4 sm:right-2 z-20 w-[30%] min-w-[96px] max-w-[140px] sm:max-w-[170px]"
      >
        {/* Phone Outer Chassis (Metallic edge + glass) */}
        <div className="relative overflow-hidden rounded-[1.4rem] sm:rounded-[2rem] border-[3px] sm:border-4 border-slate-700/80 bg-slate-950 p-1 sm:p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.95)] ring-1 ring-white/15">
          {/* Phone Screen Container (9:19.5 Aspect Ratio) */}
          <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[1rem] sm:rounded-[1.5rem] bg-slate-900">
            {/* Dynamic Island Notch */}
            <div className="absolute top-1.5 inset-x-0 z-30 flex justify-center">
              <div className="h-2 w-8 sm:h-2.5 sm:w-11 rounded-full bg-black ring-1 ring-white/10 flex items-center justify-end pr-1">
                <span className="h-1 w-1 rounded-full bg-blue-500/70" />
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
              <div className="h-0.5 w-8 sm:w-10 rounded-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* Floating Responsive Badge on Mobile */}
        <div className="mt-1.5 text-center hidden sm:block">
          <span
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-slate-950/90 px-2 py-0.5 text-[9px] font-mono text-white backdrop-blur-sm"
            style={{ color: '#ffffff' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Mobile 100%
          </span>
        </div>
      </motion.div>
    </div>
  )
}
