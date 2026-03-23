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
    if (!file.type.startsWith('image/')) {
      toast.addToast('Only image files are allowed', 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.addToast('Image must be smaller than 5MB', 'error')
      return
    }

    setIsUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
      toast.addToast('Image uploaded successfully', 'success')
    } catch {
      toast.addToast('Error uploading image', 'error')
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
        <div className="relative overflow-hidden rounded-lg border border-white/[0.06]">
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
              ? 'border-zinc-500 bg-zinc-500/[0.04]'
              : 'border-zinc-700 hover:border-zinc-500 hover:bg-white/[0.02]',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          {isUploading ? (
            <>
              <LoadingSpinner />
              <p className="text-sm text-zinc-500">Uploading image...</p>
            </>
          ) : (
            <>
              <div className="rounded-full bg-zinc-800 p-3">
                {isDragging ? (
                  <Upload className="h-6 w-6 text-zinc-400" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-zinc-500" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-300">
                  {isDragging ? 'Drop image here' : 'Drag an image or click to upload'}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  JPG, PNG, WebP, GIF — max 5MB
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
