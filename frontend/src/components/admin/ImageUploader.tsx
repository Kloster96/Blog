'use client'

// ============================================================
// Image Uploader Component
// ============================================================

import { useState, useRef } from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { uploadImage } from '@/services/upload.service'
import { useToastStore } from '@/store/useToastStore'
import { cn } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const toast = useToastStore()

  const handleFile = async (file: File) => {
    // Validar tipo
    if (!file.type.startsWith('image/')) {
      toast.addToast('Solo se permiten imágenes', 'error')
      return
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.addToast('La imagen debe ser menor a 5MB', 'error')
      return
    }

    setIsUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
      toast.addToast('Imagen subida correctamente', 'success')
    } catch {
      toast.addToast('Error al subir imagen', 'error')
    } finally {
      setIsUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      {value ? (
        /* Preview */
        <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <Image
            src={value}
            alt="Cover"
            width={400}
            height={200}
            className="h-48 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Upload area */
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors',
            isDragging
              ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
              : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-brand-600',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          {isUploading ? (
            <>
              <LoadingSpinner />
              <p className="text-sm text-gray-500">Subiendo imagen...</p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                {isDragging ? (
                  <Upload className="h-6 w-6 text-brand-600" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isDragging ? 'Soltá la imagen aquí' : 'Arrastrá una imagen o'}
                </p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  JPG, PNG, WebP, GIF — máx. 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}
