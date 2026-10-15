import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-gradient-to-r from-glow to-violet-glow text-white shadow-[0_10px_40px_-12px_rgba(59,130,246,0.75)] hover:shadow-[0_16px_50px_-12px_rgba(139,92,246,0.9)] hover:brightness-110',
  secondary:
    'glass text-white hover:border-glow/40 hover:bg-white/[0.07]',
  ghost:
    'text-muted hover:text-white hover:bg-white/5',
  whatsapp:
    'bg-whatsapp text-[#052e16] font-semibold hover:brightness-110 shadow-[0_10px_36px_-14px_rgba(37,211,102,0.9)]',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[52px] px-7 text-base',
}

/**
 * One button, rendered as <button> or <a> depending on whether it navigates.
 * Every variant shares the same height rhythm and focus treatment.
 */
export default function Button({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const Tag = as || (props.href ? 'a' : 'button')
  const isExternal = Tag === 'a' && props.href?.startsWith('http')

  return (
    <Tag
      className={cn(
        'group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium',
        'transition-all duration-300 ease-premium active:scale-[0.97]',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      {...(Tag === 'button' && !props.type ? { type: 'button' } : null)}
      {...props}
    >
      {children}
    </Tag>
  )
}
