'use client'

// ============================================================
// Toast Component
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
    classes: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100',
    iconClasses: 'text-green-600 dark:text-green-400',
  },
  error: {
    icon: XCircle,
    classes: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100',
    iconClasses: 'text-red-600 dark:text-red-400',
  },
  info: {
    icon: Info,
    classes: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100',
    iconClasses: 'text-blue-600 dark:text-blue-400',
  },
}

export function Toast({ toast }: ToastProps) {
  const removeToast = useToastStore((state) => state.removeToast)
  const config = typeConfig[toast.type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg',
        'animate-in slide-in-from-right-full fade-in duration-300',
        config.classes
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', config.iconClasses)} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
        aria-label="Cerrar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
