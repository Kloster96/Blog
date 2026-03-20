// ============================================================
// Badge — Premium pill-style tags
// ============================================================

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'draft' | 'published'
  className?: string
}

const variantClasses = {
  default: 'bg-zinc-800/80 text-zinc-400',
  draft: 'bg-amber-500/10 text-amber-400',
  published: 'bg-emerald-500/10 text-emerald-400',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
