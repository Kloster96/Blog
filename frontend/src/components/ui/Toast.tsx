'use client'

// ============================================================
// Toast — Premium dark notifications
// ============================================================

import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import type { Toast as ToastType } from '@/models'
import { cn } from '@/lib/utils'
import { useToastStore } from '@/store/useToastStore'

interface ToastProps {
  toast: ToastType
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    border: 'border-emerald-500/20',
    bg: 'bg-emerald-500/[0.06]',
    iconColor: 'text-emerald-400',
    textColor: 'text-emerald-200',
  },
  error: {
    icon: XCircle,
    border: 'border-red-500/20',
    bg: 'bg-red-500/[0.06]',
    iconColor: 'text-red-400',
    textColor: 'text-red-200',
  },
  info: {
    icon: Info,
    border: 'border-blue-500/20',
    bg: 'bg-blue-500/[0.06]',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-200',
  },
}

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast)
  const config = typeConfig[toast.type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl',
        'animate-in slide-in-from-right-full fade-in duration-300',
        'border-white/[0.06] bg-zinc-900/90',
        config.bg
      )}
    >
      <Icon className={cn('h-4 w-4 flex-shrink-0', config.iconColor)} />
      <p className={cn('flex-1 text-sm font-medium', config.textColor)}>
        {toast.message}
      </p>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300"
        aria-label="Cerrar"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
