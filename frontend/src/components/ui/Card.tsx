// ============================================================
// Card — Premium dark card
// ============================================================

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.06] bg-zinc-900/50 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </div>
  )
}
