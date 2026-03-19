'use client'

// ============================================================
// Toast Container — Renderiza toasts del store
// ============================================================

import { useToastStore } from '@/store/useToastStore'
import { Toast } from './Toast'

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div
      aria-live="polite"
      aria-label="Notificaciones"
      className="fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2 overflow-hidden"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
