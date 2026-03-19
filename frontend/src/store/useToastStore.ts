// ============================================================
// Toast Store — Sistema de notificaciones
// ============================================================

import { create } from 'zustand'
import type { Toast, ToastType } from '@/models'
import { TOAST_DURATION_MS } from '@/lib/constants'

interface ToastState {
  toasts: Toast[]

  // Actions
  addToast: (message: string, type: ToastType) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],

  addToast: (message: string, type: ToastType) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`

    // Agregar toast
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }))

    // Auto-remover después de N segundos
    setTimeout(() => {
      get().removeToast(id)
    }, TOAST_DURATION_MS)
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }))
  },
}))
