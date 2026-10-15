import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const LampContainer = ({
  children,
  className,
  contentClassName,
}) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[92vh] md:min-h-screen flex-col items-center justify-start overflow-hidden bg-base w-full z-0 pt-36 sm:pt-40 md:pt-44 pb-20 md:pb-28 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]',
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 flex h-[36rem] w-full scale-y-125 items-center justify-center isolate z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[18rem] sm:w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-base h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)] mask-lamp-top" />
          <div className="absolute w-40 h-[100%] left-0 bg-base bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)] mask-lamp-right" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))',
          }}
          className="absolute inset-auto left-1/2 h-56 w-[18rem] sm:w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-base bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)] mask-lamp-left" />
          <div className="absolute w-[100%] right-0 bg-base h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)] mask-lamp-top" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-base blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />

        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-28 sm:h-36 w-44 sm:w-64 -translate-y-[6rem] rounded-full bg-cyan-400/70 blur-2xl sm:blur-3xl"
        />

        <motion.div
          initial={{ width: '12rem' }}
          whileInView={{ width: '30rem' }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[14rem] sm:w-[30rem] max-w-[85vw] -translate-y-[7rem] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-base" />
      </div>

      <div
        className={cn(
          'relative z-20 flex w-full flex-col items-center px-4 sm:px-6 md:px-8',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default LampContainer