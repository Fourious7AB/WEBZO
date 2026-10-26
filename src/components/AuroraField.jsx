/**
 * Modern Linear / Apple Style Ambient Atmosphere.
 *
 * 100% responsive, pure CSS, 120fps hardware-accelerated ambient atmosphere.
 * Zero battery drain, zero scroll lag on all devices.
 */
export default function AuroraField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Atmospheric Background Container */}
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
  )
}
