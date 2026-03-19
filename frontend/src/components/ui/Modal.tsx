'use client'

// ============================================================
// Modal Component
// ============================================================

import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Cerrar con ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl',
          'dark:bg-gray-800',
          className
        )}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  )
}
